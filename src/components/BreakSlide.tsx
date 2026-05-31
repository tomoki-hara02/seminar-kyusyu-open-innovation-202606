'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from './SlideWrapper';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

interface BreakSlideProps {
  onClose: () => void;
}

export default function BreakSlide({ onClose }: BreakSlideProps) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const startBreak = useCallback((minutes: 5 | 10) => {
    setRemaining(minutes * 60);
    setRunning(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!running || remaining === null || remaining <= 0) return;

    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running, remaining]);

  const displayTime = remaining !== null ? formatTime(remaining) : '--:--';

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
            Break Time
          </span>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-white">
            休憩中
          </h2>
          <p
            className="text-7xl md:text-8xl font-mono tabular-nums font-bold text-white tracking-tight"
            aria-live="polite"
            aria-label={`残り時間 ${displayTime}`}
          >
            {displayTime}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startBreak(5);
            }}
            className="px-8 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-base font-medium
              hover:bg-white/15 hover:border-white/35 transition-all duration-200"
          >
            5分休憩
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startBreak(10);
            }}
            className="px-8 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-base font-medium
              hover:bg-white/15 hover:border-white/35 transition-all duration-200"
          >
            10分休憩
          </button>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
