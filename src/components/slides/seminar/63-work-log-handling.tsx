'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p62: 6-1 記録・対応 — 作業ログの取扱い（作業ログの役割）
 *
 * ベーステンプレート: `templates/FeatureCards.tsx`
 */

const LOG_ACCENT = '#f2d160';
const LOG_GRAD: [string, string] = ['#e0bb3a', '#a98a17'];

const ROLES = [
  {
    icon: '⚖',
    description:
      '著作権、個人データ、秘密情報の取扱いに関する証拠となる',
    accent: '#88bbff',
  },
  {
    icon: '✎',
    description:
      '生成AIによる生成物に創作性が認められるかどうかの判断資料になる',
    accent: '#c8a8ff',
  },
  {
    icon: '↗',
    description: '社内の生成AI改善のヒントになる',
    accent: LOG_ACCENT,
  },
] as const;

export default function Slide62WorkLogHandling() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-6xl h-full justify-center py-4 md:py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-1 shrink-0 text-center w-full">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            6-1 · 記録・対応 · 作業ログの取扱い
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.4vw, 36px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LOG_GRAD[0]} 0%, ${LOG_GRAD[1]} 100%)`,
              }}
            >
              作業ログ
            </span>
            の役割
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.description}
              className="flex flex-col items-center gap-3 md:gap-4 px-5 py-5 md:px-6 md:py-6 rounded-2xl border text-center min-h-[140px] md:min-h-[160px] justify-center"
              style={{
                borderColor: `${role.accent}44`,
                background: `linear-gradient(160deg, ${role.accent}12 0%, rgba(255,255,255,0.03) 100%)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <span
                className="flex items-center justify-center w-12 h-12 rounded-xl border font-bold"
                style={{
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  color: role.accent,
                  borderColor: `${role.accent}55`,
                  background: `${role.accent}14`,
                }}
                aria-hidden
              >
                {role.icon}
              </span>
              <p
                className="font-semibold text-white/85 leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.15vw, 16px)' }}
              >
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
