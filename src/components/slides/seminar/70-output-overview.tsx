'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p70: 5-1 出力情報 総論 — 出力利用の3つの論点と対応構造
 *
 * ベーステンプレート: `41-risk-based-input-relationship.tsx` / `47-pip-recap.tsx`
 */

const OUTPUT_ACCENT = '#ff9966';
const OUTPUT_GRAD: [string, string] = ['#f17a45', '#c64823'];

const ITEMS = [
  {
    num: '01',
    issue: '情報の正確性 / モデルによる偏り',
    response: 'HITLで対応',
    tag: '5-2',
    accent: '#f7c46c',
  },
  {
    num: '02',
    issue: '生成AIアクセスによる著作権侵害',
    response: '社内審査で対応',
    tag: '5-5',
    accent: '#88bbff',
  },
  {
    num: '03',
    issue: '営業秘密 / 秘密情報入力時の出力',
    response: '契約書や社内ルールで対応',
    tag: '5-4',
    accent: '#9ee0a8',
  },
] as const;

function ArrowConnector({ delay }: { delay: number }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center shrink-0 px-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      aria-hidden
    >
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <path
          d="M0 8h20m0 0l-5-5m5 5l-5 5"
          stroke={`${OUTPUT_ACCENT}aa`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function StructureRow({
  item,
  index,
  inView,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0 w-full"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.18 + index * 0.1 }}
    >
      {/* 論点 */}
      <div
        className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-r-none border"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <span
          className="shrink-0 font-mono font-bold tabular-nums"
          style={{ color: item.accent, fontSize: 'clamp(12px, 1vw, 15px)' }}
        >
          {item.num}
        </span>
        <p
          className="font-semibold text-white leading-snug min-w-0"
          style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
        >
          {item.issue}
        </p>
      </div>

      <ArrowConnector delay={0.28 + index * 0.1} />

      {/* 対応 */}
      <div
        className="flex flex-col justify-center gap-1.5 flex-1 min-w-0 px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-l-none border md:border-l-0"
        style={{
          borderColor: `${item.accent}44`,
          background: `linear-gradient(135deg, ${item.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        <span
          className="font-mono tracking-[0.18em] uppercase w-fit px-2 py-0.5 rounded-md border"
          style={{
            color: item.accent,
            borderColor: `${item.accent}55`,
            background: `${item.accent}10`,
            fontSize: 'clamp(8px, 0.72vw, 10px)',
          }}
        >
          {item.tag}
        </span>
        <p
          className="font-bold leading-snug"
          style={{ color: item.accent, fontSize: 'clamp(15px, 1.35vw, 20px)' }}
        >
          {item.response}
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide70OutputOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl h-full justify-center py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(11px, 1.05vw, 14px)' }}
          >
            5-1 · 出力情報 · 総論
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${OUTPUT_GRAD[0]} 0%, ${OUTPUT_GRAD[1]} 100%)`,
              }}
            >
              出力利用
            </span>
            について
          </h2>
          <p
            className="text-white/50 leading-relaxed"
            style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            論点ごとに対応手段を分けて設計する
          </p>
        </div>

        <motion.div
          className="flex flex-col gap-2.5 md:gap-3 rounded-2xl border p-2.5 md:p-3"
          style={{
            borderColor: `${OUTPUT_ACCENT}44`,
            background: `linear-gradient(160deg, ${OUTPUT_ACCENT}0a 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="hidden md:grid px-4 pb-1"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            <span
              className="font-semibold text-white/40 tracking-wide"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              論点
            </span>
            <span className="w-7" aria-hidden />
            <span
              className="font-semibold text-white/40 tracking-wide"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              対応
            </span>
          </div>

          {ITEMS.map((item, i) => (
            <StructureRow key={item.num} item={item} index={i} inView={inView} />
          ))}
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
