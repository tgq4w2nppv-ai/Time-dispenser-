import os
from fastapi import FastAPI, HTTPException, Header, Depends
from pydantic import BaseModel, Field
import databases
import sqlalchemy
from typing import Optional, List
from datetime import datetime, timezone

# Load config from environment
DATABASE_URL = (
    os.getenv("DATABASE_URL")
    or f"postgresql://{os.getenv('POSTGRES_USER','lcb')}:{os.getenv('POSTGRES_PASSWORD','lcbpass')}@"
    f"{os.getenv('POSTGRES_HOST','db')}:{os.getenv('POSTGRES_PORT','5432')}/{os.getenv('POSTGRES_DB','lcb')}"
)
ADMIN_SECRET = os.getenv("LCB_ADMIN_SECRET", "changeme-in-prod")

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Tables (must match migrations/init.sql)
reservations = sqlalchemy.Table(
    "reservations",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column("account_id", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("resource", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("quantity", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("status", sqlalchemy.String, nullable=False, default="active"),
)

feedback = sqlalchemy.Table(
    "feedback_events",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column("source", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("reservation_id", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("account_id", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("evidence", sqlalchemy.JSON, nullable=True),
)

ledger = sqlalchemy.Table(
    "ledger_transactions",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column("account_id", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("amount", sqlalchemy.Numeric, nullable=False),
    sqlalchemy.Column("reason", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("source_feedback_id", sqlalchemy.String, nullable=True),
)

app = FastAPI(title="Lornes Credit Bureau (LCB) v1.0")

class ReservationCreate(BaseModel):
    id: str = Field(..., description="Reservation UUID")
    account_id: str
    resource: str
    quantity: float

class ReservationOut(ReservationCreate):
    created_at: datetime
    status: str

class FeedbackCreate(BaseModel):
    id: str
    source: str
    reservation_id: Optional[str]
    account_id: Optional[str]
    evidence: Optional[dict]

class LedgerEntry(BaseModel):
    id: str
    account_id: str
    amount: float
    reason: str
    created_at: datetime
    source_feedback_id: Optional[str] = None

def now():
    return datetime.now(timezone.utc)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Health
@app.get("/health")
async def health():
    return {"status": "ok", "time": now().isoformat()}

# Reservations
@app.post("/reservations", response_model=ReservationOut)
async def create_reservation(r: ReservationCreate):
    query = reservations.insert().values(
        id=r.id, created_at=now(), account_id=r.account_id, resource=r.resource, quantity=r.quantity, status="active"
    )
    try:
        await database.execute(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {**r.dict(), "created_at": now(), "status": "active"}

@app.get("/reservations/{res_id}", response_model=ReservationOut)
async def get_reservation(res_id: str):
    query = reservations.select().where(reservations.c.id == res_id)
    row = await database.fetch_one(query)
    if not row:
        raise HTTPException(status_code=404, detail="reservation not found")
    return dict(row)

# Feedback ingest
@app.post("/feedback", status_code=202)
async def ingest_feedback(f: FeedbackCreate):
    query = feedback.insert().values(
        id=f.id, created_at=now(), source=f.source, reservation_id=f.reservation_id, account_id=f.account_id, evidence=f.evidence
    )
    await database.execute(query)
    # In v1 we just store the event. A separate worker would evaluate and optionally call /enforce/levy.
    return {"status": "accepted", "id": f.id}

# Enforcement: levy a toll
class LevyRequest(BaseModel):
    id: str
    account_id: str
    amount: float
    reason: str
    source_feedback_id: Optional[str] = None

def admin_required(secret: Optional[str] = Header(None)):
    if secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="invalid admin secret")

@app.post("/enforce/levy", response_model=LedgerEntry, dependencies=[Depends(admin_required)])
async def levy_toll(l: LevyRequest):
    entry = {
        "id": l.id,
        "created_at": now(),
        "account_id": l.account_id,
        "amount": l.amount,
        "reason": l.reason,
        "source_feedback_id": l.source_feedback_id,
    }
    query = ledger.insert().values(**entry)
    await database.execute(query)
    return entry

@app.get("/accounts/{account_id}/ledger", response_model=List[LedgerEntry])
async def account_ledger(account_id: str, limit: int = 100):
    query = sqlalchemy.select([ledger]).where(ledger.c.account_id == account_id).order_by(ledger.c.created_at.desc()).limit(limit)
    rows = await database.fetch_all(query)
    return [dict(r) for r in rows]
