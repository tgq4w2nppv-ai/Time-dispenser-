##A. The executeTactic Function
The player's action will now have four main effects to consider:
1. Polarity Lock Check: If polarityLockTurns > 0, the polarity_inversion tactic fails.
2. Polarity Activation: Handle the polarity_inversion and polarity_lock tactics.
3. Tactic Reversal: In reverse polarity, attack damage becomes healing, and healing/defense becomes damage/defense reduction.
4. Turn End: Decrement the polarityLockTurns.
// Inside executeTactic(tactic)
// ...
// New Player Tactic logic
// ...
  if (tactic.id === 'polarity_inversion') {
    if (polarityLockTurns > 0) {
      analysis = `Polarity Lock Active! Inversion failed.`;
      addLog(`Polarity Inversion failed due to active lock!`, 'error');
    } else {
      const newPolarity = polarityState === 'normal' ? 'reverse' : 'normal';
      setPolarityState(newPolarity);
      analysis = `POLARITY SHIFT! The mental battlefield polarity is now ${newPolarity.toUpperCase()}.`;
      addLog(`POLARITY SHIFT: ${newPolarity.toUpperCase()}!`, 'utility');
    }
  } else if (tactic.id === 'polarity_lock') {
    setPolarityLockTurns(3); // Lock for 3 turns
    analysis = `Polarity Lock engaged for 3 turns. Inversion is impossible.`;
    addLog(`Polarity Lock engaged for 3 turns!`, 'defense');
  } 
  
  // Existing Attack/Defense Logic, but MODIFIED by Polarity
  else if (tactic.type === 'attack') {
    // REVERSE POLARITY LOGIC: Attack deals healing instead of damage
    const isReversed = polarityState === 'reverse';
    const effect = isReversed ? 'healing' : 'damage';
    const actualEffect = Math.floor(tactic.damage * (1 - opponent.defenseLevel / 200));

    if (isReversed) {
      // Heal the opponent
      newOpponentState.health = Math.min(100, opponent.health + actualEffect);
      analysis = `POLARITY REVERSE: Your attack ${tactic.name} healed the opponent for ${actualEffect}!`;
      addLog(`[REVERSE] You used ${tactic.name} - Healed opponent by ${actualEffect}!`, 'error');
    } else {
      // Normal damage
      newOpponentState.health = Math.max(0, opponent.health - actualEffect);
      analysis = `Attack executed: ${tactic.name}. Dealt ${actualEffect} damage.`;
      addLog(`You used ${tactic.name} - ${actualEffect} damage!`, 'player');
    }
    // ... rest of attack logic (like mentalStrength reduction, energy drain)
  }
  // ... rest of defense logic
  
  // Decrement polarity lock at the end of the turn
  setPolarityLockTurns(prev => Math.max(0, prev - 1));
// ...
