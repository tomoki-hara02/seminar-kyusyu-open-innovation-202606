'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 7 ガバナンス セクション扉
 */

const SECTION_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';

const SECTION = {
  number: '07',
  label: 'Section',
  title: 'ガバナンス',
  subtitle:
    '社内規程は作って終わりではない — 運用・違反対応・継続改善で「動き続ける規程」にするパート。',
};

const TOPICS = [
  { num: '7-1', label: '違反時の対応' },
  { num: '7-2', label: '規程の見直し' },
  { num: '7-3', label: '社内リテラシー向上' },
];

export default function Slide77Section07Governance() {
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
              background: `linear-gradient(160deg, ${SECTION_ACCENT} 0%, ${LAW_ACCENT} 100%)`,
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
          className="flex min-w-0 flex-1 flex-col gap-4 max-w-md"
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

          <motion.div
            className="flex flex-col gap-2 pt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span
              className="tracking-[0.28em] uppercase text-white/30"
              style={{ fontSize: 'clamp(10px, 0.72vw, 11px)' }}
            >
              このセクションの内容
            </span>
            <div className="flex flex-col gap-1.5">
              {TOPICS.map((item, i) => (
                <motion.div
                  key={item.num}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
                >
                  <span
                    className="font-mono font-semibold tracking-wider"
                    style={{
                      color: SECTION_ACCENT,
                      fontSize: 'clamp(11px, 0.95vw, 14px)',
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="text-white/72"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
