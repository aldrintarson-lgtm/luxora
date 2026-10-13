import React, { useState } from 'react';
import { Eye, Layers, PenTool, Sparkles, X, ZoomIn } from 'lucide-react';
import { BeforeAfterSlider } from '../components/interactive/BeforeAfterSlider';

interface DesignProcessSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const DesignProcessSection: React.FC<DesignProcessSectionProps> = ({
  onNavigate: _onNavigate,
}) => {
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'sketch-1',
      title: 'Phase 1: Industrial Design Blueprint',
      subtitle: 'Orthographic Views & Dimensional Form-Factor',
      image: '/images/sketch-1.jpg',
      tag: 'Concept Sketch',
      description:
        'Initial CAD schematics establishing the 550mm carry-on envelope, 3.8kg tare weight target, aluminum trolley handle integration, and aerodynamic rib channels.',
    },
    {
      id: 'sketch-2',
      title: 'Phase 2: Mechanism Engineering',
      subtitle: '2FA NFC Lock, Mobile Stand & Cup Holder',
      image: '/images/sketch-2.jpg',
      tag: 'Mechanism Detail',
      description:
        'Precision mechanical blueprints for the deployable 60° smartphone clip, flush-fit spring-loaded cup cradle ring, and the weather-sealed 2FA keypad assembly.',
    },
    {
      id: 'render-1',
      title: 'Phase 3: Hyper-Realistic Studio CGI',
      subtitle: 'Final Materials & Optical Lighting Validation',
      image: '/images/render-1.jpg',
      tag: 'Final 3D Render',
      description:
        'High-fidelity studio raytraced render validating the matte titanium polycarbonate matrix, 3K carbon weave accents, and electroluminescent status halos.',
    },
  ];

  return (
    <section
      id="design-process"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-[11px] font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            <PenTool className="w-3.5 h-3.5 text-cyan-400" />
            <span>Industrial Design & R&D Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-3">
            From hand sketches to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              production prototype.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Trace the iterative engineering journey of LUXORA from conceptual blueprint sketches to
            functional CAD mechanisms and photorealistic studio renders.
          </p>
        </div>

        {/* 1. Interactive Before / After Slider Showcase */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="p-4 sm:p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Concept Sketch vs. Photorealistic 3D Prototype
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Interactive Split Slider</span>
            </div>

            <BeforeAfterSlider
              beforeImage="/images/sketch-1.jpg"
              afterImage="/images/render-1.jpg"
              beforeLabel="R&D Concept Blueprint"
              afterLabel="Final 3D Render"
            />
          </div>
        </div>

        {/* 2. Gallery Cards: Sketch 1, Sketch 2, Render 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image Container with Zoom Button */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-white/10">
                      {item.tag}
                    </span>
                    <button
                      onClick={() => setActiveImageZoom(item.image)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-slate-900 transition-colors"
                      title="Enlarge Image"
                    >
                      <ZoomIn className="w-4 h-4 text-white hover:text-slate-900" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded-md bg-cyan-950/50 border border-cyan-500/20">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-0.5">{item.title}</h4>
                <p className="text-xs text-slate-400 font-medium mb-3">{item.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  CAD Approved
                </span>
                <button
                  onClick={() => setActiveImageZoom(item.image)}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activeImageZoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <button
            onClick={() => setActiveImageZoom(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-white/20 text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2">
            <img
              src={activeImageZoom}
              alt="Enlarged R&D Blueprint"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/15 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
