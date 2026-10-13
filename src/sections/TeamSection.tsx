import { ArrowUp, FileText, Globe, Mail, Target, Users } from 'lucide-react';
import { LUXORA_CONFIG } from '../config/luxora';

interface TeamSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onNavigate }) => {
  const team = LUXORA_CONFIG.team;

  return (
    <section
      id="team"
      className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-600/10 to-purple-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Main Objective Highlight Card */}
        <div className="mb-14">
          <div className="p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-purple-950/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-[11px] font-semibold text-cyan-300 uppercase tracking-widest mb-4">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Project Objective</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight mb-4 tracking-tight">
              "{LUXORA_CONFIG.brand.objective}"
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Designed as an end-to-end intelligent hardware ecosystem for modern globetrotters,
              addressing security vulnerabilities, dead devices, and clumsy airport ergonomics.
            </p>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-[11px] font-semibold text-purple-300 uppercase tracking-widest mb-2">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Project Team & Engineering Leads</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              The Minds Behind LUXORA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Class presentation project team • Easily configurable in config/luxora.ts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Initials Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mb-4 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <span className="font-bold text-lg text-white font-mono">
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-0.5">{member.name}</h4>
                  <p className="text-xs font-semibold text-cyan-400 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                </div>

                {/* Social placeholders */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2 text-slate-400">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={`Portfolio for ${member.name}`}
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={`Research documents for ${member.name}`}
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-extrabold tracking-widest text-white text-base font-heading">
              {LUXORA_CONFIG.brand.name}
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300">"{LUXORA_CONFIG.brand.tagline}"</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-400">Class Presentation Showcase</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
              Hero
            </button>
            <button
              onClick={() => onNavigate('showcase')}
              className="hover:text-white transition-colors"
            >
              3D Tour
            </button>
            <button
              onClick={() => onNavigate('bento')}
              className="hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => onNavigate('customize')}
              className="hover:text-white transition-colors"
            >
              Configurator
            </button>

            <button
              onClick={() => onNavigate('hero')}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 text-white transition-all flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline text-[11px]">Top</span>
            </button>
          </div>
        </footer>

        <div className="text-center text-[11px] text-slate-400 mt-4 pb-2">
          © {new Date().getFullYear()} {LUXORA_CONFIG.brand.name}. All rights reserved. Designed for
          Senior Presentation & Product Launch.
        </div>
      </div>
    </section>
  );
};
