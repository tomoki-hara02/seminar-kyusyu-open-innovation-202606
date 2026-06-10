'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 4-3 社内秘密情報・営業秘密 — 生成AI利用と秘密管理性（令和7年改訂 営業秘密管理指針）
 *
 * 左: 営業秘密管理指針 p.18 注2 の引用（「秘密管理性が否定されることはない」をハイライト）
 * 右: 管理単位C/D の図解 + 出典リンク + ポイント
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';
const UNIT_C_ACCENT = '#88bbff';
const UNIT_D_ACCENT = '#c8a8ff';

const METI_GUIDELINE_URL =
  'https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/r7ts.pdf';

/** 引用パラグラフ（hl: true がハイライト箇所） */
const QUOTE_PARAGRAPHS: { text: string; hl?: boolean }[][] = [
  [
    {
      text: '管理単位Cで秘密管理されている情報αを生成AIに利用していた場合であって、その後、管理単位Cで当該生成AIから当該情報αがAI生成物として生成・出力されることがあったとしても、当該情報αが管理単位Cで秘密管理されているのであれば、管理単位Cで当該情報αが生成・出力されたことの一事をもって、管理単位Cにおける',
    },
    { text: '秘密管理性が否定されることはない', hl: true },
    { text: 'と考えられる。' },
  ],
  [
    {
      text: 'また、管理単位Dで当該生成AIから当該情報αがAI生成物として生成・出力されることがあったとしても、当該情報αが管理単位Cで秘密管理されているのであれば、管理単位Dで当該情報αが生成・出力されたことの一事をもって、管理単位Cにおける',
    },
    { text: '秘密管理性が否定されることはない', hl: true },
    { text: 'と考えられる。' },
  ],
];

function QuoteColumn() {
  return (
    <motion.div
      className="flex flex-col gap-2 p-3.5 md:p-4 rounded-2xl border h-full"
      style={{
        borderColor: `${LAW_ACCENT}44`,
        background: `linear-gradient(160deg, ${LAW_ACCENT}12 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      <div className="flex flex-col gap-0.5 shrink-0">
        <span
          className="tracking-[0.22em] uppercase text-white/30"
          style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
        >
          経済産業省
        </span>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-bold tracking-tight text-white"
            style={{ fontSize: 'clamp(15px, 1.3vw, 21px)' }}
          >
            営業秘密管理指針 p.18 注2
          </span>
          <span
            className="text-white/35 leading-none"
            style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
          >
            最終改訂: 令和7年3月31日
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-white/8 shrink-0" />

      <div className="flex flex-col gap-2.5">
        {QUOTE_PARAGRAPHS.map((para, pi) => (
          <motion.p
            key={pi}
            className="text-white/80 leading-[1.8]"
            style={{ fontSize: 'clamp(11.5px, 0.98vw, 14px)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + pi * 0.15 }}
          >
            {para.map((chunk, ci) =>
              chunk.hl ? (
                <span
                  key={ci}
                  className="font-bold px-0.5 rounded-sm"
                  style={{
                    color: HIGHLIGHT_ACCENT,
                    background: `${HIGHLIGHT_ACCENT}22`,
                    boxDecorationBreak: 'clone',
                    WebkitBoxDecorationBreak: 'clone',
                  }}
                >
                  {chunk.text}
                </span>
              ) : (
                <span key={ci}>{chunk.text}</span>
              )
            )}
          </motion.p>
        ))}
      </div>

      <p
        className="text-white/25 tracking-wide shrink-0 mt-auto pt-1"
        style={{ fontSize: 'clamp(10px, 0.72vw, 10.5px)' }}
      >
        ※ 原文の脚注番号は省略
      </p>
    </motion.div>
  );
}

function UnitFlowDiagram() {
  return (
    <div className="flex flex-col items-center gap-1.5 w-full">
      {/* 管理単位C: 情報α 秘密管理 */}
      <motion.div
        className="w-full max-w-sm px-3 py-2 rounded-xl border text-center"
        style={{
          borderColor: `${UNIT_C_ACCENT}66`,
          background: `linear-gradient(135deg, ${UNIT_C_ACCENT}16 0%, rgba(255,255,255,0.02) 100%)`,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <p
          className="font-bold leading-snug"
          style={{ color: UNIT_C_ACCENT, fontSize: 'clamp(12px, 1vw, 14px)' }}
        >
          管理単位C — 情報α
        </p>
        <p className="text-white/55 leading-snug" style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}>
          🔒 秘密として管理
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <span className="text-white/40" style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}>
          入力
        </span>
        <svg width="12" height="14" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M7 9L0 0h14L7 9z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>

      {/* 生成AI */}
      <motion.div
        className="px-5 py-1.5 rounded-full border font-bold text-white"
        style={{
          borderColor: `${CHAPTER_ACCENT}66`,
          background: `${CHAPTER_ACCENT}14`,
          fontSize: 'clamp(12px, 1vw, 14px)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.55 }}
      >
        生成AI
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <span className="text-white/40" style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}>
          情報αを AI 生成物として出力
        </span>
        <svg width="12" height="14" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M7 9L0 0h14L7 9z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>

      {/* 出力先 C / D */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {[
          {
            unit: '管理単位C で出力',
            accent: UNIT_C_ACCENT,
            result: 'Cの秘密管理性は否定されない',
          },
          {
            unit: '管理単位D で出力',
            accent: UNIT_D_ACCENT,
            result: 'それでも Cの秘密管理性は否定されない',
          },
        ].map((dest, i) => (
          <motion.div
            key={dest.unit}
            className="flex flex-col gap-1 px-2.5 py-2 rounded-xl border text-center"
            style={{
              borderColor: `${dest.accent}55`,
              background: `linear-gradient(135deg, ${dest.accent}12 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.75 + i * 0.1 }}
          >
            <span
              className="font-bold leading-snug"
              style={{ color: dest.accent, fontSize: 'clamp(11px, 0.92vw, 13px)' }}
            >
              {dest.unit}
            </span>
            <span
              className="font-semibold leading-snug"
              style={{ color: CHAPTER_ACCENT, fontSize: 'clamp(10.5px, 0.88vw, 12.5px)' }}
            >
              ✓ {dest.result}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Slide52TradeSecretGenaiManagement() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3.5 md:gap-4 w-full max-w-6xl py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-3 · 社内秘密情報・営業秘密 · 令和7年改訂指針
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(19px, 2.1vw, 32px)' }}
          >
            生成AIに入力・出力されても、
            <span
              className="bg-clip-text text-transparent ml-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${HIGHLIGHT_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              秘密管理性は直ちに失われない
            </span>
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            令和7年改訂で、生成AI利用時の秘密管理性の考え方が指針に明記された
          </p>
        </div>

        {/* 本体: 左引用 / 右図解 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-stretch">
          <QuoteColumn />

          <motion.div
            className="flex flex-col gap-3 p-3.5 md:p-4 rounded-2xl border h-full"
            style={{
              borderColor: `${CHAPTER_ACCENT}44`,
              background: `linear-gradient(160deg, ${CHAPTER_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <UnitFlowDiagram />

            <div
              className="flex flex-col gap-1.5 px-3 py-2 rounded-xl border mt-auto"
              style={{
                borderColor: `${HIGHLIGHT_ACCENT}44`,
                background: `${HIGHLIGHT_ACCENT}0d`,
              }}
            >
              <p
                className="text-white/75 leading-snug"
                style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
              >
                <span className="font-bold" style={{ color: HIGHLIGHT_ACCENT }}>
                  ポイント:
                </span>{' '}
                生成・出力された「一事をもって」秘密管理性は否定されない。
                前提は、当該情報が
                <span className="text-white font-semibold">引き続き秘密として管理されていること</span>
                。
              </p>
            </div>

            <a
              href={METI_GUIDELINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#88bbff] hover:text-[#a8d4ff] underline underline-offset-2 transition-colors w-fit"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <span aria-hidden>↗</span>
              <span>経産省「営業秘密管理指針」（令和7年3月31日最終改訂）p.18 注2</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
