'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p34: 2-1 使用者の範囲 — 使用者範囲の設定で重要なポイント
 *
 * ベーステンプレート: `templates/FeatureCards.tsx`
 */

const KEY_POINTS = [
  {
    icon: '◎',
    title: '誰が使用可能か明確化する',
    description:
      '役職や保有資格など、生成AIの利用目的に合わせて必要な人物が使用可能となっているか確認する',
    accent: '#88bbff',
  },
  {
    icon: '⊘',
    title: '間接利用の禁止',
    description:
      '使用可能な人物以外の利用（間接利用）などを禁止する',
    accent: '#ffaacc',
  },
  {
    icon: '◇',
    title: '希望すれば誰でも使用可能なルール作り',
    description:
      '生成AIの使用可否により格差が生じないよう配慮する',
    accent: '#9ee0a8',
  },
] as const;

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
            style={{ fontSize: 'clamp(24px, 3.2vw, 44px)' }}
          >
            使用者範囲の設定で
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 55%, #9ee0a8 100%)',
              }}
            >
              重要なポイント
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {KEY_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              className="flex flex-col items-center gap-4 p-7 md:p-8 rounded-2xl backdrop-blur-md border min-h-0"
              style={{
                background: `linear-gradient(160deg, ${point.accent}14 0%, rgba(255,255,255,0.04) 100%)`,
                borderColor: `${point.accent}44`,
                boxShadow: `0 24px 48px -20px rgba(0,0,0,0.55), 0 0 40px -12px ${point.accent}33`,
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
                  color: point.accent,
                  filter: `drop-shadow(0 0 14px ${point.accent}88)`,
                }}
              >
                {point.icon}
              </span>
              <h3
                className="font-semibold tracking-tight text-white leading-snug"
                style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}
              >
                {point.title}
              </h3>
              <p
                className="text-white/65 leading-relaxed text-left md:text-center"
                style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
              >
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
