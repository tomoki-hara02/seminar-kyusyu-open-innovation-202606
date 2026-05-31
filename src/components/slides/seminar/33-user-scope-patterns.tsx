'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p34: 2-1 使用者の範囲 — 社内生成AI活用者選定のパターン例
 *
 * ベーステンプレート: `templates/FeatureCards.tsx`
 */

const PATTERNS = [
  {
    icon: '◎',
    title: '一極集中型',
    description:
      '生成AIに関心のある一部従業員にノウハウや活用を集中させる方法',
    accent: '#88bbff',
  },
  {
    icon: '◇',
    title: '基準方式',
    description:
      '生成AI活用に関する基準を設け、基準をクリアした場合に生成AI業務に携わることを許可する方法',
    accent: '#c8a8ff',
  },
  {
    icon: '▦',
    title: '全社方式',
    description:
      '全社員に生成AI活用を認め、全体的な活用を模索する方法',
    accent: '#60a5fa',
  },
];

export default function Slide33UserScopePatterns() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 md:gap-12 text-center w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            2-1 · 使用者の範囲
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
          >
            社内生成AI
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 55%, #60a5fa 100%)',
              }}
            >
              活用者選定のパターン例
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {PATTERNS.map((pattern, i) => (
            <motion.div
              key={pattern.title}
              className="flex flex-col items-center gap-4 p-7 md:p-8 rounded-2xl backdrop-blur-md border min-h-0"
              style={{
                background: `linear-gradient(160deg, ${pattern.accent}14 0%, rgba(255,255,255,0.04) 100%)`,
                borderColor: `${pattern.accent}44`,
                boxShadow: `0 24px 48px -20px rgba(0,0,0,0.55), 0 0 40px -12px ${pattern.accent}33`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.2 + i * 0.1,
              }}
            >
              <span
                className="text-4xl leading-none"
                style={{
                  color: pattern.accent,
                  filter: `drop-shadow(0 0 14px ${pattern.accent}88)`,
                }}
              >
                {pattern.icon}
              </span>
              <h3
                className="font-semibold tracking-tight text-white"
                style={{ fontSize: 'clamp(17px, 1.5vw, 22px)' }}
              >
                {pattern.title}
              </h3>
              <p
                className="text-white/65 leading-relaxed text-left md:text-center"
                style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
              >
                {pattern.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="max-w-3xl leading-relaxed tracking-wide"
          style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: '#f7c46c' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          ※ どの方法であっても
          <span className="font-semibold" style={{ color: '#ffe08a' }}>
            「社長 / 経営者」
          </span>
          が活用に携わるように設計する
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
