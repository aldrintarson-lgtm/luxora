import React, { useState } from 'react';
import {
  AlertOctagon,
  BatteryCharging,
  CheckCircle2,
  Lock,
  Luggage,
  MapPinOff,
  Navigation,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ProblemSolutionSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'breakdown'>('comparison');

  const painPoints = [
    {
      icon: MapPinOff,
      stat: '26M+',
      label: 'Lost Luggage Yearly',
      problem: 'Mishandled, delayed, or lost luggage causes billions in traveler losses with zero live tracking.',
      solution: 'Dual-Band GPS + LTE-M sub-meter global tracking right inside your mobile phone app.',
      solutionIcon: Navigation,
    },
    {
      icon: Lock,
      stat: '84%',
      label: 'Vulnerable Locks',
      problem: 'Generic 3-digit zipper locks are easily bypassed with a ballpoint pen in under 5 seconds.',
      solution: 'Cryptographic 2FA TSA lock requiring both authorized NFC tag AND 4-digit PIN.',
      solutionIcon: ShieldCheck,
    },
    {
      icon: BatteryCharging,
      stat: '68%',
      label: 'Dead Device Anxiety',
      problem: 'Travelers scramble for broken airport wall outlets or carry heavy tangled power banks.',
      solution: 'Integrated 20,000mAh airline-compliant power hub with 65W USB-C Power Delivery.',
      solutionIcon: Zap,
    },
    {
      icon: Luggage,
      stat: '3.4x',
      label: 'Clumsy & Fragile Bags',
      problem: 'Cracked plastic shells, broken wheels on curbs, balancing hot coffee and phone awkwardly.',
      solution: 'Impact-resistant monocoque body, 360° Hinomoto dual wheels, fold-out stand & cup holder.',
      solutionIcon: Sparkles,
    },
  ];

  return (
    <section
      id="problem-solution"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-[11px] font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problem & Solution Analysis</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Why luggage was overdue for a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              revolution.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conventional travel bags are passive, fragile containers that haven't evolved in decades.
            LUXORA solves every major travel pain point into a single, cohesive smart system.
          </p>

          {/* View Mode Toggle */}
          <div className="mt-5 inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'comparison'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'breakdown'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              The 4 Major Travel Pain Points
            </button>
          </div>
        </div>

        {/* Comparison Grid View */}
        {activeTab === 'comparison' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conventional Bag (The Problem) */}
            <div className="p-6 sm:p-8 rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-slate-950/60 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                    Conventional Luggage
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Passive & Vulnerable</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertOctagon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white block">Zero Tracking Visibility</strong>
                    Once checked, you have no idea where your bag is until it arrives (or doesn't).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white block">Easily Picked 3-Digit Zipper Locks</strong>
                    Pen-pierce attacks open zipper locks in seconds without leaving a mark.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white block">Battery Scramble at Terminals</strong>
                    Tethered to airport floor outlets with dead phones and work laptops.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white block">Clumsy Terminal Mobility</strong>
                    Juggling a boarding pass, coffee cup, and rolling a bag that rattles and jams.
                  </div>
                </div>
              </div>
            </div>

            {/* LUXORA Smart Bag (The Solution) */}
            <div className="p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-blue-950/30 to-slate-950/80 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    LUXORA Smart Ecosystem
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Autonomous & Connected</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#06b6d4]" />
                  <div>
                    <strong className="text-white block">Global LTE-M + GPS Telemetry</strong>
                    Locate lost or misplaced luggage live from your phone anywhere in the world.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#06b6d4]" />
                  <div>
                    <strong className="text-white block">Two-Factor Authentication Lock</strong>
                    Requires BOTH authorized NFC tag AND PIN code before solenoid latch releases.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#06b6d4]" />
                  <div>
                    <strong className="text-white block">65W High-Speed USB-C Hub</strong>
                    Fast charge smartphones, tablets, and MacBooks directly from the bag.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#06b6d4]" />
                  <div>
                    <strong className="text-white block">Ergonomic Hands-Free Travel</strong>
                    Retractable beverage holder, deployable video-call phone stand, and 360° wheels.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Detailed 4 Pain Point Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((item, index) => {
              const ProblemIcon = item.icon;
              const SolutionIcon = item.solutionIcon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <ProblemIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-extrabold font-mono text-white">
                        {item.stat}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1.5">{item.label}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.problem}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs mb-1">
                      <SolutionIcon className="w-3.5 h-3.5" />
                      <span>LUXORA Answer</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{item.solution}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA to Jump to 3D Tour */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('showcase')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
          >
            <span>See How It Works in 3D (Interactive Tour)</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
