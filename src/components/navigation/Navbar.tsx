import React, { useEffect, useState } from 'react';
import { Menu, Sliders, Tv, X } from 'lucide-react';
import { LUXORA_CONFIG } from '../../config/luxora';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSectionId: string;
  onTogglePresenterHelper: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSectionId,
  onTogglePresenterHelper,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
      } else if (lastScrollY - currentScrollY > 10) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Overview', id: 'hero' },
    { label: 'Why LUXORA', id: 'problem-solution' },
    { label: '3D Showcase', id: 'showcase' },
    { label: 'Bento Grid', id: 'bento' },
    { label: 'Customize', id: 'customize' },
    { label: 'Design R&D', id: 'design-process' },
    { label: 'Team', id: 'team' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="flex items-center justify-between px-5 py-3 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-2xl">
            {/* Brand Logo */}
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-sm">
                    L
                  </span>
                </div>
              </div>
              <div>
                <span className="font-extrabold tracking-widest text-white text-base font-heading">
                  {LUXORA_CONFIG.brand.name}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1.5 animate-pulse" />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSectionId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-cyan-300 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right CTAs: Presenter HUD trigger & Customize Button */}
            <div className="flex items-center gap-2">
              {/* Presenter Mode Badge Button */}
              <button
                onClick={onTogglePresenterHelper}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 hover:text-white text-xs font-medium transition-all shadow-sm"
                title="Open Presenter Mode Shortcuts (Key: P)"
              >
                <Tv className="w-3.5 h-3.5 text-purple-400" />
                <span>Presenter Mode</span>
                <kbd className="text-[10px] bg-purple-900/80 px-1 py-0.2 rounded text-purple-200 ml-0.5">
                  P
                </kbd>
              </button>

              {/* Customize CTA */}
              <button
                onClick={() => onNavigate('customize')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-xl lg:hidden text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl lg:hidden flex flex-col p-6 animate-fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-extrabold tracking-widest text-white text-lg">
              {LUXORA_CONFIG.brand.name}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2 py-6 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-left text-sm font-semibold transition-colors ${
                  activeSectionId === link.id
                    ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onTogglePresenterHelper();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Tv className="w-4 h-4 text-purple-400" />
              Presenter Mode Shortcuts
            </button>
            <button
              onClick={() => {
                onNavigate('customize');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg"
            >
              Customize LUXORA Bag
            </button>
          </div>
        </div>
      )}
    </>
  );
};
