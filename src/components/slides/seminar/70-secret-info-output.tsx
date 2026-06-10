'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';

/**
 * p70: 5-4 出力情報 — 秘密情報入力時の出力の扱い
 */

const OUTPUT_ACCENT = '#ff9966';
const SECRET_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

const INPUT_TYPES = ['営業秘密', '守秘義務対象の秘密情報'] as const;

/** 守秘義務契約の条文例（第1条） */
const ARTICLE_EXAMPLE = {
  heading: '条文例',
  title: '第1条（秘密情報）',
  body:
    '本契約において、「秘密情報」とは、文書、口頭、電磁的記録媒体その他有形無形を問わず、本目的のために、甲及び乙のうち情報を開示する側（以下「情報開示者」という）から甲及び乙のうちその開示された情報を受領する側（以下「情報受領者」という）に対して開示された一切の情報をいう。',
  highlight: '開示された一切の情報',
};

function ArticleExampleBody() {
  const [before, after] = ARTICLE_EXAMPLE.body.split(ARTICLE_EXAMPLE.highlight);

  return (
    <p
      className="text-white/80 leading-[1.45]"
      style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
    >
      {before}
      <span
        className="font-bold px-0.5 rounded-sm"
        style={{
          color: HIGHLIGHT_ACCENT,
          background: `${HIGHLIGHT_ACCENT}22`,
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}
      >
        {ARTICLE_EXAMPLE.highlight}
      </span>
      {after}
    </p>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden className="shrink-0">
        <path
          d="M8 0v14m0 0l-4-4m4 4l4-4"
          stroke={`${OUTPUT_ACCENT}aa`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M0 8h18m0 0l-5-5m5 5l-5 5"
        stroke={`${OUTPUT_ACCENT}aa`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SecretFlowDiagram() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 md:gap-2 w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* 入力 */}
      <div
        className="w-full max-w-md px-3 py-2 rounded-xl border text-center"
        style={{
          borderColor: `${SECRET_ACCENT}55`,
          background: `linear-gradient(135deg, ${SECRET_ACCENT}14 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        <p
          className="font-bold text-white/50 tracking-wide mb-2"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          入力
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {INPUT_TYPES.map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 rounded-lg border font-semibold"
              style={{
                color: SECRET_ACCENT,
                borderColor: `${SECRET_ACCENT}66`,
                background: `${SECRET_ACCENT}12`,
                fontSize: 'clamp(13px, 1.05vw, 16px)',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <FlowArrow vertical />

      {/* 生成AI */}
      <div
        className="px-5 py-2 rounded-full border font-bold"
        style={{
          color: LAW_ACCENT,
          borderColor: `${LAW_ACCENT}55`,
          background: `${LAW_ACCENT}12`,
          fontSize: 'clamp(13px, 1.05vw, 16px)',
        }}
      >
        生成AI
      </div>

      <FlowArrow vertical />

      {/* 出力 */}
      <div
        className="w-full max-w-md px-3 py-2 rounded-xl border text-center"
        style={{
          borderColor: `${OUTPUT_ACCENT}55`,
          background: `linear-gradient(135deg, ${OUTPUT_ACCENT}12 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        <p
          className="font-bold text-white/50 tracking-wide mb-1"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          出力
        </p>
        <p
          className="font-semibold text-white/80"
          style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
        >
          出力情報
        </p>
      </div>

      <FlowArrow vertical />

      {/* 結論 */}
      <div
        className="w-full max-w-2xl px-3 py-2.5 rounded-xl border text-center"
        style={{
          borderColor: `${HIGHLIGHT_ACCENT}66`,
          background: `linear-gradient(135deg, ${HIGHLIGHT_ACCENT}16 0%, rgba(255,255,255,0.03) 100%)`,
          boxShadow: `0 0 28px -8px ${HIGHLIGHT_ACCENT}44`,
        }}
      >
        <p
          className="font-bold leading-snug"
          style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(15px, 1.4vw, 20px)' }}
        >
          出力情報もまた、営業秘密や
          <br className="md:hidden" />
          守秘義務対象の秘密情報として管理する
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide70SecretInfoOutput() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-8 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            5-4 · 出力情報 · 秘密情報入力
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.1vw, 32px)' }}
          >
            秘密情報
            <span className="text-white/55 font-semibold mx-1.5">（営業秘密 / 守秘義務）</span>
            を入力した際の出力について
          </h2>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <RelatedRuleLink
              targetId="51-trade-secret-act"
              label="関連: 4-3 営業秘密・不正競争防止法"
              accent="#9ee0a8"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-center">
            <motion.div
              className="w-full shrink-0 rounded-xl border px-2.5 py-2 md:px-3 md:py-2.5"
              style={{
                borderColor: `${OUTPUT_ACCENT}44`,
                background: `linear-gradient(160deg, ${OUTPUT_ACCENT}08 0%, rgba(255,255,255,0.02) 100%)`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <SecretFlowDiagram />
            </motion.div>

            <motion.div
              className="w-full shrink-0 self-center rounded-xl border px-2.5 py-2 md:px-3 md:py-2 flex flex-col gap-1"
              style={{
                borderColor: `${SECRET_ACCENT}55`,
                background: `linear-gradient(160deg, ${SECRET_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
              }}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              <span
                className="tracking-[0.2em] uppercase text-white/40 font-semibold leading-none"
                style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
              >
                {ARTICLE_EXAMPLE.heading}
              </span>
              <p
                className="font-bold leading-snug"
                style={{ color: SECRET_ACCENT, fontSize: 'clamp(13px, 1.15vw, 17px)' }}
              >
                {ARTICLE_EXAMPLE.title}
              </p>
              <ArticleExampleBody />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
