'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p36: 1-3 統括責任者 — 統括責任者に求められるもの
 *
 * ベーステンプレート: `templates/Recap.tsx`
 */

const TAKEAWAYS = [
  {
    title: '生成AIの活用ケースの選定、プランニング',
    desc: '例）使用可能モデルや使用者の決定/更新など',
    accent: '#60a5fa',
  },
  {
    title: 'リスク管理とガバナンス',
    desc: '例）リスクベースアプローチに基づく、社内規程の更新やセキュリティ対策',
    accent: '#88bbff',
  },
  {
    title: '組織のリテラシー向上',
    desc: '例）教育プログラムの実施や、ベストプラクティスの共有',
    accent: '#c8a8ff',
  },
  {
    title: 'インシデント対応',
    desc: '例）想定リスクやインシデント発生時の対応指揮',
    accent: '#ffaacc',
  },
];

export default function Slide36ChiefResponsibleRecap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-7 md:gap-8 w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            1-3 · 統括責任者 · Recap
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            統括責任者に
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #88bbff 45%, #c8a8ff 100%)',
              }}
            >
              求められるもの
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
                className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-xl tabular-nums"
                style={{
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
                  style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
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
