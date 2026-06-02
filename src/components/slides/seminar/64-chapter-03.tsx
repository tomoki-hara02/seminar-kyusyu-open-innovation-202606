'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p64: Chapter 03 — その他生成AIに関する法的論点
 *
 * ベーステンプレート: `templates/ChapterDivider.tsx` / `11-chapter-01.tsx`
 */

const CHAPTER = {
  number: '03',
  label: 'Chapter',
  title: 'その他生成AIに関する法的論点',
  subtitle: 'その他関連する生成AIと法的論点について解説します',
};

export default function Slide64Chapter03() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-[min(72vh,760px)] items-center justify-center md:justify-start gap-8 md:gap-16 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex shrink-0 items-center justify-center md:h-full">
          <motion.span
            className="block font-extrabold tracking-tighter leading-[0.85] select-none"
            style={{
              fontSize: 'clamp(8rem, 22vw, 20rem)',
              background:
                'linear-gradient(160deg, #f7c46c 0%, #ff9966 45%, #ffaacc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {CHAPTER.number}
          </motion.span>
        </div>

        <motion.div
          className="flex min-w-0 flex-1 flex-col justify-center gap-4 max-w-lg md:h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              {CHAPTER.label}
            </span>
          </div>
          <h2
            className="font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.25rem)' }}
          >
            {CHAPTER.title}
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            {CHAPTER.subtitle}
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
