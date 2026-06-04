'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p87: クリエイティブ編 — クリエイター業務委託時の法的観点（4チェックポイント）
 *
 * ベース: 83-sales-meeting-ai-checkpoints.tsx
 *
 * シーンハブ（クリエイター業務委託 × AI混在の納品成果物）の下に、
 * ①〜④の法的チェックポイントを 2×2 のピラーで配置する。
 */

const CREATIVE_ACCENT = '#c8a8ff';
const LAW_ACCENT = '#60a5fa';
const CHAPTER_ACCENT = '#9ee0a8';
const PINK_ACCENT = '#ffaacc';
const WARN_ACCENT = '#ff9966';

const RISK_TAGS = [
  '著作物性の不確実性',
  '譲渡対価の取扱い',
  '侵害リスク',
  '肖像・人格的利益',
] as const;

const CHECKPOINTS = [
  {
    num: '①',
    headline: '著作物性が認められない可能性',
    body:
      'AI出力は単独では著作物に当たりにくい。創作的寄与の有無と工程を契約・作業ログで明確化する。',
    visual: 'AI制作物 × 創作行為',
    accent: CREATIVE_ACCENT,
    icon: 'uncertain' as const,
  },
  {
    num: '②',
    headline: '創作性が否定された時の対処',
    body:
      '譲渡対価支払い後に著作物性が否定されても代金が宙に浮かないよう、業務委託料としての効力を残す契約構成にしておく。',
    visual: '譲渡対価 × 後日否定',
    accent: LAW_ACCENT,
    icon: 'contract' as const,
  },
  {
    num: '③',
    headline: '侵害を生じさせない運用Tips',
    body:
      'ナレーション・画像素材等の生成では依拠性／類似性を事前に検証し、利用AIの学習データ条件と生成プロセスをログ化する。',
    visual: 'ナレーション・画像素材ほか',
    accent: CHAPTER_ACCENT,
    icon: 'shield' as const,
  },
  {
    num: '④',
    headline: '自社従業員モデル利用の注意',
    body:
      '従業員の肖像・氏名・声を素材に使う場合、書面同意を取得し、退職後の利用範囲とAI学習可否を社内規程で定める。',
    visual: '肖像権 / パブリシティ権',
    accent: PINK_ACCENT,
    icon: 'person' as const,
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

function IconCreator({ color }: { color: string }) {
  const s = strokeProps(color);
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <circle cx="9" cy="8" r="3" {...s} />
      <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" {...s} />
      <path d="M16 6.5l4.5 4.5-2 2L14 8.5l2-2z" {...s} stroke={WARN_ACCENT} />
      <path d="M14 8.5l-1 3 3-1" {...s} stroke={WARN_ACCENT} />
    </svg>
  );
}

function IconDelivery({ color }: { color: string }) {
  const s = strokeProps(color);
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" {...s} />
      <circle cx="9" cy="10" r="1.5" fill={WARN_ACCENT} stroke="none" />
      <path d="M3 16l5-4 4 3 3-2 6 4" {...s} stroke={WARN_ACCENT} />
      <path d="M9 20h6" {...s} />
    </svg>
  );
}

function CheckpointIcon({
  kind,
  color,
}: {
  kind: (typeof CHECKPOINTS)[number]['icon'];
  color: string;
}) {
  const s = strokeProps(color);
  switch (kind) {
    case 'uncertain':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="4" width="18" height="14" rx="1.5" {...s} />
          <path d="M3 8h18" {...s} />
          <path
            d="M9.5 13.5a2 2 0 1 1 2.5 1.9v.6M12 17.6h.05"
            {...s}
            stroke={WARN_ACCENT}
          />
        </svg>
      );
    case 'contract':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 3h9l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
            {...s}
          />
          <path d="M15 3v3h3" {...s} />
          <path d="M11 12v5M9 14h4" {...s} stroke={WARN_ACCENT} />
        </svg>
      );
    case 'shield':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" {...s} />
          <path d="M8.5 12.5l2.5 2.5 4-5" {...s} stroke={WARN_ACCENT} />
        </svg>
      );
    case 'person':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <circle cx="10" cy="8" r="3" {...s} />
          <path d="M3.5 19c0-3.3 2.7-5.5 6.5-5.5s6.5 2.2 6.5 5.5" {...s} />
          <path d="M18 6h4M18 9h4M18 12h3" {...s} stroke={WARN_ACCENT} />
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
      <svg
        width="48"
        height="20"
        viewBox="0 0 48 20"
        fill="none"
        aria-hidden
        className="w-8 md:w-12"
      >
        <motion.path
          d="M2 10h32m0 0l-6-6m6 6l-6 6"
          stroke={CREATIVE_ACCENT}
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
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border w-full sm:w-[12rem]"
          style={{
            borderColor: `${LAW_ACCENT}44`,
            background: `linear-gradient(160deg, ${LAW_ACCENT}12 0%, rgba(0,0,0,0.2) 100%)`,
          }}
        >
          <IconCreator color={LAW_ACCENT} />
          <p
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            クリエイター業務委託
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
            AI混在
          </span>
        </div>

        <FlowConnector delay={0.25} />

        <div
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border w-full sm:w-[12rem]"
          style={{
            borderColor: `${CHAPTER_ACCENT}44`,
            background: `linear-gradient(160deg, ${CHAPTER_ACCENT}12 0%, rgba(0,0,0,0.2) 100%)`,
          }}
        >
          <IconDelivery color={CHAPTER_ACCENT} />
          <p
            className="font-bold text-white text-center"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            納品成果物
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
            画像・音声・原稿
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
        transition={{ delay: 0.55 }}
      >
        <div
          className="w-px h-5"
          style={{
            background: `linear-gradient(to bottom, ${CREATIVE_ACCENT}66, ${CREATIVE_ACCENT})`,
          }}
        />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M6 8L0 0h12L6 8z" fill={`${CREATIVE_ACCENT}99`} />
        </svg>
        <span
          className="font-bold tracking-[0.2em] uppercase"
          style={{
            color: CREATIVE_ACCENT,
            fontSize: 'clamp(10px, 0.88vw, 12px)',
          }}
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
      transition={{ duration: 0.45, delay: 0.6 + index * 0.08 }}
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

export default function Slide87CreativeLegalCheckpoints() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-5 md:py-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            クリエイティブ編 · 4つの観点
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 34px)' }}
          >
            クリエイター業務委託時に
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${CREATIVE_ACCENT} 0%, ${PINK_ACCENT} 100%)`,
              }}
            >
              押さえるべき法的チェックポイント
            </span>
          </h2>
        </div>

        <ScenarioHub />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {CHECKPOINTS.map((item, i) => (
            <CheckpointPillar key={item.num} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
