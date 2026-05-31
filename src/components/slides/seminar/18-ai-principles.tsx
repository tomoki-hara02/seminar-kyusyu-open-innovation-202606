'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p20a: AI事業者ガイドライン — 基本理念 3 原則
 *
 * ベーステンプレート: `templates/TriangleDiagram.tsx`
 *
 * 左: トライアングル図（Dignity / Diversity & Inclusion / Sustainability）
 * 右: 各原則の説明文（タブ切り替え）
 */

// ─── Triangle geometry ──────────────────────────────────────────────────────
const S  = 340;
const H  = (S * Math.sqrt(3)) / 2;
const VW = 640, VH = 500;
const CX = VW / 2, CY = VH / 2 + 10;

const vT = { x: CX,         y: CY - (H * 2) / 3 };
const vR = { x: CX + S / 2, y: CY + H / 3 };
const vL = { x: CX - S / 2, y: CY + H / 3 };

const PATH = `M${vT.x},${vT.y} L${vR.x},${vR.y} L${vL.x},${vL.y} Z`;
const PERI  = S * 3;
const SEG_LEN = PERI / 6;
const CYCLE = 4;

// ─── ハイライトレンダラー ─────────────────────────────────────────────────────
function HighlightedText({
  text,
  highlights,
  color,
}: {
  text: string;
  highlights: string[];
  color: string;
}) {
  if (!highlights.length) return <>{text}</>;

  const regex = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <mark
            key={i}
            style={{
              background: `${color}30`,
              color,
              borderRadius: '3px',
              padding: '0 2px',
              fontWeight: 700,
              boxShadow: `0 0 0 1px ${color}55`,
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Principle data ──────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    key: 'dignity',
    v: vT,
    law: '人間の尊厳',
    en: 'Dignity',
    color: '#c4aeff',
    anchor: 'middle' as const,
    lx: 0, ly: -38,
    delay: 0,
    description:
      'AIを利活用して効率性や利便性を追求するあまり、人間がAIに過度に依存したり、人間の行動をコントロールすることにAIが利用される社会を構築するのではなく、人間がAIを道具として使いこなすことによって、人間の様々な能力をさらに発揮することを可能とし、より大きな創造性を発揮したり、やりがいのある仕事に従事したりすることで、物質的にも精神的にも豊かな生活を送ることができるような、人間の尊厳が尊重される社会を構築する必要がある。',
    highlights: [
      '人間がAIに過度に依存',
      '人間の行動をコントロールすることにAIが利用される社会を構築するのではなく',
    ],
  },
  {
    key: 'diversity',
    v: vR,
    law: '多様性・包摂',
    en: 'Diversity and Inclusion',
    color: '#88bbff',
    anchor: 'start' as const,
    lx: 22, ly: 6,
    delay: CYCLE / 3,
    description:
      '多様な背景、価値観又は考え方を持つ人々が多様な幸せを追求し、それらを柔軟に包摂した上で新たな価値を創造できる社会は、現代における一つの理想であり、大きなチャレンジである。AIという強力な技術は、この理想に我々を近づける一つの有力な道具となりうる。我々はAIの適正な開発と展開によって、このように社会の在り方を変革していく必要がある。',
    highlights: [
      '多様な背景、価値観又は考え方を持つ人々が多様な幸せを追求し、それらを柔軟に包摂した上で新たな価値を創造できる社会',
    ],
  },
  {
    key: 'sustainability',
    v: vL,
    law: '持続可能性',
    en: 'Sustainability',
    color: '#9ee0a8',
    anchor: 'end' as const,
    lx: -22, ly: 6,
    delay: (CYCLE * 2) / 3,
    description:
      '我々は、AIの活用によりビジネスやソリューションを次々と生み、社会の格差を解消し、地球規模の環境問題や気候変動等にも対応が可能な持続性のある社会を構築する方向へ展開させる必要がある。科学・技術立国としての我が国は、その科学的・技術的蓄積をAIによって強化し、そのような社会を作ることに貢献する責務がある。',
    highlights: [
      'AIの活用によりビジネスやソリューションを次々と生み、社会の格差を解消し',
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide20aAiPrinciples() {
  const [activeKey, setActiveKey] = useState<string>('dignity');
  const active = PRINCIPLES.find((p) => p.key === activeKey)!;

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-row w-full h-full max-w-7xl gap-6 px-2 py-4 pt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ─── 左: タイトル + トライアングル ─── */}
        <div className="flex flex-col items-center justify-center shrink-0" style={{ width: '44%' }}>
          {/* ヘッダー */}
          <div className="flex flex-col items-center gap-1 text-center mb-2">
            <h2 className="font-bold tracking-tight text-white leading-tight"
              style={{ fontSize: 'clamp(16px, 2vw, 26px)' }}>
              経産省「AI事業者ガイドライン（1.2版）」
            </h2>
            <span className="text-white/40" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)' }}>
              基本理念
            </span>
          </div>

          {/* SVG */}
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible', maxHeight: '55vh' }}
          >
            <defs>
              <filter id="glow-edge-p" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-core-p" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-dot-p" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Guide line */}
            <path d={PATH} stroke="rgba(255,255,255,0.15)" strokeWidth={1} fill="none" />

            {/* Traveling glow — wide */}
            <motion.path
              d={PATH}
              stroke="#6aaaff"
              strokeWidth={10}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${SEG_LEN} ${PERI - SEG_LEN}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -PERI }}
              transition={{ duration: CYCLE, repeat: Infinity, ease: 'linear' }}
              filter="url(#glow-edge-p)"
              opacity={0.22}
            />

            {/* Traveling glow — core */}
            <motion.path
              d={PATH}
              stroke="#ccecff"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${SEG_LEN} ${PERI - SEG_LEN}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -PERI }}
              transition={{ duration: CYCLE, repeat: Infinity, ease: 'linear' }}
              filter="url(#glow-core-p)"
            />

            {/* Center label */}
            <text x={CX} y={CY - 8} textAnchor="middle" fill="rgba(255,255,255,0.75)"
              fontSize={17} fontWeight="700" letterSpacing="0.08em" fontFamily="sans-serif">
              AI事業者
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fill="rgba(255,255,255,0.45)"
              fontSize={13} letterSpacing="0.14em" fontFamily="sans-serif">
              GUIDELINES
            </text>

            {/* Vertex nodes */}
            {PRINCIPLES.map((node) => {
              const isActive = node.key === activeKey;
              return (
                <g
                  key={node.key}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setActiveKey(node.key); }}
                >
                  {/* Ripple */}
                  <motion.circle
                    cx={node.v.x} cy={node.v.y} r={7}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={isActive ? 2 : 1.5}
                    initial={{ r: 7, opacity: 0.7 }}
                    animate={{ r: [7, 20], opacity: [0.8, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: CYCLE - 1.4,
                      ease: 'easeOut',
                      delay: node.delay,
                    }}
                  />
                  {/* Dot */}
                  <motion.circle
                    cx={node.v.x} cy={node.v.y} r={isActive ? 7 : 5}
                    fill={node.color}
                    filter="url(#glow-dot-p)"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: CYCLE, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                  />
                  {/* Law name */}
                  <text
                    x={node.v.x + node.lx}
                    y={node.v.y + node.ly}
                    textAnchor={node.anchor}
                    fill={node.color}
                    fontSize={isActive ? 17 : 15}
                    fontWeight="700"
                    letterSpacing="0.02em"
                    fontFamily="sans-serif"
                  >
                    {node.law}
                  </text>
                  {/* English */}
                  <text
                    x={node.v.x + node.lx}
                    y={node.v.y + node.ly + 18}
                    textAnchor={node.anchor}
                    fill={isActive ? `${node.color}99` : 'rgba(255,255,255,0.28)'}
                    fontSize={10}
                    fontFamily="sans-serif"
                    letterSpacing="0.04em"
                  >
                    {node.en}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-[9px] text-white/25 tracking-wide text-center mt-1">
            頂点をクリックして説明を切り替え
          </p>
        </div>

        {/* ─── 右: 説明テキスト ─── */}
        <div className="flex flex-col flex-1 min-w-0 justify-center gap-5">
          {/* タブ */}
          <div className="flex gap-2 flex-wrap">
            {PRINCIPLES.map((p) => (
              <button
                key={p.key}
                onClick={(e) => { e.stopPropagation(); setActiveKey(p.key); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeKey === p.key ? `${p.color}28` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeKey === p.key ? p.color + '88' : 'rgba(255,255,255,0.12)'}`,
                  color: activeKey === p.key ? p.color : 'rgba(255,255,255,0.45)',
                  boxShadow: activeKey === p.key ? `0 0 14px ${p.color}44` : 'none',
                }}
              >
                <span>{p.law}</span>
                <span className="opacity-60 text-[10px]">{p.en}</span>
              </button>
            ))}
          </div>

          {/* 説明文 */}
          <motion.div
            key={activeKey}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* 見出し */}
            <div className="flex items-baseline gap-3">
              <span
                className="text-2xl font-bold"
                style={{ color: active.color }}
              >
                {active.law}
              </span>
              <span className="text-xs tracking-widest" style={{ color: `${active.color}88` }}>
                {active.en}
              </span>
            </div>

            {/* 区切り */}
            <div className="h-px w-full" style={{ background: `${active.color}33` }} />

            {/* 本文 */}
            <p
              className="leading-[1.9] text-white/70"
              style={{ fontSize: 'clamp(11px, 1.05vw, 14px)' }}
            >
              <HighlightedText
                text={active.description}
                highlights={active.highlights}
                color={active.color}
              />
            </p>

            {/* 出典 */}
            <span className="text-[10px] text-white/25 tracking-wide mt-1">
              出典: 経済産業省「AI事業者ガイドライン（1.2版）」（2026年3月）
            </span>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
