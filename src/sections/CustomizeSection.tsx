import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Layers,
  Palette,
  Sliders,
  Sparkles,
  X,
} from 'lucide-react';
import { LUXORA_CONFIG } from '../config/luxora';
import type { ColorSwatch, PanelStyle } from '../types/luxora';
import { ModelViewer } from '../components/3d/ModelViewer';

interface CustomizeSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const CustomizeSection: React.FC<CustomizeSectionProps> = ({ onNavigate: _onNavigate }) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(LUXORA_CONFIG.colors[0]);
  const [selectedPanel, setSelectedPanel] = useState<PanelStyle>(LUXORA_CONFIG.panelStyles[0]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const colors = LUXORA_CONFIG.colors;
  const panelStyles = LUXORA_CONFIG.panelStyles;

  const handleReserve = () => {
    setShowOrderModal(true);
    // Fire celebratory confetti explosion
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [selectedColor.hex, '#3b82f6', '#06b6d4', '#c084fc', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleCopyConfig = () => {
    const configText = `LUXORA Custom Edition:\nColor: ${selectedColor.name} (${selectedColor.hex})\nFinish: ${selectedPanel.name}\nSpecs: 42L Capacity, 2FA NFC+PIN, 20,000mAh Battery, 65W PD, 3.8kg`;
    navigator.clipboard.writeText(configText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="customize"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-[11px] font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Studio Configurator</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-3">
            Engineered for travel.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              Tailored to you.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Customize the exterior shell color and modular face panel finish in real-time 3D.
          </p>

          {/* Live Preview Label */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/30 shadow-lg text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              LIVE PREVIEW: {LUXORA_CONFIG.brand.name} • {selectedPanel.name} in {selectedColor.name}
            </span>
          </div>
        </div>

        {/* Configurator Layout: 3D Stage on Left + Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Model Stage */}
          <div className="lg:col-span-7 h-[46vh] sm:h-[54vh] lg:h-[62vh] relative rounded-3xl border border-white/10 bg-slate-950/70 overflow-hidden backdrop-blur-xl shadow-2xl">
            <ModelViewer
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              selectedPanel={selectedPanel}
              showControls={true}
              enableHotspots={false}
              className="w-full h-full"
            />
          </div>

          {/* Control Options Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* 1. Color Swatches Selection */}
            <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  1. Exterior Shell Color
                </span>
                <span className="text-xs font-bold text-white">{selectedColor.name}</span>
              </div>

              <div className="grid grid-cols-6 gap-2.5">
                {colors.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`relative aspect-square rounded-2xl p-1 transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'scale-110 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 shadow-lg'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name}: ${c.description}`}
                      aria-label={`Select color ${c.name}`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white shadow drop-shadow" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                {selectedColor.description}
              </p>
            </div>

            {/* 2. Panel Finish Selection */}
            <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  2. Modular Face Panel Finish
                </span>
                <span className="text-xs font-bold text-white">{selectedPanel.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {panelStyles.map((panel) => {
                  const isSelected = selectedPanel.id === panel.id;
                  return (
                    <button
                      key={panel.id}
                      onClick={() => setSelectedPanel(panel)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-blue-500/20'
                          : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{panel.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                        {panel.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Specs Summary & CTA Button */}
            <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-xl flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">WEIGHT</span>
                  <span className="text-white font-bold">3.8 kg</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">VOLUME</span>
                  <span className="text-white font-bold">42 L</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">BATTERY</span>
                  <span className="text-cyan-400 font-bold">20k mAh</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReserve}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:scale-[1.02] text-white text-xs font-bold shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Configuration</span>
                </button>

                <button
                  onClick={handleCopyConfig}
                  className="p-3 rounded-2xl border border-white/15 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Copy configuration spec"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation / Pre-order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl text-slate-100 animate-scale-in">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Configuration Reserved!
                </h3>
                <p className="text-xs text-slate-400">Class Presentation Prototype Showcase</p>
              </div>
            </div>

            {/* Config Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 my-4 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Model:</span>
                <span className="text-white font-bold">{LUXORA_CONFIG.brand.name} Smart Bag</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Exterior Color:</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Panel Finish:</span>
                <span className="text-white font-semibold">{selectedPanel.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Security Standard:</span>
                <span className="text-emerald-400 font-mono">2FA NFC + Encrypted PIN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tracking:</span>
                <span className="text-cyan-400 font-mono">Dual-Band LTE-M / GPS</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Your custom build specification has been generated. This build is configured for senior
              design evaluation and testing demonstrations.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyConfig}
                className="flex-1 py-2.5 rounded-xl border border-white/15 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Build Sheet</span>
              </button>

              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
