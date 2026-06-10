'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';

/**
 * p70: 5-3 出力情報 — 認識の無い著作物の出力
 *
 * 出典: 文化庁「AIと著作権に関する考え方について」令和6年3月15日
 */

const OUTPUT_ACCENT = '#ff9966';
const OUTPUT_GRAD: [string, string] = ['#f17a45', '#c64823'];
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

const SOURCE_URL =
  'https://www.bunka.go.jp/seisaku/bunkashingikai/chosakuken/pdf/94037901_01.pdf';
const SOURCE_LABEL = 'AIと著作権に関する考え方について';
const SOURCE_DATE = '令和6年3月15日';

const AI_LOGIC_STEPS = [
  { label: '学習データに\n含まれていた', accent: LAW_ACCENT },
  { label: '客観的な\nアクセスがあった', accent: '#88bbff' },
  { label: '依拠性を「推認」する\n（原則）', accent: HIGHLIGHT_ACCENT, highlight: true },
] as const;

const RECOGNITION_CASES = [
  {
    tag: '認識がある場合',
    accent: '#c8a8ff',
    body: '高度な類似性や既存著作物へのアクセス可能性から依拠性を肯定。',
  },
  {
    tag: '認識がない場合',
    accent: HIGHLIGHT_ACCENT,
    body: 'AIの学習データを通じたアクセスがある場合は、ユーザーがその著作物の存在を知らなくても、原則として依拠性が肯定される。',
  },
] as const;

function FlowArrow({ accent }: { accent: string }) {
  return (
    <svg
      className="shrink-0"
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 8h16m0 0l-4-4m4 4l-4 4"
        stroke={`${accent}aa`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AiLogicFlow() {
  return (
    <motion.div
      className="flex flex-col gap-2.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      <p
        className="font-bold text-white/75 tracking-wide"
        style={{ fontSize: 'clamp(11px, 0.95vw, 14px)' }}
      >
        文化庁の考え方
        <span className="text-white/45 font-normal ml-2">（AI固有の論理）</span>
      </p>

      <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-1.5">
        {AI_LOGIC_STEPS.map((step, i) => {
          const isHighlight = 'highlight' in step && step.highlight;
          return (
          <div key={step.label} className="flex md:flex-1 items-center gap-1.5 min-w-0">
            <div
              className="flex-1 px-3 py-2.5 rounded-xl border text-center leading-snug font-semibold whitespace-pre-line"
              style={{
                color: isHighlight ? HIGHLIGHT_ACCENT : step.accent,
                borderColor: `${step.accent}${isHighlight ? '88' : '55'}`,
                background: isHighlight
                  ? `linear-gradient(135deg, ${HIGHLIGHT_ACCENT}18 0%, rgba(255,255,255,0.03) 100%)`
                  : `${step.accent}12`,
                fontSize: 'clamp(11px, 0.95vw, 14px)',
                boxShadow: isHighlight ? `0 0 20px -6px ${HIGHLIGHT_ACCENT}44` : undefined,
              }}
            >
              {step.label}
            </div>
            {i < AI_LOGIC_STEPS.length - 1 && (
              <div className="hidden md:flex items-center justify-center shrink-0">
                <FlowArrow accent={AI_LOGIC_STEPS[i + 1].accent} />
              </div>
            )}
            {i < AI_LOGIC_STEPS.length - 1 && (
              <div className="flex md:hidden items-center justify-center py-0.5">
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden>
                  <path
                    d="M7 0v12m0 0l-4-4m4 4l4-4"
                    stroke={`${AI_LOGIC_STEPS[i + 1].accent}aa`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function RecognitionCases() {
  return (
    <motion.div
      className="flex flex-col gap-2.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.22 }}
    >
      <p
        className="text-white/60 leading-relaxed"
        style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
      >
        文化庁は、認識がある場合・ない場合を以下のように整理しています。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {RECOGNITION_CASES.map((item, i) => (
          <motion.div
            key={item.tag}
            className="relative flex flex-col gap-2 px-4 py-3.5 rounded-xl border overflow-hidden"
            style={{
              borderColor: `${item.accent}55`,
              background: `linear-gradient(160deg, ${item.accent}10 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 + i * 0.08 }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}66` }}
            />

            <span
              className="font-mono tracking-[0.14em] uppercase w-fit px-2 py-0.5 rounded-md border font-semibold ml-1"
              style={{
                color: item.accent,
                borderColor: `${item.accent}55`,
                background: `${item.accent}12`,
                fontSize: 'clamp(10px, 0.85vw, 12px)',
              }}
            >
              {item.tag}
            </span>

            <p
              className="text-white/85 leading-relaxed ml-1"
              style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
            >
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Slide70UnrecognizedCopyrightOutput() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl h-full justify-center py-4 md:py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            5-3 · 出力情報 · 著作権関連
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.3vw, 36px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${OUTPUT_GRAD[0]} 0%, ${OUTPUT_GRAD[1]} 100%)`,
              }}
            >
              認識の無い
            </span>
            著作物の出力
          </h2>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <RelatedRuleLink
              targetId="63-copyright-article-30-4"
              label="関連: 4-6 入力側の著作権（30条の4）"
              accent="#88bbff"
            />
          </div>
          <p
            className="text-white/40 leading-relaxed"
            style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
          >
            出典：
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#88bbff] hover:text-[#a8d4ff] underline underline-offset-2 transition-colors"
              style={{ textDecorationColor: `${LAW_ACCENT}66` }}
              onClick={(e) => e.stopPropagation()}
            >
              文化庁「{SOURCE_LABEL}」
            </a>
            {SOURCE_DATE}
          </p>
        </div>

        <motion.div
          className="flex flex-col gap-4 md:gap-5 px-3 py-3 md:px-4 md:py-4 rounded-xl border"
          style={{
            borderColor: `${OUTPUT_ACCENT}44`,
            background: `linear-gradient(160deg, ${OUTPUT_ACCENT}08 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <AiLogicFlow />

          <div className="h-px bg-white/10" />

          <RecognitionCases />
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
