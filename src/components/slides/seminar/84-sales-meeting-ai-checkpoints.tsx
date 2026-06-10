'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p84: 商談編 — Webミーティング・議事録AI（インフォグラフ）
 */

const SALES_ACCENT = '#f7c46c';
const LAW_ACCENT = '#60a5fa';
const CHAPTER_ACCENT = '#9ee0a8';
const WARN_ACCENT = '#ff9966';

const RISK_TAGS = ['録音 / 録画', '文字起こし AI', 'クラウド送信'] as const;

const CHECKPOINTS = [
  {
    num: '①',
    headline: '社内への周知',
    body: '従業員に録音/録画が起動した場合の対応を周知する',
    visual: '録画ON → 社内フロー',
    accent: SALES_ACCENT,
    icon: 'megaphone' as const,
  },
  {
    num: '②',
    headline: '取引先への確認',
    body: '取引先であれば契約上又は事実上AI機能の不使用を求める',
    visual: '契約 · 事実上の不使用',
    accent: LAW_ACCENT,
    icon: 'handshake' as const,
  },
  {
    num: '③',
    headline: '使う場合の条件',
    body: 'AI機能を使う場合は条件を定める',
    visual: '範囲 · 保管 · 再学習',
    accent: CHAPTER_ACCENT,
    icon: 'terms' as const,
  },
] as const;

function strokeProps(color: string) {
  return {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

function IconVideo({ color }: { color: string }) {
  const s = strokeProps(color);
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="5" width="14" height="14" rx="2" {...s} />
      <path d="M16 9.5l6-3.5v12l-6-3.5V9.5z" {...s} />
      <circle cx="7" cy="9" r="1.2" fill={WARN_ACCENT} stroke="none" />
    </svg>
  );
}

function IconTranscript({ color }: { color: string }) {
  const s = strokeProps(color);
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" {...s} />
      <path d="M8 9h8M8 13h6M8 17h4" {...s} />
      <path d="M17 7l2 2-2 2" {...s} stroke={CHAPTER_ACCENT} />
    </svg>
  );
}

function CheckpointIcon({ kind, color }: { kind: (typeof CHECKPOINTS)[number]['icon']; color: string }) {
  const s = strokeProps(color);
  switch (kind) {
    case 'megaphone':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 10v4M7 8.5v7" {...s} />
          <path d="M7 12h6l4 3V9l-4 3H7z" {...s} />
          <path d="M19 9.5c1 1 1 4 0 5.5" {...s} />
        </svg>
      );
    case 'handshake':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 12h3l2-3 3 4 2-2 3 3" {...s} />
          <path d="M14 14l2 2a2 2 0 0 0 2.8 0l1-1" {...s} />
          <rect x="3" y="10" width="5" height="6" rx="1" {...s} />
        </svg>
      );
    case 'terms':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 4h8l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" {...s} />
          <path d="M16 4v4h4M8 12h8M8 16h6" {...s} />
        </svg>
      );
  }
}

function FlowConnector({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center shrink-0 px-2 md:px-4"
      initial={{ opacity: 0, scaleX: 0.3 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <svg width="48" height="20" viewBox="0 0 48 20" fill="none" aria-hidden className="w-8 md:w-12">
        <motion.path
          d="M2 10h32m0 0l-6-6m6 6l-6 6"
          stroke={SALES_ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        />
      </svg>
    </motion.div>
  );
}

function ScenarioHub() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 w-full max-w-3xl">
        <div
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border w-full sm:w-[11.5rem]"
          style={{
            borderColor: `${LAW_ACCENT}44`,
            background: `linear-gradient(160deg, ${LAW_ACCENT}12 0%, rgba(0,0,0,0.2) 100%)`,
          }}
        >
          <IconVideo color={LAW_ACCENT} />
          <p className="font-bold text-white text-center" style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}>
            Webミーティング
          </p>
          <span
            className="px-2 py-0.5 rounded-full font-mono font-semibold tracking-wide"
            style={{
              color: WARN_ACCENT,
              border: `1px solid ${WARN_ACCENT}55`,
              background: `${WARN_ACCENT}18`,
              fontSize: 'clamp(10px, 0.78vw, 11px)',
            }}
          >
            AI搭載
          </span>
        </div>

        <FlowConnector delay={0.25} />

        <div
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border w-full sm:w-[11.5rem]"
          style={{
            borderColor: `${CHAPTER_ACCENT}44`,
            background: `linear-gradient(160deg, ${CHAPTER_ACCENT}12 0%, rgba(0,0,0,0.2) 100%)`,
          }}
        >
          <IconTranscript color={CHAPTER_ACCENT} />
          <p className="font-bold text-white text-center" style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}>
            議事録のAI処理
          </p>
          <span
            className="px-2 py-0.5 rounded-full font-mono font-semibold tracking-wide"
            style={{
              color: CHAPTER_ACCENT,
              border: `1px solid ${CHAPTER_ACCENT}55`,
              background: `${CHAPTER_ACCENT}18`,
              fontSize: 'clamp(10px, 0.78vw, 11px)',
            }}
          >
            要約・分析
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {RISK_TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            className="px-2.5 py-1 rounded-lg border font-medium"
            style={{
              color: WARN_ACCENT,
              borderColor: `${WARN_ACCENT}44`,
              background: `${WARN_ACCENT}10`,
              fontSize: 'clamp(10px, 0.85vw, 12px)',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
          >
            ⚠ {tag}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="w-px h-5"
          style={{ background: `linear-gradient(to bottom, ${SALES_ACCENT}66, ${SALES_ACCENT})` }}
        />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M6 8L0 0h12L6 8z" fill={`${SALES_ACCENT}99`} />
        </svg>
        <span
          className="font-bold tracking-[0.2em] uppercase"
          style={{ color: SALES_ACCENT, fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          備えるチェックポイント
        </span>
      </motion.div>
    </motion.div>
  );
}

function CheckpointPillar({
  item,
  index,
}: {
  item: (typeof CHECKPOINTS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2.5 p-3.5 md:p-4 rounded-2xl border h-full min-w-0"
      style={{
        borderColor: `${item.accent}44`,
        background: `linear-gradient(180deg, ${item.accent}14 0%, rgba(0,0,0,0.22) 100%)`,
        boxShadow: `0 0 24px -8px ${item.accent}33`,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.55 + index * 0.1 }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="shrink-0 font-mono font-bold w-8 h-8 rounded-lg flex items-center justify-center border"
          style={{
            color: item.accent,
            borderColor: `${item.accent}66`,
            background: `${item.accent}18`,
            fontSize: 'clamp(13px, 1.05vw, 15px)',
          }}
        >
          {item.num}
        </span>
        <span
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border"
          style={{
            borderColor: `${item.accent}44`,
            background: `${item.accent}10`,
          }}
        >
          <CheckpointIcon kind={item.icon} color={item.accent} />
        </span>
        <h3
          className="font-bold text-white leading-tight min-w-0"
          style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
        >
          {item.headline}
        </h3>
      </div>

      <p
        className="text-white/55 font-mono tracking-wide px-2 py-1 rounded-md border border-dashed w-fit"
        style={{
          borderColor: `${item.accent}33`,
          fontSize: 'clamp(10px, 0.78vw, 11px)',
        }}
      >
        {item.visual}
      </p>

      <p
        className="text-white/82 leading-snug flex-1"
        style={{ fontSize: 'clamp(11px, 0.95vw, 14px)' }}
      >
        {item.body}
      </p>
    </motion.div>
  );
}

export default function Slide84SalesMeetingAiCheckpoints() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-5 md:py-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            商談編 · 運用の備え
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 34px)' }}
          >
            AI搭載のWebミーティングや
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${SALES_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              議事録のAI処理に備えて
            </span>
          </h2>
        </div>

        <ScenarioHub />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {CHECKPOINTS.map((item, i) => (
            <CheckpointPillar key={item.num} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
