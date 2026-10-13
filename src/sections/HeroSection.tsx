import React, { useState } from 'react';
import { ArrowDown, ChevronRight, Play, Shield, Sliders, Sparkles } from 'lucide-react';
import { LUXORA_CONFIG } from '../config/luxora';
import type { ColorSwatch } from '../types/luxora';
import { ModelViewer } from '../components/3d/ModelViewer';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onModelLoaded?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onModelLoaded }) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(LUXORA_CONFIG.colors[0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Cinematic Gradients and Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-center electric glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600/15 to-purple-600/15 blur-[140px]" />
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-2 sm:mt-4">
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 backdrop-blur-md mb-4 shadow-lg shadow-blue-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-300">
            Next-Gen Smart Travel Hardware
          </span>
          <span className="w-1 h-1 rounded-full bg-blue-400" />
          <span className="text-[11px] text-slate-300">Class Presentation Edition</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-heading leading-[1.08] mb-4">
          Travel smarter.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
            Travel secure.
          </span>
        </h1>

        {/* Subheadline / Product summary */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {LUXORA_CONFIG.brand.shortDescription}
        </p>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('showcase')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore 9 Features</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('customize')}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-slate-900/70 hover:bg-slate-800/80 text-white font-semibold text-sm backdrop-blur-md transition-all hover:border-cyan-400/40 hover:scale-105 active:scale-95"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Customize Bag</span>
          </button>

          <button
            onClick={() => onNavigate('problem-solution')}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 text-sm font-medium transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-purple-300" />
            <span>Start Presentation</span>
          </button>
        </div>
      </div>

      {/* Large Centered 3D Model Viewer Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[48vh] sm:h-[56vh] md:h-[60vh] my-4">
        <ModelViewer
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          showControls={true}
          enableHotspots={true}
          onLoaded={onModelLoaded}
          className="rounded-3xl border border-white/5 bg-gradient-to-b from-slate-950/40 to-slate-900/20 backdrop-blur-sm"
        />
      </div>

      {/* Bottom Feature Teaser Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-slate-400">
        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-medium">Dual-Factor NFC + PIN Lock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-slate-200 font-medium">Worldwide GPS Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-slate-200 font-medium">65W USB-C Fast Charge</span>
          </div>
        </div>

        {/* Scroll Cue */}
        <button
          onClick={() => onNavigate('problem-solution')}
          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span>Scroll to begin presentation</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
