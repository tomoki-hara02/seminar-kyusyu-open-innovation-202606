'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p48: 4-4 個人情報 — まとめ（Recap）
 *
 * ベーステンプレート: `templates/Recap.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const WARN_ACCENT = '#fb923c';

const TAKEAWAYS = [
  {
    title: 'プライバシーポリシーの見直し',
    desc: '生成AI活用内容と利用目的を再確認',
    accent: LAW_ACCENT,
  },
  {
    title: '無料版・個人版のサービスでは個人データは使えない',
    desc: '学習データoffだけでは足りない',
    accent: WARN_ACCENT,
  },
  {
    title: 'DPAの内容を確認',
    desc: '主要生成AIサービスにはDPAが含まれている（OpenAIは別途契約必要）',
    accent: CHAPTER_ACCENT,
  },
] as const;

export default function Slide47PipRecap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-7 md:gap-8 w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報 · Recap
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 3vw, 44px)' }}
          >
            個人情報に関する
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              まとめ
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div
                className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold tabular-nums"
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <h3
                  className="font-semibold text-white tracking-tight leading-snug"
                  style={{ fontSize: 'clamp(15px, 1.35vw, 20px)' }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-white/55 leading-relaxed"
                  style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
