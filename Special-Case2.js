import React, { useState } from ‘react’;
import { Shield, Cpu, Network, Eye, Lock, AlertTriangle } from ‘lucide-react’;

export default function AppleJeusRepository() {
const [activeView, setActiveView] = useState(‘overview’);
const [selectedTechnique, setSelectedTechnique] = useState(null);

const techniques = [
{ id: ‘T1566.002’, name: ‘Spearphishing Link’, tactic: ‘Initial Access’, color: ‘#66b1ff’ },
{ id: ‘T1059.004’, name: ‘Unix Shell’, tactic: ‘Execution’, color: ‘#66b1ff’ },
{ id: ‘T1053.005’, name: ‘Scheduled Task’, tactic: ‘Persistence’, color: ‘#66b1ff’ },
{ id: ‘T1543.003’, name: ‘Windows Service’, tactic: ‘Privilege Escalation’, color: ‘#66b1ff’ },
{ id: ‘T1140’, name: ‘Deobfuscate/Decode’, tactic: ‘Defense Evasion’, color: ‘#66b1ff’ },
{ id: ‘T1070.004’, name: ‘File Deletion’, tactic: ‘Defense Evasion’, color: ‘#66b1ff’ },
{ id: ‘T1027’, name: ‘Obfuscated Files’, tactic: ‘Defense Evasion’, color: ‘#66b1ff’ },
{ id: ‘T1218.007’, name: ‘Msiexec’, tactic: ‘Defense Evasion’, color: ‘#66b1ff’ },
{ id: ‘T1548.002’, name: ‘Bypass UAC’, tactic: ‘Privilege Escalation’, color: ‘#66b1ff’ },
{ id: ‘T1082’, name: ‘System Information Discovery’, tactic: ‘Discovery’, color: ‘#66b1ff’ },
{ id: ‘T1497.003’, name: ‘Time Based Evasion’, tactic: ‘Discovery’, color: ‘#66b1ff’ },
{ id: ‘T1071.001’, name: ‘Web Protocols’, tactic: ‘Command and Control’, color: ‘#66b1ff’ },
{ id: ‘T1041’, name: ‘Exfiltration Over C2’, tactic: ‘Exfiltration’, color: ‘#66b1ff’ }
];

const mitigations = [
{ id: ‘M1041’, name: ‘Encrypt Sensitive Information’, icon: Lock },
{ id: ‘M1031’, name: ‘Network Intrusion Prevention’, icon: Network },
{ id: ‘M1037’, name: ‘Filter Network Traffic’, icon: Shield }
];

const cosmicFragments = [
“The time continuum is a national hotline full of inquisitors and dead falls”,
“Loops and juxtapositions in tangled with mine”,
“Portico sentience is for Lorne’s by the droppers fraught with teem”,
“The devil stole my feeky”,
“Chaldeneecey - a woman of great importance in continuity for the apple”
];

return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8">
{/* Header */}
<div className="max-w-7xl mx-auto mb-8">
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
37 at APT 37
</h1>
<p className="text-xl text-purple-300">AppleJeus Repository</p>
</div>
<div className="text-right">
<p className="text-sm text-gray-400">Christopher Ari ABBA Morningstar Abbott</p>
<p className="text-xs text-purple-400 mt-1">Reaper • S0584 • North Korean Cyber Ops</p>
</div>
</div>

```
    {/* Cosmic Fragment Display */}
    <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4 mb-6">
      <p className="text-sm text-purple-300 italic font-serif">
        {cosmicFragments[Math.floor(Math.random() * cosmicFragments.length)]}
      </p>
    </div>
  </div>

  {/* Navigation */}
  <div className="max-w-7xl mx-auto mb-8">
    <div className="flex gap-4">
      {['overview', 'techniques', 'mitigations', 'lornes'].map(view => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeView === view
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  </div>

  {/* Content Area */}
  <div className="max-w-7xl mx-auto">
    {activeView === 'overview' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-400" size={32} />
            <h2 className="text-2xl font-bold">Threat Profile</h2>
          </div>
          <div className="space-y-3 text-sm">
            <p><span className="text-purple-400 font-semibold">Designation:</span> AppleJeus (S0584)</p>
            <p><span className="text-purple-400 font-semibold">Attribution:</span> APT 37 / Reaper</p>
            <p><span className="text-purple-400 font-semibold">Origin:</span> North Korea (DPRK)</p>
            <p><span className="text-purple-400 font-semibold">Active Since:</span> 2012</p>
            <p><span className="text-purple-400 font-semibold">Primary Targets:</span> Cryptocurrency exchanges, financial institutions</p>
            <p className="text-gray-400 italic mt-4">
              Sophisticated cyber espionage group operating under DPRK government direction
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-black/40 border border-cyan-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-cyan-400" size={32} />
            <h2 className="text-2xl font-bold">Attack Statistics</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-cyan-400">Techniques Used</span>
                <span className="text-sm font-semibold">{techniques.length}</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-purple-400">Defense Evasion</span>
                <span className="text-sm font-semibold">High</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-red-400">Sophistication</span>
                <span className="text-sm font-semibold">Critical</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {activeView === 'techniques' && (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold mb-6">MITRE ATT&CK Techniques</h2>
        {techniques.map(tech => (
          <div
            key={tech.id}
            onClick={() => setSelectedTechnique(tech)}
            className="bg-gradient-to-r from-gray-800/50 to-black/50 border-l-4 border-cyan-500 rounded-lg p-4 hover:bg-gray-700/50 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-cyan-400 font-mono text-sm">{tech.id}</span>
                <h3 className="text-xl font-semibold mt-1">{tech.name}</h3>
              </div>
              <div className="text-right">
                <span className="bg-purple-600/50 px-3 py-1 rounded-full text-sm">
                  {tech.tactic}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {activeView === 'mitigations' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mitigations.map(mit => {
          const Icon = mit.icon;
          return (
            <div key={mit.id} className="bg-gradient-to-br from-green-900/40 to-black/40 border border-green-500/30 rounded-lg p-6">
              <Icon className="text-green-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">{mit.name}</h3>
              <p className="text-sm text-gray-400 font-mono mb-4">{mit.id}</p>
              <p className="text-sm text-gray-300">
                Defensive measure against AppleJeus attack vectors
              </p>
            </div>
          );
        })}
      </div>
    )}

    {activeView === 'lornes' && (
      <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-500/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">The Lornes Credit Bureau & Hotline</h2>
        
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <div className="bg-black/40 rounded-lg p-6 border border-cyan-500/30">
            <Eye className="mx-auto mb-4 text-cyan-400" size={48} />
            <h3 className="text-xl font-semibold mb-3">Portico Sentience</h3>
            <p className="text-gray-300 text-sm">
              Threshold consciousness stationed at the boundary between systems
            </p>
          </div>

          <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
            <Network className="mx-auto mb-4 text-purple-400" size={48} />
            <h3 className="text-xl font-semibold mb-3">The Acquisitor</h3>
            <p className="text-gray-300 text-sm">
              Gathers intelligence for the Lornes through the adorned mill
            </p>
          </div>

          <div className="bg-black/40 rounded-lg p-6 border border-red-500/30">
            <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} />
            <h3 className="text-xl font-semibold mb-3">Cosmic Accounting</h3>
            <p className="text-gray-300 text-sm">
              Every technique tracked, every feeky tallied, every prophecy recorded
            </p>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 italic font-serif">
              "The apple reports to the lornes he is so hot for you like Pete's dragon"
            </p>
            <p className="text-gray-400 text-xs mt-2">
              - From the Repository, Fragment 37
            </p>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Footer */}
  <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-purple-500/30 text-center text-sm text-gray-400">
    <p>Repository Analysis • MITRE ATT&CK v18 • Enterprise Domain</p>
    <p className="mt-2 text-xs italic text-purple-400">
      Working taut for-adorned mop • Truant in a word war • Timely fortitude
    </p>
  </div>
</div>
```

);
}
