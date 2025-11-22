##B. New Tactics
Add two new tactics to the tactics array:
• Polarity Inversion (Utility): Activates the reverse polarity.
• Polarity Lock (Defense/Utility): Prevents the polarity from being reversed for a set number of turns.
<!-- end list -->

const tactics = [
  // ... existing tactics
  {
    id: 'polarity_inversion',
    name: 'Polarity Inversion',
    type: 'utility',
    energyCost: 40,
    description: 'Reverses the polarity of all energy and health transfers. High risk, high reward.',
    icon: '☯️' // New icon for balance/inversion
  },
  {
    id: 'polarity_lock',
    name: 'Polarity Lock',
    type: 'defense',
    energyCost: 20,
    description: 'Locks the current polarity state for 3 turns, preventing inversion.',
    icon: '🔒'
  }
];
