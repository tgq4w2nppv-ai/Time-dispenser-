#Network ##Visualization Cue
The drawNetwork function should change the visual style of the nodes/connections to reflect the reversed polarity, creating a sense of instability or danger.
// Inside drawNetwork()
// ...
// Draw connections - Change color when reversed
ctx.strokeStyle = polarityState === 'reverse' 
  ? 'rgba(255, 100, 100, 0.4)' // Red/Warning color for reverse
  : 'rgba(100, 100, 255, 0.2)'; // Blue color for normal
ctx.lineWidth = 1;
// ... rest of connection drawing

// Draw nodes - Use different fill colors when reversed
networkNodes.forEach(node => {
  // ... existing arc drawing
  ctx.fillStyle = node.owner === 'player' 
    ? (node.active ? '#3b82f6' : '#93c5fd') // Player colors
    : (node.active ? '#ef4444' : '#fca5a5'); // Opponent colors
    
  // Visual reversal effect
  if (polarityState === 'reverse') {
    // Swap colors to visually confuse
    ctx.fillStyle = node.owner === 'player' 
      ? (node.active ? '#ef4444' : '#fca5a5') // Player gets Opponent's colors
      : (node.active ? '#3b82f6' : '#93c5fd'); // Opponent gets Player's colors
  }
  // ... rest of node drawing
});
// ...
