'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p51: 4-1 入力情報 総論 — データに付着する法的権利関係
 *
 * ベーステンプレート: `templates/KnowledgeGraph.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';
const VW = 760;
const VH = 440;
const CX = VW / 2;
const CY = VH / 2;

type LegalNode = {
  id: string;
  title: string;
  sub?: string;
  desc: string;
  accent: string;
  icon: 'copyright' | 'portrait' | 'key' | 'building' | 'id';
  anchor: { x: number; y: number };
  delay: number;
};

const LEGAL_NODES: LegalNode[] = [
  {
    id: 'copyright',
    title: '著作権法 / 知的財産権',
    desc: '学習データや入力可否などが論点',
    accent: '#88bbff',
    icon: 'copyright',
    anchor: { x: CX, y: 86 },
    delay: 0.42,
  },
  {
    id: 'pip',
    title: '個人情報保護法',
    desc: '利用目的、サービス提供者の監督、外国への提供などが論点',
    accent: '#7dd3fc',
    icon: 'id',
    anchor: { x: 122, y: CY - 6 },
    delay: 0.5,
  },
  {
    id: 'civil',
    title: '民法（人格的利益）',
    sub: '肖像等',
    desc: '動画/画像分野における肖像利用やプライバシー保護が論点',
    accent: '#c8a8ff',
    icon: 'portrait',
    anchor: { x: VW - 122, y: CY - 6 },
    delay: 0.58,
  },
  {
    id: 'trade-secret',
    title: '不正競争防止法',
    sub: '営業秘密',
    desc: '営業秘密の保護や、声優の権利などが論点',
    accent: '#60a5fa',
    icon: 'building',
    anchor: { x: 168, y: VH - 52 },
    delay: 0.66,
  },
  {
    id: 'nda',
    title: '秘密保持契約',
    desc: '契約に沿った運用と生成AI利用が論点',
    accent: CHAPTER_ACCENT,
    icon: 'key',
    anchor: { x: VW - 168, y: VH - 52 },
    delay: 0.74,
  },
];

const GRID_SLOTS: Record<string, string> = {
  copyright: 'col-span-3 row-start-1 self-end justify-self-center z-[2] pb-0.5 md:pb-1',
  pip: 'col-start-1 row-start-2 self-center justify-self-end pr-1 md:pr-3',
  civil: 'col-start-3 row-start-2 self-center justify-self-start pl-1 md:pl-3',
  'trade-secret': 'col-start-1 row-start-3 self-start justify-self-end pr-1 md:pr-3',
  nda: 'col-start-3 row-start-3 self-start justify-self-start pl-1 md:pl-3',
};

function NodeIcon({ kind, accent }: { kind: LegalNode['icon']; accent: string }) {
  const common = {
    stroke: accent,
    fill: 'none',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (kind) {
    case 'copyright':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M9.5 9.2c.8-1.1 2.2-1.8 3.8-1.6 2.1.3 3.4 1.8 3.4 3.6 0 2.4-2.1 3.8-4.2 4.8-1.2.5-2 .9-2 1.8v.2" {...common} />
        </svg>
      );
    case 'portrait':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="8.5" r="3.2" {...common} />
          <path d="M6 20c.8-3.4 3-5.2 6-5.2s5.2 1.8 6 5.2" {...common} />
        </svg>
      );
    case 'key':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle cx="8.5" cy="12" r="3.2" {...common} />
          <path d="M11.2 12H20M16 12v2.2M18.2 12v1.4" {...common} />
        </svg>
      );
    case 'building':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <rect x="5" y="4" width="14" height="16" rx="1.2" {...common} />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" {...common} />
        </svg>
      );
    case 'id':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="2" {...common} />
          <circle cx="9.5" cy="11.5" r="2" {...common} />
          <path d="M14 15.5c0-2 1.2-3 3.5-3" {...common} />
        </svg>
      );
  }
}

function NodeCard({ node }: { node: LegalNode }) {
  return (
    <motion.div
      className={`w-full max-w-[11.5rem] sm:max-w-[13rem] md:max-w-[15.5rem] ${GRID_SLOTS[node.id]}`}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: node.delay }}
    >
      <div
        className="flex flex-col gap-2 p-2.5 md:p-3 rounded-xl border backdrop-blur-sm h-full"
        style={{
          borderColor: `${node.accent}44`,
          background: `linear-gradient(160deg, ${node.accent}14 0%, rgba(0,0,0,0.24) 100%)`,
        }}
      >
        <div className="flex items-start gap-2 md:gap-2.5">
          <span
            className="shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg border"
            style={{
              borderColor: `${node.accent}55`,
              background: `${node.accent}18`,
            }}
          >
            <NodeIcon kind={node.icon} accent={node.accent} />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="font-semibold text-white leading-snug"
              style={{ fontSize: 'clamp(12.5px, 1.05vw, 15px)' }}
            >
              {node.title}
            </p>
            {node.sub && (
              <p className="text-white/45 mt-0.5" style={{ fontSize: 'clamp(11px, 0.88vw, 13px)' }}>
                {node.sub}
              </p>
            )}
          </div>
        </div>
        <p
          className="text-white/55 leading-relaxed"
          style={{ fontSize: 'clamp(11px, 0.9vw, 13px)' }}
        >
          {node.desc}
        </p>
      </div>
    </motion.div>
  );
}

function DataHub() {
  return (
    <motion.div
      className="col-start-2 row-start-2 self-center justify-self-center relative z-10 px-2"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 180 }}
    >
      <div
        className="relative flex items-center justify-center w-[5.25rem] h-[5.25rem] md:w-[6rem] md:h-[6rem] rounded-full border"
        style={{
          borderColor: `${CHAPTER_ACCENT}88`,
          background: `radial-gradient(circle, ${CHAPTER_ACCENT}28 0%, rgba(0,0,0,0.2) 70%)`,
          boxShadow: `0 0 32px ${CHAPTER_ACCENT}33`,
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: CHAPTER_ACCENT }}
          animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <span
          className="font-bold text-white tracking-[0.12em]"
          style={{ fontSize: 'clamp(15px, 1.25vw, 18px)' }}
        >
          DATA
        </span>
      </div>
    </motion.div>
  );
}

function RightsHubDiagram() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div
        className="relative w-full max-w-6xl"
        style={{ height: 'min(64vh, 500px)' }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="data-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={CHAPTER_ACCENT} stopOpacity="0.28" />
              <stop offset="100%" stopColor={CHAPTER_ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r={58} fill="url(#data-hub-glow)" />

          {LEGAL_NODES.map((node) => (
            <g key={node.id}>
              <line
                x1={CX}
                y1={CY - 34}
                x2={node.anchor.x}
                y2={node.anchor.y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={1}
              />
              <motion.line
                x1={CX}
                y1={CY - 34}
                x2={node.anchor.x}
                y2={node.anchor.y}
                stroke={node.accent}
                strokeWidth={1.15}
                strokeOpacity={0.52}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.52 }}
                transition={{ duration: 0.65, delay: node.delay - 0.08, ease: 'easeOut' }}
              />
            </g>
          ))}
        </svg>

        <div
          className="relative z-[1] grid h-full px-1 sm:px-2 md:px-4 py-1 md:py-2"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gridTemplateRows: 'auto minmax(6.5rem, 1fr) auto',
            columnGap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            rowGap: 'clamp(0.5rem, 1vw, 0.85rem)',
          }}
        >
          {LEGAL_NODES.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
          <DataHub />
        </div>
      </div>
    </div>
  );
}

export default function Slide51InputDataLegalRights() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            4-1 · 入力情報 総論
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            データに付着しやすい
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${CHAPTER_ACCENT} 0%, #88bbff 100%)`,
              }}
            >
              主な法的権利関係
            </span>
          </h2>
        </div>

        <RightsHubDiagram />
      </motion.div>
    </SlideWrapper>
  );
}
