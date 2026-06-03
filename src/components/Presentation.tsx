'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DeckBackground } from './backgrounds';
import TableOfContents from './TableOfContents';
import BreakSlide from './BreakSlide';
import InternalRulesTocOverlay from './InternalRulesTocOverlay';
import SlideStage from './SlideStage';
import { slideRegistry as defaultRegistry, type SlideEntry } from '@/config/slides';
import { BG_COLOR } from '@/theme/colors';
import { PresentationContext } from '@/context/presentation';
import { shouldShowRulesTocButton } from '@/lib/internal-rules-navigation';

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface PresentationProps {
  /** 表示するスライドの一覧。未指定の場合は既存テンプレートの slideRegistry を使う。 */
  registry?: SlideEntry[];
}

export default function Presentation({ registry }: PresentationProps = {}) {
  const slideRegistry = registry ?? defaultRegistry;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [rulesTocOpen, setRulesTocOpen] = useState(false);
  const [breakActive, setBreakActive] = useState(false);

  const slideCount = slideRegistry.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, slideCount - 1));
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // TOC / 休憩スライド表示中は矢印ナビを無効化
      if (tocOpen || rulesTocOpen || breakActive) return;
      if (e.key === 'ArrowRight' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, tocOpen, rulesTocOpen, breakActive]);

  const entry = slideRegistry[currentSlide];
  const CurrentSlideComponent = entry.Component;

  const showRulesTocButton = useMemo(
    () => shouldShowRulesTocButton(slideRegistry, currentSlide),
    [slideRegistry, currentSlide]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tocOpen || rulesTocOpen || breakActive) return;
    if (entry.textSelectable) return;
    const midpoint = window.innerWidth / 2;
    if (e.clientX > midpoint) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <PresentationContext.Provider value={{ currentSlide, goTo }}>
    <div
      className={`relative w-screen h-screen overflow-hidden ${entry.textSelectable ? 'cursor-default select-text' : 'cursor-pointer select-none'}`}
      style={{ backgroundColor: BG_COLOR }}
      onClick={handleClick}
    >
      {/* グローバル背景 */}
      <DeckBackground variant={entry.background ?? null} />

      {/* スライド本体（1920×1080 を基準に uniform scale で描画） */}
      <SlideStage>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </SlideStage>

      {/* ── 休憩スライド（オーバーレイ） ── */}
      <AnimatePresence>
        {breakActive && (
          <motion.div
            key="break-overlay"
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <DeckBackground variant="logoParticles" />
            <SlideStage>
              <BreakSlide onClose={() => setBreakActive(false)} />
            </SlideStage>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBreakActive(false);
              }}
              className="fixed top-6 right-6 z-[70] p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label="休憩スライドを閉じる"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-6 left-6 z-30 flex items-center gap-2">
        <TableOfContents
          entries={slideRegistry}
          currentIndex={currentSlide}
          onNavigate={goTo}
          isOpen={tocOpen}
          inlineTrigger
          onToggle={() => {
            setTocOpen((v) => {
              const next = !v;
              if (next) setRulesTocOpen(false);
              return next;
            });
          }}
          onShowBreak={() => setBreakActive(true)}
        />

        {showRulesTocButton && (
          <InternalRulesTocOverlay
            entries={slideRegistry}
            currentIndex={currentSlide}
            isOpen={rulesTocOpen}
            inlineTrigger
            onToggle={() => {
              setRulesTocOpen((v) => {
                const next = !v;
                if (next) setTocOpen(false);
                return next;
              });
            }}
            onNavigate={goTo}
          />
        )}
      </div>

      {/* Navigation hint arrows */}
      {currentSlide > 0 && !breakActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentSlide < slideCount - 1 && !breakActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          aria-label="Next slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
    </PresentationContext.Provider>
  );
}
