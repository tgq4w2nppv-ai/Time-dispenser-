{/* Main Battle Area */}
<div className="grid grid-cols-3 gap-4 flex-1">
  
  {/* NEW: Polarity Status Bar */}
  <div className={`col-span-3 text-center p-2 rounded-lg font-bold transition-all ${
    polarityState === 'reverse' 
      ? 'bg-red-700/50 border border-red-500 text-red-100 animate-pulse' 
      : 'bg-blue-700/50 border border-blue-500 text-blue-100'
  }`}>
    <Zap className={`inline-block w-5 h-5 mr-2 ${polarityState === 'reverse' ? 'rotate-180' : ''}`} />
    CURRENT POLARITY: {polarityState.toUpperCase()} 
    {polarityLockTurns > 0 && (
      <span className="ml-4 p-1 bg-yellow-900/50 rounded text-yellow-300 text-xs">
        <Lock className="inline-block w-3 h-3 mr-1" /> LOCK ACTIVE ({polarityLockTurns} T)
      </span>
    )}
  </div>

  {/* Neural Network Visualization */}
  <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
    {/* ... existing content */}
  </div>
  
  {/* ... rest of the grid layout */}
</div>
