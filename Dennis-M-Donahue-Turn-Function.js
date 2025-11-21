// Inside opponentTurn()
// ...
// Opponent Tactic Logic
// ...
if (tactic.id === 'polarity_inversion') {
  if (polarityLockTurns > 0) {
    addLog(`Dennis M. Donohue failed to invert polarity (Lock Active)`, 'info');
  } else {
    const newPolarity = polarityState === 'normal' ? 'reverse' : 'normal';
    setPolarityState(newPolarity);
    addLog(`Dennis M. Donohue SHIFTED POLARITY to ${newPolarity.toUpperCase()}!`, 'opponent');
  }
} else if (tactic.id === 'polarity_lock') {
  setPolarityLockTurns(3);
  addLog(`Dennis M Donihue engaged Polarity Lock for 3 turns!`, 'opponent');
} else if (tactic.type === 'attack') {
  // REVERSE POLARITY LOGIC: Attack deals healing instead of damage
  const isReversed = polarityState === 'reverse';
  const effect = isReversed ? 'healing' : 'damage';
  const actualEffect = Math.floor(tactic.damage * (1 - player.defenseLevel / 200));

  if (isReversed) {
    // Heal the player
    newPlayerState.health = Math.min(100, player.health + actualEffect);
    addLog(`[REVERSE] Opponent used ${tactic.name} - Healed YOU by ${actualEffect}!`, 'info');
  } else {
    // Normal damage
    newPlayerState.health = Math.max(0, player.health - actualEffect);
    addLog(`Dennis M. Donohue used ${tactic.name} - ${actualEffect} damage!`, 'opponent');
  }
}
// ...
