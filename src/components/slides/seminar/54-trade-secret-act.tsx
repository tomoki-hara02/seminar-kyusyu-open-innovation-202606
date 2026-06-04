'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p54: 4-3 社内秘密情報・営業秘密 — 不正競争防止法 第2条6項
 *
 * 左: `templates/TextHighlight.tsx`（クリックで段階ハイライト）
 * 右: 秘密管理のポイント + 経産省ガイドラインリンク + DecisionTree（RBA）
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_COLOR = '#88bbff';
const METI_GUIDELINE_URL =
  'https://www.meti.go.jp/policy/economy/chizai/chiteki/guideline/r7ts.pdf';

type TextChunk = { text: string; accent?: boolean };
type IndexedChunk = TextChunk & { blockIdx: number };

const RAW_BLOCKS: TextChunk[][] = [
  [{ text: 'この法律において「営業秘密」とは、' }],
  [{ text: '秘密として管理されている', accent: true }],
  [
    { text: '生産方法、販売方法その他の事業活動に' },
    { text: '有用な技術上又は営業上の情報であって、', accent: true },
  ],
  [
    { text: '公然と知られていない', accent: true },
    { text: 'ものをいう。' },
  ],
];

function buildBlocks() {
  const blocks: IndexedChunk[][] = RAW_BLOCKS.map((block, blockIdx) =>
    block.map((chunk) => ({ ...chunk, blockIdx }))
  );
  return { blocks, total: blocks.length };
}

const { blocks: ARTICLE_BLOCKS, total: ARTICLE_TOTAL } = buildBlocks();

function LegalQuoteColumn() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const isFinished = activeIdx >= ARTICLE_TOTAL - 1;

  const handleClick = (e: React.MouseEvent) => {
    if (isFinished) return;
    e.stopPropagation();
    setActiveIdx((i) => i + 1);
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      <div
        className="relative w-full max-w-[26rem] rounded-2xl border cursor-pointer select-none"
        style={{
          borderColor: `${LAW_ACCENT}44`,
          background: `linear-gradient(160deg, ${LAW_ACCENT}12 0%, rgba(255,255,255,0.02) 100%)`,
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        <div className="flex flex-col gap-2 p-3 md:p-4">
          <div className="flex flex-col gap-0.5 shrink-0">
            <span
              className="tracking-[0.22em] uppercase text-white/30"
              style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
            >
              不正競争防止法
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="font-bold tracking-tight text-white"
                style={{ fontSize: 'clamp(17px, 1.45vw, 24px)' }}
              >
                第2条6項
              </span>
              <span
                className="text-white/30 leading-none"
                style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
              >
                営業秘密の定義
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-white/8 shrink-0" />

          <div
            className="leading-[1.75]"
            style={{ fontSize: 'clamp(11.5px, 0.95vw, 14px)' }}
          >
            {ARTICLE_BLOCKS.map((block) =>
              block.map((chunk) => {
                const isActive = chunk.blockIdx === activeIdx;
                const isHidden = chunk.blockIdx > activeIdx;
                return (
                  <motion.span
                    key={`${chunk.blockIdx}-${chunk.text}`}
                    animate={{
                      opacity: isHidden ? 0 : isActive ? 1 : 0.22,
                      color: chunk.accent ? HIGHLIGHT_COLOR : '#ffffff',
                      filter: isActive
                        ? chunk.accent
                          ? 'drop-shadow(0 0 6px rgba(79,142,247,0.9))'
                          : 'drop-shadow(0 0 6px rgba(200,220,255,0.7))'
                        : 'none',
                    }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {chunk.text}
                  </motion.span>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1 border-t border-white/8">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: `${HIGHLIGHT_COLOR}99` }}
            />
            <span
              className="text-white/25 tracking-wide leading-snug"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              秘密管理 · 有用性 · 非公知性 — 営業秘密の3要件
            </span>
          </div>

          <AnimatePresence>
            {!isFinished && (
              <motion.div
                className="flex items-center justify-center gap-2 text-white/20 tracking-widest pointer-events-none pt-0.5"
                style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-block w-3 h-px bg-white/20" />
                クリックで次の文へ
                <span className="inline-block w-3 h-px bg-white/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── DecisionTree テンプレート準拠（viewBox 500×300） ───────────────────────
const Q_ROOT = {
  x: 168,
  y: 24,
  w: 164,
  h: 58,
  title: 'Q1',
  sub: '秘密保持条項がある',
};
const Q_RIGHT = {
  x: 292,
  y: 128,
  w: 164,
  h: 58,
  title: 'Q2',
  sub: '入力可能な情報を細分化できる',
  accent: LAW_ACCENT,
};
const LEAF_W = 108;
const LEAF_H = 46;
const LEAF_Y = 236;
const LEAVES = [
  { x: 16, label: '入力禁止', accent: '#ff7aa8' },
  { x: 136, label: 'リスク軽減措置', accent: '#f7c46c' },
  { x: 296, label: '監視で運用', accent: CHAPTER_ACCENT },
] as const;

function QuestionNode({
  q,
  delay,
}: {
  q: { x: number; y: number; w: number; h: number; title: string; sub: string; accent?: string };
  delay: number;
}) {
  const stroke = q.accent ?? '#88bbff';
  return (
    <motion.g
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        x={q.x}
        y={q.y}
        width={q.w}
        height={q.h}
        rx={8}
        fill={q.accent ? `${q.accent}1c` : 'rgba(136,187,255,0.10)'}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <text
        x={q.x + q.w / 2}
        y={q.y + 22}
        fill="white"
        fontSize={14}
        textAnchor="middle"
        fontWeight={600}
      >
        {q.title}
      </text>
      <text
        x={q.x + q.w / 2}
        y={q.y + 42}
        fill="rgba(255,255,255,0.55)"
        fontSize={11.5}
        textAnchor="middle"
      >
        {q.sub}
      </text>
    </motion.g>
  );
}

function LeafNode({
  leaf,
  delay,
}: {
  leaf: { x: number; label: string; accent: string };
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        x={leaf.x}
        y={LEAF_Y}
        width={LEAF_W}
        height={LEAF_H}
        rx={20}
        fill={`${leaf.accent}14`}
        stroke={leaf.accent}
        strokeWidth={1.2}
      />
      <text
        x={leaf.x + LEAF_W / 2}
        y={LEAF_Y + LEAF_H / 2 + 5}
        fill={leaf.accent}
        fontSize={13}
        textAnchor="middle"
        fontWeight={600}
      >
        {leaf.label}
      </text>
    </motion.g>
  );
}

function RiskBasedDecisionTree() {
  const rootCx = Q_ROOT.x + Q_ROOT.w / 2;
  const rootBottom = Q_ROOT.y + Q_ROOT.h;
  const q2Cx = Q_RIGHT.x + Q_RIGHT.w / 2;
  const q2Bottom = Q_RIGHT.y + Q_RIGHT.h;

  return (
    <motion.div
      className="flex flex-col gap-1.5 w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <div className="flex flex-col gap-0 shrink-0">
        <span
          className="tracking-[0.22em] uppercase text-white/30"
          style={{ fontSize: 'clamp(10px, 0.72vw, 11px)' }}
        >
          Decision Flow
        </span>
        <p
          className="font-bold text-white tracking-tight leading-snug"
          style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
        >
          リスクベースアプローチの適用
        </p>
      </div>

      <div className="relative w-full" style={{ aspectRatio: '500 / 300' }}>
        <svg
          viewBox="0 0 500 300"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Q1 No → 入力禁止 */}
          <motion.path
            d={`M ${rootCx - 40} ${rootBottom - 8} L ${LEAVES[0].x + LEAF_W / 2} ${LEAF_Y}`}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          {/* Q1 Yes → Q2 */}
          <motion.path
            d={`M ${rootCx + 40} ${rootBottom - 8} L ${q2Cx} ${Q_RIGHT.y}`}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          {/* Q2 No → リスク軽減措置 */}
          <motion.path
            d={`M ${q2Cx - 20} ${q2Bottom} L ${LEAVES[1].x + LEAF_W / 2} ${LEAF_Y}`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1.2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          {/* Q2 Yes → 監視で運用 */}
          <motion.path
            d={`M ${q2Cx + 20} ${q2Bottom} L ${LEAVES[2].x + LEAF_W / 2} ${LEAF_Y}`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1.2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />

          <text x={rootCx - 72} y={108} fill="#ff7aa8" fontSize={12} textAnchor="middle">
            No
          </text>
          <text x={rootCx + 72} y={108} fill={CHAPTER_ACCENT} fontSize={12} textAnchor="middle">
            Yes
          </text>
          <text x={q2Cx - 48} y={205} fill="#f7c46c" fontSize={12} textAnchor="middle">
            No
          </text>
          <text x={q2Cx + 48} y={205} fill={CHAPTER_ACCENT} fontSize={12} textAnchor="middle">
            Yes
          </text>

          <QuestionNode q={Q_ROOT} delay={0.2} />
          <QuestionNode q={Q_RIGHT} delay={0.5} />
          {LEAVES.map((leaf, i) => (
            <LeafNode key={leaf.label} leaf={leaf} delay={0.85 + i * 0.08} />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

function ManagementFlowColumn() {
  return (
    <motion.div
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className="flex flex-col gap-2 p-3 md:p-4 rounded-2xl border shrink-0"
        style={{
          borderColor: `${CHAPTER_ACCENT}44`,
          background: `linear-gradient(160deg, ${CHAPTER_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="w-full px-3 py-2 rounded-xl border text-center"
          style={{
            borderColor: `${CHAPTER_ACCENT}55`,
            background: `${CHAPTER_ACCENT}14`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p
            className="font-bold text-white leading-snug"
            style={{ fontSize: 'clamp(13px, 1.1vw, 17px)' }}
          >
            秘密として管理されている
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-0.5 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div
            className="w-px h-3.5"
            style={{ background: `linear-gradient(to bottom, ${CHAPTER_ACCENT}44, ${CHAPTER_ACCENT}aa)` }}
          />
          <svg width="12" height="8" viewBox="0 0 14 9" fill="none" aria-hidden>
            <path d="M7 9L0 0h14L7 9z" fill={`${CHAPTER_ACCENT}bb`} />
          </svg>
        </motion.div>

        <motion.div
          className="w-full px-3 py-2 rounded-xl border"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.18)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <p
            className="text-white/72 leading-snug"
            style={{ fontSize: 'clamp(10.5px, 0.88vw, 12.5px)' }}
          >
            取引相手先に秘密情報を提供している場合には、従業員及び役員に向けた秘密管理措置に加えて、当該取引相手先と
            <span className="text-white font-semibold">秘密保持契約を締結した上で</span>
            秘密情報を提供したかどうかがポイントとなる
          </p>
        </motion.div>
      </div>

      <motion.div
        className="shrink-0 pt-1.5 border-t"
        style={{ borderColor: `${CHAPTER_ACCENT}22` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <a
          href={METI_GUIDELINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#88bbff] hover:text-[#a8d4ff] underline underline-offset-2 transition-colors"
          style={{ fontSize: 'clamp(10px, 0.82vw, 12px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <span aria-hidden>↗</span>
          <span>経産省：営業秘密管理指針</span>
        </a>
      </motion.div>
      </div>

      <RiskBasedDecisionTree />
    </motion.div>
  );
}

export default function Slide54TradeSecretAct() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-3 · 社内秘密情報・営業秘密
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 34px)' }}
          >
            営業秘密の
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              法的要件と管理
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch">
          <div className="flex w-full items-center justify-center">
            <LegalQuoteColumn />
          </div>
          <ManagementFlowColumn />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
