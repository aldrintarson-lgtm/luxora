import { useCallback, useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { PresenterHUD } from './components/navigation/PresenterHUD';
import { Preloader } from './components/Preloader';
import { usePresenterMode } from './hooks/usePresenterMode';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { BentoSection } from './sections/BentoSection';
import { CustomizeSection } from './sections/CustomizeSection';
import { DesignProcessSection } from './sections/DesignProcessSection';
import { HeroSection } from './sections/HeroSection';
import { ProblemSolutionSection } from './sections/ProblemSolutionSection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { TeamSection } from './sections/TeamSection';

export default function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const { scrollTo } = useSmoothScroll();

  const handleNavigate = useCallback(
    (target: string) => {
      const cleanTarget = target.startsWith('#') ? target : `#${target}`;
      scrollTo(cleanTarget);
    },
    [scrollTo]
  );

  const {
    currentSectionIndex,
    totalSections,
    sections,
    goToSection,
    goToNextSection,
    goToPrevSection,
    isFullscreen,
    toggleFullscreen,
    showPresenterHelper,
    setShowPresenterHelper,
  } = usePresenterMode({
    onScrollTo: handleNavigate,
  });

  const activeSectionId = sections[currentSectionIndex]?.id || 'hero';

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-cyan-200">
      {/* Luxury Preloader */}
      {!preloaderDone && (
        <Preloader
          isLoaded={isModelLoaded}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* Glassmorphic Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSectionId={activeSectionId}
        onTogglePresenterHelper={() => setShowPresenterHelper(!showPresenterHelper)}
      />

      {/* Floating Presenter Mode Controls & Side Dots Indicator */}
      <PresenterHUD
        currentSectionIndex={currentSectionIndex}
        totalSections={totalSections}
        goToSection={goToSection}
        goToNextSection={goToNextSection}
        goToPrevSection={goToPrevSection}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        showHelper={showPresenterHelper}
        setShowHelper={setShowPresenterHelper}
      />

      {/* Main Presentation Slides (7 Full-Screen Sections) */}
      <main className="w-full">
        {/* Section 1: Hero */}
        <HeroSection
          onNavigate={handleNavigate}
          onModelLoaded={() => setIsModelLoaded(true)}
        />

        {/* Section 2: Problem & Solution */}
        <ProblemSolutionSection onNavigate={handleNavigate} />

        {/* Section 3: 3D Feature Showcase */}
        <ShowcaseSection onNavigate={handleNavigate} />

        {/* Section 4: Bento Grid */}
        <BentoSection onNavigate={handleNavigate} />

        {/* Section 5: Studio Configurator */}
        <CustomizeSection onNavigate={handleNavigate} />

        {/* Section 6: Design & R&D Process */}
        <DesignProcessSection onNavigate={handleNavigate} />

        {/* Section 7: Team, Objective & Footer */}
        <TeamSection onNavigate={handleNavigate} />
      </main>
    </div>
  );
}
