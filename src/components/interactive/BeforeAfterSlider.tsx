import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = '/images/sketch-1.jpg',
  afterImage = '/images/render-1.jpg',
  beforeLabel = 'Hand-Drawn CAD Sketch',
  afterLabel = 'Final 3D Photorealistic Render',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Visual Slider Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 cursor-ew-resize bg-slate-950"
      >
        {/* After Image (Background: 3D Render) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Image (Foreground: Clipped Sketch) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-white to-purple-400 pointer-events-none shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Circular Knob */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={() => setIsDragging(true)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-white text-white flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform pointer-events-auto"
          >
            <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-cyan-300 pointer-events-none flex items-center gap-1.5">
          <span>{beforeLabel}</span>
        </div>

        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-purple-300 pointer-events-none flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{afterLabel}</span>
        </div>
      </div>

      {/* Control Caption & Slider Readout */}
      <div className="mt-3 flex items-center justify-between w-full text-xs text-slate-400 px-2">
        <span className="flex items-center gap-1 text-[11px]">
          <span>Drag slider or tap to compare</span>
        </span>
        <button
          onClick={() => setSliderPosition(50)}
          className="text-[11px] text-cyan-400 hover:text-white px-2 py-0.5 rounded border border-white/10 hover:border-cyan-400/40 transition-colors"
        >
          Reset Split (50/50)
        </button>
      </div>
    </div>
  );
};
