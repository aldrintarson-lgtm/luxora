import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Maximize2,
  Minimize2,
  Tv,
  X,
} from 'lucide-react';
import { LUXORA_CONFIG } from '../../config/luxora';

interface PresenterHUDProps {
  currentSectionIndex: number;
  totalSections: number;
  goToSection: (index: number) => void;
  goToNextSection: () => void;
  goToPrevSection: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  showHelper: boolean;
  setShowHelper: (show: boolean) => void;
}

export const PresenterHUD: React.FC<PresenterHUDProps> = ({
  currentSectionIndex,
  totalSections,
  goToSection,
  goToNextSection,
  goToPrevSection,
  isFullscreen,
  toggleFullscreen,
  showHelper,
  setShowHelper,
}) => {
  const sections = LUXORA_CONFIG.sections;
  const currentSection = sections[currentSectionIndex];

  return (
    <>
      {/* Subtle Right-Side Vertical Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 select-none">
        {sections.map((section, idx) => {
          const isActive = currentSectionIndex === idx;
          return (
            <div key={section.id} className="relative group flex items-center justify-end">
              {/* Tooltip on hover */}
              <div className="absolute right-7 py-1 px-2.5 rounded-lg bg-slate-950/90 border border-white/10 text-[11px] font-medium text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
                <span className="text-cyan-400 font-mono mr-1.5">{idx + 1}.</span>
                {section.title}
              </div>

              {/* Dot button */}
              <button
                type="button"
                onClick={() => goToSection(idx)}
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-3 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/60'
                }`}
                aria-label={`Jump to ${section.title}`}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Presenter Slide Badge & Controls in Bottom Left */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-2xl text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] text-cyan-400 font-bold">
              {currentSectionIndex + 1}/{totalSections}
            </span>
          </div>

          <div className="h-3 w-px bg-white/15 mx-0.5 hidden sm:block" />

          <span className="text-[11px] font-medium text-slate-300 hidden sm:inline max-w-[140px] truncate">
            {currentSection?.title}
          </span>

          <div className="flex items-center gap-1 ml-1">
            {/* Prev slide button */}
            <button
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous section (Up Arrow)"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>

            {/* Next slide button */}
            <button
              onClick={goToNextSection}
              disabled={currentSectionIndex === totalSections - 1}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next section (Down Arrow)"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen toggle button */}
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 ml-0.5"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Shortcuts Help button */}
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              title="Presenter Shortcuts (P)"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Presenter Shortcuts Modal */}
      {showHelper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-slate-950 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setShowHelper(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Class Presenter Mode</h3>
                <p className="text-xs text-slate-400">Keyboard shortcuts & presentation tools</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-300">Next Section</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 font-mono text-cyan-400 text-[11px]">
                  ↓ / → / PgDn
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-300">Previous Section</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 font-mono text-cyan-400 text-[11px]">
                  ↑ / ← / PgUp
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-300">Toggle Fullscreen</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 font-mono text-cyan-400 text-[11px]">
                  F
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-300">Toggle Shortcuts HUD</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 font-mono text-cyan-400 text-[11px]">
                  P
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-300">Jump to Beginning / End</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 font-mono text-cyan-400 text-[11px]">
                  Home / End
                </kbd>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Smooth 60FPS Presentation Flow</span>
              <button
                onClick={() => setShowHelper(false)}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
