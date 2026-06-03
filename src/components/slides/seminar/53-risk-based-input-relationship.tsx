'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p53: 4-2 入力禁止情報 — リスクベースアプローチとの関係
 *
 * ベーステンプレート: `templates/Pipeline.tsx`
 * 参照: `25-risk-practice.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';

const STEPS = [
  {
    num: '01',
    tag: '原則',
    title: '法的権利が付着しているデータは原則禁止',
    accent: '#ff7aa8',
  },
  {
    num: '02',
    tag: '評価',
    title: '社内の利用目的に照らしてリスクベースアプローチを実行',
    accent: '#f7c46c',
  },
  {
    num: '03',
    tag: '例外',
    title: '一部項目については例外として解除',
    accent: CHAPTER_ACCENT,
  },
] as const;

function FlowArrow({ delay, accent }: { delay: number; accent: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5 py-1 shrink-0"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div
        className="w-px h-5 md:h-6"
        style={{ background: `linear-gradient(to bottom, ${accent}44, ${accent}aa)` }}
      />
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
        <path d="M7 9L0 0h14L7 9z" fill={`${accent}bb`} />
      </svg>
    </motion.div>
  );
}

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof STEPS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="relative flex items-stretch gap-4 w-full max-w-3xl px-4 md:px-6 py-4 md:py-5 rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${step.accent}55`,
        background: `linear-gradient(135deg, ${step.accent}16 0%, rgba(255,255,255,0.02) 70%)`,
        boxShadow: `0 20px 40px -24px rgba(0,0,0,0.5), 0 0 32px -12px ${step.accent}33`,
      }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: step.accent, boxShadow: `0 0 12px ${step.accent}` }}
      />

      <div
        className="shrink-0 flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl border ml-1"
        style={{
          borderColor: `${step.accent}66`,
          background: `${step.accent}18`,
        }}
      >
        <span
          className="font-mono font-bold tabular-nums"
          style={{ color: step.accent, fontSize: 'clamp(13px, 1.1vw, 16px)' }}
        >
          {step.num}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1 py-0.5">
        <span
          className="font-mono tracking-[0.2em] uppercase w-fit px-2 py-0.5 rounded-md border"
          style={{
            color: step.accent,
            borderColor: `${step.accent}55`,
            background: `${step.accent}12`,
            fontSize: 'clamp(9px, 0.78vw, 11px)',
          }}
        >
          {step.tag}
        </span>
        <h3
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(16px, 1.45vw, 22px)' }}
        >
          {step.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Slide53RiskBasedInputRelationship() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col gap-6 md:gap-8 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            4-2 · 入力禁止情報
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.6vw, 38px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${CHAPTER_ACCENT} 0%, #f7c46c 50%, #ff7aa8 100%)`,
              }}
            >
              リスクベースアプローチ
            </span>
            との関係
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center w-full">
              <StepCard step={step} index={i} inView={inView} />
              {i < STEPS.length - 1 && (
                <FlowArrow delay={0.35 + i * 0.12} accent={STEPS[i + 1].accent} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
