import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Cpu,
  Navigation,
  Palette,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import { LUXORA_CONFIG } from '../config/luxora';
import type { Feature } from '../types/luxora';
import { ModelViewer } from '../components/3d/ModelViewer';

interface ShowcaseSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onNavigate }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const features = LUXORA_CONFIG.features;
  const currentFeature = features[activeFeatureIndex];

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleNext = () => {
    setActiveFeatureIndex((prev) => (prev < features.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveFeatureIndex((prev) => (prev > 0 ? prev - 1 : features.length - 1));
  };

  const handleSelectHotspot = (feature: Feature) => {
    const idx = features.findIndex((f) => f.id === feature.id);
    if (idx !== -1) {
      setActiveFeatureIndex(idx);
    }
  };

  return (
    <section
      id="showcase"
      className="relative min-h-screen w-full flex flex-col justify-between py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
        {/* Section Top Header & Step Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-[11px] font-semibold text-cyan-300 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scroll-Driven 3D Feature Tour</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Precision Engineering.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Inside & Out.
              </span>
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md self-start sm:self-auto">
            <span className="text-xs font-mono text-slate-400">
              Feature{' '}
              <span className="text-white font-bold text-sm">{activeFeatureIndex + 1}</span> of{' '}
              {features.length}
            </span>
            <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{
                  width: `${((activeFeatureIndex + 1) / features.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Previous Feature"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Next Feature"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Fast Selector Chips (1 to 9) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none mb-3">
          {features.map((feat, index) => {
            const isActive = activeFeatureIndex === index;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureIndex(index)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{index + 1}.</span>
                <span>{feat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage: Split Layout with Pinned 3D Model & Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 my-2 min-h-[480px]">
          {/* Pinned 3D Model with dynamic camera view per feature */}
          <div className="lg:col-span-7 h-[42vh] sm:h-[48vh] lg:h-[58vh] relative rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden backdrop-blur-xl shadow-2xl">
            <ModelViewer
              activeFeature={currentFeature}
              onSelectFeature={handleSelectHotspot}
              showControls={true}
              enableHotspots={true}
              className="w-full h-full"
            />
            {/* Camera angle indicator pill */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-950/80 border border-white/10 px-3 py-1 rounded-full text-[11px] text-cyan-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Camera Target: {currentFeature.title}</span>
            </div>
          </div>

          {/* Feature Information Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              {/* Feature Category and Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  {currentFeature.category}
                </span>
                {currentFeature.badge && (
                  <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/20">
                    {currentFeature.badge}
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  {getFeatureIcon(currentFeature.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    {currentFeature.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{currentFeature.tagline}</p>
                </div>
              </div>

              {/* Exact Feature Description as required */}
              <div className="my-4 p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  <span className="text-cyan-400 font-semibold">{currentFeature.title}: </span>
                  {currentFeature.description}
                </p>
              </div>

              {/* Key Specs Pills */}
              {currentFeature.specs && (
                <div className="mb-6 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Engineering Specs
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentFeature.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feature Navigation Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => onNavigate('bento')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
                >
                  View Bento Grid Overview →
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-xs text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 rounded-xl font-medium shadow-md transition-colors"
                >
                  <span>Next Feature</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
