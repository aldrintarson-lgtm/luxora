import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { LUXORA_CONFIG } from '../../config/luxora';
import type { Feature } from '../../types/luxora';

interface HotspotsProps {
  onSelectFeature?: (feature: Feature) => void;
  activeFeatureId?: number;
  visible?: boolean;
}

export const Hotspots: React.FC<HotspotsProps> = ({
  onSelectFeature,
  activeFeatureId,
  visible = true,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (!visible) return null;

  return (
    <group>
      {LUXORA_CONFIG.features.map((feature) => {
        if (!feature.hotspotPosition) return null;
        const isActive = activeFeatureId === feature.id;
        const isHovered = hoveredId === feature.id;

        return (
          <group key={feature.id} position={feature.hotspotPosition}>
            <Html center distanceFactor={8} zIndexRange={[100, 0]}>
              <div
                className="relative group cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectFeature && onSelectFeature(feature)}
              >
                {/* Pulsing ring indicator */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute inline-flex h-8 w-8 rounded-full opacity-75 animate-ping transition-colors ${
                      isActive ? 'bg-cyan-400' : 'bg-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full border shadow-lg text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500 border-cyan-300 text-black scale-125 shadow-cyan-500/50'
                        : 'bg-black/80 border-blue-400/80 text-white hover:scale-110 hover:border-white'
                    }`}
                    aria-label={`View feature: ${feature.title}`}
                  >
                    {feature.id}
                  </button>
                </div>

                {/* Glassmorphism tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-8 mb-2 w-56 p-3 rounded-xl border border-white/15 bg-slate-950/90 backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-none ${
                    isActive || isHovered
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-400">
                      {feature.category}
                    </span>
                    <span className="text-[10px] text-slate-400">#{feature.id}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    {feature.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-400 font-medium">
                    <span>Click to view angle</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
