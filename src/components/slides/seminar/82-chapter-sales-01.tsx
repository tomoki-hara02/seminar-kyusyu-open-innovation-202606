'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p82: Chapter 03 内 — 商談編 01（中間見出し / セクション扉）
 *
 * ベース: `40-section-03-tool.tsx`（Chapter 02 の Section 扉と同型）
 */

const SECTION_ACCENT = '#f7c46c';
const LAW_ACCENT = '#ff9966';

const SECTION = {
  number: '01',
  label: 'Part',
  title: '商談編',
  subtitle:
    '取引先や関係者が生成AIを使用している場合の法的問題について解説します。',
};

export default function Slide82ChapterSales01() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col md:flex-row w-full max-w-6xl items-center gap-8 md:gap-16 px-2 py-6 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex shrink-0 items-center justify-center">
          <motion.span
            className="block font-extrabold tracking-tighter leading-[0.85] select-none"
            style={{
              fontSize: 'clamp(7rem, 18vw, 16rem)',
              background: `linear-gradient(160deg, ${SECTION_ACCENT} 0%, ${LAW_ACCENT} 55%, #ffaacc 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {SECTION.number}
          </motion.span>
        </div>

        <motion.div
          className="flex min-w-0 flex-1 flex-col gap-4 max-w-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: `${SECTION_ACCENT}66` }} />
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(10px, 0.78vw, 12px)' }}
            >
              {SECTION.label}
            </span>
            <span
              className="tracking-[0.2em] text-white/30"
              style={{ fontSize: 'clamp(10px, 0.72vw, 11px)' }}
            >
              · Chapter 03
            </span>
          </div>

          <h2
            className="font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(28px, 3.4vw, 46px)' }}
          >
            {SECTION.title}
          </h2>

          <p
            className="text-white/55 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            {SECTION.subtitle}
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
