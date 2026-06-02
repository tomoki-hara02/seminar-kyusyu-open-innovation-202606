'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p38: 3-3 使用可能なAIツール・プランの指定
 *
 * ギミック参照:
 * - `templates/BeforeAfter.tsx` … 禁止 ✕ / 許可 ○
 * - `templates/Recap.tsx` … 番号バッジ + 要点カード
 * - `templates/FurtherReading.tsx` … 指定リスト
 * - `templates/Pipeline.tsx` … ボトムアップフロー
 */

const BOTTOM_UP_STEPS = [
  { label: '従業員申請', accent: '#88bbff' },
  { label: '担当者確認', accent: '#c8a8ff' },
  { label: '利用可能ツールアップデート', accent: '#9ee0a8' },
];

const POINTS = [
  {
    num: '01',
    title: '無料版、個人プランの利用を認めない',
    reason: '秘密情報保護 / 個人データの管理に不適切',
    accent: '#ff7aa8',
  },
  {
    num: '02',
    title: 'シャドーAI対策',
    reason: '指定以外の生成AIサービスを使用させない',
    accent: '#c8a8ff',
  },
];

const BLOCKED_PLANS = ['無料版', '個人プラン'];

const REASON_TAGS = ['秘密情報保護', '個人データ管理'];

const APPROVED_TOOLS = ['ChatGPT Enterprise', 'Claude Team'];

const SHADOW_TOOLS = ['未指定ツール A', '個人向けAI B'];

function NoFreePersonalVisual({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {BLOCKED_PLANS.map((plan, i) => (
          <motion.div
            key={plan}
            className="relative flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-lg border"
            style={{
              borderColor: `${accent}55`,
              background: `${accent}10`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <span
              className="font-semibold text-white/75"
              style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
            >
              {plan}
            </span>
            <span
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `${accent}22`,
                border: `1.5px solid ${accent}`,
                color: accent,
              }}
            >
              ✕
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center gap-1.5 text-white/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm">↓</span>
        <span style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}>理由</span>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {REASON_TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            className="px-2.5 py-1 rounded-full border"
            style={{
              color: accent,
              borderColor: `${accent}44`,
              background: `${accent}0d`,
              fontSize: 'clamp(10px, 0.85vw, 12px)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * 0.08 }}
          >
            {tag}
          </motion.span>
        ))}
        <motion.span
          className="text-white/40"
          style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          に不適切
        </motion.span>
      </div>
    </div>
  );
}

function ShadowAIVisual({ accent }: { accent: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 w-full max-w-[18rem] mx-auto">
      <motion.div
        className="flex flex-col gap-1.5 p-2.5 rounded-lg border"
        style={{
          borderColor: `${accent}55`,
          background: `${accent}10`,
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span
          className="font-bold tracking-wide"
          style={{ color: accent, fontSize: 'clamp(9px, 0.78vw, 11px)' }}
        >
          指定ツール
        </span>
        {APPROVED_TOOLS.map((tool, i) => (
          <motion.div
            key={tool}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            <span className="text-[#9ee0a8] text-xs font-bold shrink-0">✓</span>
            <span
              className="text-white/75 leading-snug"
              style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
            >
              {tool}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center gap-1 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-white/30 text-xs">|</span>
        <span
          className="text-[9px] tracking-wider uppercase text-white/35 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          Gate
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col gap-1.5 p-2.5 rounded-lg border"
        style={{
          borderColor: 'rgba(255,122,168,0.45)',
          background: 'rgba(255,122,168,0.08)',
        }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
      >
        <span
          className="font-bold tracking-wide text-[#ff7aa8]"
          style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
        >
          Shadow AI
        </span>
        {SHADOW_TOOLS.map((tool, i) => (
          <motion.div
            key={tool}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 + i * 0.08 }}
          >
            <span className="text-[#ff7aa8] text-xs font-bold shrink-0">✕</span>
            <span
              className="text-white/55 leading-snug line-through decoration-white/25"
              style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
            >
              {tool}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function BottomUpFlowVisual() {
  return (
    <div className="relative flex items-start justify-between gap-2 w-full px-2 md:px-6">
      <div className="absolute left-[8%] right-[8%] top-[1.35rem] h-px bg-white/10" />
      <motion.div
        className="absolute left-[8%] top-[1.35rem] h-px"
        style={{
          background: 'linear-gradient(90deg, #88bbff, #c8a8ff, #9ee0a8)',
          boxShadow: '0 0 10px rgba(136,187,255,0.4)',
        }}
        initial={{ width: 0 }}
        animate={{ width: '84%' }}
        transition={{ duration: 1.1, delay: 0.45, ease: 'easeOut' }}
      />

      {BOTTOM_UP_STEPS.map((step, i) => (
        <div key={step.label} className="flex-1 flex flex-col items-center gap-3 min-w-0 z-10">
          <motion.div
            className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shrink-0"
            style={{
              borderColor: `${step.accent}88`,
              background: `${step.accent}18`,
              boxShadow: `0 0 20px ${step.accent}44`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.15, type: 'spring', stiffness: 220 }}
          >
            <span
              className="font-bold tabular-nums"
              style={{ color: step.accent, fontSize: 'clamp(11px, 0.95vw, 14px)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.div>
          <motion.p
            className="text-white/80 font-semibold text-center leading-snug px-1"
            style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12 }}
          >
            {step.label}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

export default function Slide37AiToolPlanSpec() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-7 w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            3-3 · 使用可能なAIツール・プランの指定
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            ツール・プラン
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #ff7aa8 0%, #c8a8ff 55%, #88bbff 100%)',
              }}
            >
              指定の要点
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.num}
              className="relative flex flex-col gap-4 p-5 md:p-6 rounded-2xl border min-h-0"
              style={{
                background: `linear-gradient(160deg, ${point.accent}12 0%, rgba(255,255,255,0.03) 100%)`,
                borderColor: `${point.accent}44`,
                boxShadow: `0 24px 48px -24px rgba(0,0,0,0.55), 0 0 36px -12px ${point.accent}33`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg tabular-nums"
                  style={{
                    background: `${point.accent}1f`,
                    border: `1px solid ${point.accent}66`,
                    color: point.accent,
                    boxShadow: `0 0 16px ${point.accent}33`,
                  }}
                >
                  {point.num}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <h3
                    className="font-semibold text-white leading-snug"
                    style={{ fontSize: 'clamp(15px, 1.35vw, 19px)' }}
                  >
                    {point.title}
                  </h3>
                  <p
                    className="text-white/50 leading-relaxed"
                    style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                  >
                    → {point.reason}
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl border px-3 py-4 min-h-[9rem] flex items-center justify-center"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.16)',
                }}
              >
                {i === 0 ? (
                  <NoFreePersonalVisual accent={point.accent} />
                ) : (
                  <ShadowAIVisual accent={point.accent} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative flex flex-col gap-4 p-5 md:p-6 rounded-2xl border"
          style={{
            borderColor: 'rgba(136,187,255,0.3)',
            background:
              'linear-gradient(160deg, rgba(136,187,255,0.1) 0%, rgba(200,168,255,0.06) 50%, rgba(255,255,255,0.03) 100%)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg tabular-nums"
              style={{
                background: '#88bbff1f',
                border: '1px solid #88bbff66',
                color: '#88bbff',
                boxShadow: '0 0 16px rgba(136,187,255,0.33)',
              }}
            >
              03
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h3
                className="font-semibold text-white leading-snug"
                style={{ fontSize: 'clamp(15px, 1.35vw, 19px)' }}
              >
                従業員からの生成AI活用アイデアのボトムアップ対応
              </h3>
              <p
                className="text-white/45"
                style={{ fontSize: 'clamp(11px, 0.9vw, 13px)' }}
              >
                併せて、現場のニーズを取り込みながら指定ツールを更新する
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border px-3 py-5 md:py-6"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.16)',
            }}
          >
            <BottomUpFlowVisual />
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
