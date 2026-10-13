import React from 'react';
import {
  Battery,
  Coffee,
  Cpu,
  Layers,
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
import { GpsRadarMockup } from '../components/interactive/GpsRadarMockup';
import { TwoFactorDemo } from '../components/interactive/TwoFactorDemo';

interface BentoSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const BentoSection: React.FC<BentoSectionProps> = ({ onNavigate }) => {
  const features = LUXORA_CONFIG.features;

  return (
    <section
      id="bento"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-[11px] font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Integrated Hardware Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            9 Innovations.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              One Smart Travel Bag.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every component of LUXORA is meticulously engineered to combine security, tracking,
            power, and travel convenience in a durable, customizable form factor.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: GPS Tracking (Large Card with Interactive Phone Mockup) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 01 • Security
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {features[0].title}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-white/5 self-start sm:self-auto">
                LTE-M + BLE 5.3 + Dual-Band GPS
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              <strong className="text-white">{features[0].title}: </strong>
              {features[0].description}
            </p>

            {/* Embedded Live CSS Phone Mockup */}
            <div className="w-full pt-2">
              <GpsRadarMockup />
            </div>
          </div>

          {/* Card 2: Two-Factor Authentication Lock (Large Card with Interactive 2FA Demo) */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 02 • Security
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading">{features[1].title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[1].title}: </strong>
                {features[1].description}
              </p>
            </div>

            {/* Embedded Interactive 2FA Flow */}
            <div className="w-full mt-2">
              <TwoFactorDemo />
            </div>
          </div>

          {/* Card 3: Customizable Appearance */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Feature 03 • Smart Tech
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[2].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[2].title}: </strong>
                {features[2].description}
              </p>
            </div>

            {/* Swappable Panel Preview Graphic */}
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Modular Face Shells</span>
                <span className="text-cyan-400">Tool-less Quick-Snap</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <div className="h-10 rounded-lg bg-zinc-800 border border-white/20 flex items-center justify-center text-[10px] text-slate-300 font-mono">
                  Matte
                </div>
                <div className="h-10 rounded-lg bg-[repeating-linear-gradient(45deg,#1f2937,#1f2937_2px,#111827_2px,#111827_4px)] border border-white/20 flex items-center justify-center text-[10px] text-slate-300 font-mono">
                  Carbon
                </div>
                <div className="h-10 rounded-lg bg-gradient-to-r from-slate-400 to-slate-200 text-black border border-white/40 flex items-center justify-center text-[10px] font-bold font-mono">
                  Alloy
                </div>
                <div className="h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border border-white/20 flex items-center justify-center text-[10px] text-white font-mono">
                  Nebula
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Durable Body */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 04 • Durability
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[3].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[3].title}: </strong>
                {features[3].description}
              </p>
            </div>

            {/* Impact specs visual */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Tri-Layer Polycarbonate Matrix
                </span>
                <span className="font-mono text-cyan-400">Mil-Std 810H</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Reinforced Aircraft Corner Bumpers</span>
                <span className="font-mono text-emerald-400">IP65 Sealed</span>
              </div>
            </div>
          </div>

          {/* Card 5: Foldable Mobile Stand */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 05 • Convenience
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[4].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[4].title}: </strong>
                {features[4].description}
              </p>
            </div>

            {/* Visual device cradle mockup */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-11 rounded-md border-2 border-cyan-400/80 bg-slate-900 flex items-center justify-center text-[9px] font-mono text-cyan-300 shadow">
                  📱
                </div>
                <div>
                  <p className="font-semibold text-white">60° Optimized Viewing</p>
                  <p className="text-[10px] text-slate-400">Hands-free Zoom, FaceTime & movies</p>
                </div>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">Folds Flush</span>
            </div>
          </div>

          {/* Card 6: Retractable Cup Holder */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 06 • Convenience
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[5].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[5].title}: </strong>
                {features[5].description}
              </p>
            </div>

            {/* Cup Holder Mechanism Visual */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center text-cyan-300 text-xs">
                  ☕
                </div>
                <div>
                  <p className="font-semibold text-white">Spring-Action Swing Arm</p>
                  <p className="text-[10px] text-slate-400">Holds cups, tumblers & 750ml bottles</p>
                </div>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">Zero Spill</span>
            </div>
          </div>

          {/* Card 7: Smart, Compact Design */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Feature 07 • Smart Tech
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[6].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[6].title}: </strong>
                {features[6].description}
              </p>
            </div>

            {/* OLED Dashboard Visual */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-300 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-white/10">
                <span>OLED DASHBOARD</span>
                <span className="text-emerald-400">TSA OK</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>LUGGAGE WEIGHT:</span>
                <span className="text-white font-bold">14.2 kg (Under Limit)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>2FA STATUS:</span>
                <span className="text-emerald-400">LATCH ARMED</span>
              </div>
            </div>
          </div>

          {/* Card 8: 360° Wheels */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 08 • Durability
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[7].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[7].title}: </strong>
                {features[7].description}
              </p>
            </div>

            {/* Wheel casters specs */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div>
                <p className="font-semibold text-white">Dual Hinomoto Spinner Casters</p>
                <p className="text-[10px] text-slate-400">Whisper-quiet polyurethane dampening</p>
              </div>
              <div className="w-7 h-7 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400 animate-spin">
                ⚙️
              </div>
            </div>
          </div>

          {/* Card 9: USB-C Charging */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Feature 09 • Convenience
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">{features[8].title}</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">{features[8].title}: </strong>
                {features[8].description}
              </p>
            </div>

            {/* USB-C PD meter */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Battery className="w-4 h-4 text-emerald-400" />
                  65W Power Delivery 3.0
                </span>
                <span className="font-mono text-cyan-400">20,000 mAh</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Fast charges MacBook Pro, iPhone & iPad simultaneously
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Jump to Studio Configurator */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('customize')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:scale-105 text-white text-sm font-bold shadow-2xl shadow-blue-500/30 transition-all active:scale-95"
          >
            <Palette className="w-4 h-4" />
            <span>Launch 3D Studio Configurator</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
