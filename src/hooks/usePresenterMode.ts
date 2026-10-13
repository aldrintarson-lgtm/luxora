import { useCallback, useEffect, useState } from 'react';
import { LUXORA_CONFIG } from '../config/luxora';

interface UsePresenterModeOptions {
  onScrollTo?: (target: string) => void;
}

export function usePresenterMode({ onScrollTo }: UsePresenterModeOptions = {}) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPresenterHelper, setShowPresenterHelper] = useState(false);

  const sections = LUXORA_CONFIG.sections;

  // Jump to specific section index
  const goToSection = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(sections.length - 1, index));
      setCurrentSectionIndex(validIndex);
      const targetId = `#${sections[validIndex].id}`;

      if (onScrollTo) {
        onScrollTo(targetId);
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [sections, onScrollTo]
  );

  const goToNextSection = useCallback(() => {
    goToSection(currentSectionIndex + 1);
  }, [currentSectionIndex, goToSection]);

  const goToPrevSection = useCallback(() => {
    goToSection(currentSectionIndex - 1);
  }, [currentSectionIndex, goToSection]);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Error attempting to exit fullscreen:', err);
        });
      }
      setIsFullscreen(false);
    }
  }, []);

  // Update fullscreen state on native fullscreenchange event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation listener (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, PageUp, PageDown, 'F', 'P')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in input fields
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          goToNextSection();
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrevSection();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          setShowPresenterHelper((prev) => !prev);
          break;

        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;

        case 'End':
          e.preventDefault();
          goToSection(sections.length - 1);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSection, goToPrevSection, toggleFullscreen, goToSection, sections.length]);

  // Track active section via IntersectionObserver on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setCurrentSectionIndex(index);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return {
    currentSectionIndex,
    currentSection: sections[currentSectionIndex],
    totalSections: sections.length,
    sections,
    goToSection,
    goToNextSection,
    goToPrevSection,
    isFullscreen,
    toggleFullscreen,
    showPresenterHelper,
    setShowPresenterHelper,
  };
}
