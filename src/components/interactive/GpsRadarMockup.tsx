import React, { useState } from 'react';
import { BatteryCharging, Compass, MapPin, Navigation, Radio, Volume2, Wifi } from 'lucide-react';

export const GpsRadarMockup: React.FC = () => {
  const [isPinging, setIsPinging] = useState(false);
  const [mapMode, setMapMode] = useState<'vector' | 'satellite'>('vector');

  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
    }, 2200);
  };

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-slate-950 border-2 border-slate-700/60 rounded-[32px] p-3 shadow-2xl shadow-blue-500/10 relative overflow-hidden select-none">
      {/* Smartphone Outer Gloss & Dynamic Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full border border-white/10 z-30 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-white/20" />
      </div>

      {/* Screen Area */}
      <div className="rounded-[24px] bg-slate-900/90 border border-white/10 p-3 pt-5 flex flex-col relative overflow-hidden">
        {/* Phone Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 px-1">
          <span className="font-semibold text-white">09:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-cyan-400" />
            <span className="text-[9px] font-mono text-cyan-400">LTE-M</span>
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-mono">94%</span>
          </div>
        </div>

        {/* Map Header */}
        <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-xl border border-white/5 mb-2">
          <div>
            <h5 className="text-[11px] font-bold text-white flex items-center gap-1">
              <Navigation className="w-3 h-3 text-blue-400 fill-blue-400" />
              LUXORA Bag #01
            </h5>
            <p className="text-[9px] text-slate-400">Terminal 2 • Baggage Claim 4</p>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ONLINE
          </span>
        </div>

        {/* Radar Map Canvas */}
        <div
          className={`relative h-44 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center transition-colors duration-500 ${
            mapMode === 'vector' ? 'bg-[#060b14]' : 'bg-[#0f172a]'
          }`}
        >
          {/* Subtle Grid Map Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Concentric Radar Rings */}
          <div className="absolute w-36 h-36 rounded-full border border-blue-500/20" />
          <div className="absolute w-24 h-24 rounded-full border border-blue-500/30" />
          <div className="absolute w-12 h-12 rounded-full border border-cyan-500/40" />

          {/* Rotating Radar Sweep */}
          <div className="absolute w-36 h-36 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.25)_60deg,transparent_65deg)] animate-spin" />

          {/* User Marker (Center) */}
          <div className="absolute w-3 h-3 rounded-full bg-blue-500 border border-white shadow-md z-10" />

          {/* LUXORA Luggage Marker (Offset) */}
          <div className="absolute top-10 right-14 flex flex-col items-center z-20">
            {/* Ping pulse wave */}
            {isPinging && (
              <span className="absolute -inset-3 rounded-full bg-cyan-400/40 animate-ping" />
            )}
            <div className="relative w-6 h-6 rounded-full bg-cyan-500 text-black border border-cyan-200 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="mt-1 bg-slate-950/90 border border-cyan-400/40 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-300 whitespace-nowrap shadow">
              2.4m away
            </div>
          </div>

          {/* Map Mode Toggle & Compass */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <button
              onClick={() => setMapMode(mapMode === 'vector' ? 'satellite' : 'vector')}
              className="text-[9px] bg-slate-950/80 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 hover:text-white"
            >
              {mapMode === 'vector' ? 'Vector' : 'Sat'}
            </button>
          </div>
          <div className="absolute top-2 right-2 text-slate-400">
            <Compass className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Telemetry Readout */}
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[9px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-white/5">
          <div>
            <span className="text-slate-400">COORD: </span>
            <span className="text-white">37°46'N 122°25'W</span>
          </div>
          <div>
            <span className="text-slate-400">STATUS: </span>
            <span className="text-emerald-400">Stationary</span>
          </div>
        </div>

        {/* Action Button: Ping Luggage */}
        <button
          onClick={handlePing}
          disabled={isPinging}
          className={`mt-2 w-full py-1.5 px-3 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
            isPinging
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-blue-600/30 hover:bg-blue-600/50 border-blue-400/40 text-white'
          }`}
        >
          {isPinging ? (
            <>
              <Radio className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Chirping Luggage Beacon...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-blue-300" />
              <span>Play Proximity Ping Sound</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
