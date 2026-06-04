'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p52: 4-4 個人情報 — 個人情報保護法と生成AIの論点チェック
 *
 * ベーステンプレート: `templates/NextSteps.tsx`（チェックリスト型）
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';

const CHECKPOINTS = [
  {
    label: '生成AIとプライバシーポリシーの利用目的',
    accent: LAW_ACCENT,
  },
  {
    label: '委託先の監督',
    accent: '#7dd3fc',
  },
  {
    label: '外国にある第三者への提供',
    accent: CHAPTER_ACCENT,
  },
] as const;

export default function Slide52PipActGenaiCheckpoints() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-7 md:gap-8 w-full max-w-4xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報 · Checkpoints
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            個人情報保護法と
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              生成AIの論点
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-3.5 justify-center">
          {CHECKPOINTS.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-xl border transition-colors"
              style={{
                background: `linear-gradient(90deg, ${item.accent}0c 0%, rgba(255,255,255,0.03) 100%)`,
                borderColor: `${item.accent}33`,
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
            >
              <div
                className="shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center"
                style={{
                  border: `2px solid ${item.accent}88`,
                  background: `${item.accent}14`,
                  boxShadow: `0 0 12px ${item.accent}22`,
                }}
              >
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  aria-hidden
                  className="opacity-90"
                >
                  <motion.path
                    d="M1 5.5L5 9.5L13 1"
                    stroke={item.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.1 }}
                  />
                </svg>
              </div>

              <span
                className="font-semibold text-white/90 leading-snug"
                style={{ fontSize: 'clamp(15px, 1.25vw, 20px)' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p
          className="text-white/30 tracking-wider shrink-0"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          ※ 次のスライド以降で各論点を順に確認します。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
