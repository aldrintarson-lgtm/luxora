import React, { useEffect, useState } from 'react';
import { LUXORA_CONFIG } from '../config/luxora';

interface PreloaderProps {
  isLoaded: boolean;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoaded, onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95 && !isLoaded) {
          return 95;
        }
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setProgress(100);
      const timeout = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 600);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center p-6 transition-all duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

      {/* Center Brand Monogram */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-2xl shadow-blue-500/40 mb-6 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              L
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-white font-heading mb-2">
          {LUXORA_CONFIG.brand.name}
        </h1>

        <p className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-8">
          {LUXORA_CONFIG.brand.tagline}
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading subtext */}
        <div className="flex items-center justify-between w-64 mt-3 text-[10px] font-mono text-slate-400">
          <span>INITIALIZING 3D ENGINE</span>
          <span className="text-cyan-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
