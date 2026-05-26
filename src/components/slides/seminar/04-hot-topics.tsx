'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

const VW = 600;
const VH = 500;
const CX = VW / 2;
const CY = VH / 2 + 10;

type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  r: number;
  hub?: boolean;
  color?: string;
};

const NODES: Node[] = [
  { id: 'core',   label: '生成AI',      x: CX,       y: CY,       r: 42, hub: true },
  { id: 'word',   label: 'Word',        sub: '文書作成',             x: CX - 55,  y: CY - 170, r: 27, color: '#88bbff' },
  { id: 'excel',  label: 'Excel',       sub: '集計・分析',           x: CX + 90,  y: CY - 185, r: 27, color: '#9ee0a8' },
  { id: 'email',  label: 'メール',       sub: '返信・作成',           x: CX - 235, y: CY - 65,  r: 25, color: '#c8a8ff' },
  { id: 'ppt',    label: 'PowerPoint', sub: '資料作成',             x: CX - 210, y: CY + 90,  r: 25, color: '#ffaacc' },
  { id: 'web',    label: 'Webサイト',   sub: '文章・更新',           x: CX + 220, y: CY - 65,  r: 25, color: '#88bbff' },
  { id: 'sns',    label: 'SNS',         sub: '投稿・運用',           x: CX + 200, y: CY + 95,  r: 25, color: '#f7c46c' },
  { id: 'search', label: 'リサーチ',    sub: '情報収集',             x: CX - 75,  y: CY + 175, r: 23, color: '#c8a8ff' },
  { id: 'chat',   label: 'チャット',    sub: '社内コミュニケーション', x: CX + 85,  y: CY + 180, r: 23, color: '#88bbff' },
];

type Edge = { from: string; to: string };

const EDGES: Edge[] = [
  { from: 'core', to: 'word' },
  { from: 'core', to: 'excel' },
  { from: 'core', to: 'email' },
  { from: 'core', to: 'ppt' },
  { from: 'core', to: 'web' },
  { from: 'core', to: 'sns' },
  { from: 'core', to: 'search' },
  { from: 'core', to: 'chat' },
  { from: 'word',   to: 'email' },
  { from: 'word',   to: 'ppt' },
  { from: 'excel',  to: 'web' },
  { from: 'search', to: 'chat' },
];

const KEYWORDS = [
  {
    term: 'Agent機能',
    accent: '#88bbff',
    body: '「ReAct（Reasoning and Acting）」などのフレームワークが使われます。AIに「[思考] ➔ [行動] ➔ [観察]」というサイクルをプログラミングでぐるぐる回させ、ゴールに達するまでAI自身に自問自答を繰り返させます。',
  },
  {
    term: 'MCP（モデル・コンテキスト・プロトコル）',
    accent: '#c8a8ff',
    body: 'Anthropic社などが提唱したMCP（Model Context Protocol）は、AIと外部を繋ぐ「ユニバーサルデザイン（共通規格）」です。USBやコンセントの穴が世界中で統一されているような状態を作ります。',
  },
];

export default function Slide04HotTopics() {
  const byId = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    []
  );

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-6xl px-2 py-5 gap-3 pt-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ── タイトル ── */}
        <div className="shrink-0">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Hot Topics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            近時の
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #c8a8ff 0%, #88bbff 50%, #4F8EF7 100%)',
              }}
            >
              生成AIのホットトピック
            </span>
          </h2>
        </div>

        {/* ── メイン行：グラフ ＋ キーワードカード ── */}
        <div className="flex flex-row flex-1 min-h-0 gap-6 items-stretch">

          {/* 左：グラフ */}
          <div className="flex-1 min-w-0 flex flex-col">
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="p4-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="p4-soft" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="7" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="p4-core-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#88bbff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {EDGES.map((e, i) => {
                const a = byId[e.from];
                const b = byId[e.to];
                const length = Math.hypot(b.x - a.x, b.y - a.y);
                return (
                  <g key={`${e.from}-${e.to}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
                    <motion.line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={byId[e.to].color ?? '#88bbff'}
                      strokeWidth={1.5}
                      strokeDasharray={`${length * 0.18} ${length}`}
                      initial={{ strokeDashoffset: length }}
                      animate={{ strokeDashoffset: -length }}
                      transition={{ duration: 3.5, delay: 0.4 + i * 0.07, repeat: Infinity, ease: 'linear' }}
                      filter="url(#p4-glow)"
                      opacity={0.8}
                    />
                  </g>
                );
              })}

              {NODES.map((n, i) => (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                >
                  {n.hub && (
                    <circle cx={n.x} cy={n.y} r={n.r + 26} fill="url(#p4-core-grad)" opacity={0.5} />
                  )}
                  <motion.circle
                    cx={n.x} cy={n.y} r={n.r}
                    fill="none"
                    stroke={n.hub ? '#88bbff' : (n.color ?? 'rgba(200,180,255,0.4)')}
                    strokeWidth={n.hub ? 1.4 : 1}
                    animate={{ r: [n.r, n.r + 8], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.15 }}
                  />
                  <circle
                    cx={n.x} cy={n.y} r={n.r}
                    fill={n.hub ? '#0e1838' : 'rgba(15,20,40,0.88)'}
                    stroke={n.hub ? '#88bbff' : (n.color ? n.color + '55' : 'rgba(255,255,255,0.18)')}
                    strokeWidth={n.hub ? 1.8 : 1.2}
                    filter={n.hub ? 'url(#p4-soft)' : undefined}
                  />
                  <circle cx={n.x} cy={n.y} r={n.hub ? 5 : 3} fill={n.hub ? '#ffffff' : (n.color ?? '#c8a8ff')} />
                  {n.hub && (
                    <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={700} fontFamily="sans-serif">
                      {n.label}
                    </text>
                  )}
                  {!n.hub && (
                    <>
                      <text x={n.x} y={n.y + n.r + 16} textAnchor="middle" fill={n.color ?? 'rgba(255,255,255,0.85)'} fontSize={11} fontWeight={600} fontFamily="sans-serif">
                        {n.label}
                      </text>
                      {n.sub && (
                        <text x={n.x} y={n.y + n.r + 29} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9} fontFamily="sans-serif" letterSpacing="0.04em">
                          {n.sub}
                        </text>
                      )}
                    </>
                  )}
                </motion.g>
              ))}
            </svg>
          </div>

          {/* 右：キーワードカード */}
          <div className="flex flex-col gap-4 w-80 shrink-0 justify-center">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/30">
              Related Keywords
            </p>
            {KEYWORDS.map((kw, i) => (
              <motion.div
                key={kw.term}
                className="flex flex-col gap-3 rounded-2xl border border-white/15 p-6"
                style={{
                  background: `linear-gradient(135deg, ${kw.accent}18 0%, transparent 100%)`,
                  boxShadow: `0 24px 48px -16px rgba(0,0,0,0.5), 0 0 50px -10px ${kw.accent}33`,
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.5 + i * 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: kw.accent }} />
                  <span className="text-sm font-bold leading-snug" style={{ color: kw.accent }}>
                    {kw.term}
                  </span>
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  {kw.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── サブタイトル ── */}
        <p className="shrink-0 text-base md:text-lg font-medium tracking-wide text-center text-white/70">
          PC作業については、
          <span
            className="bg-clip-text text-transparent font-bold"
            style={{ backgroundImage: 'linear-gradient(90deg, #ffaacc 0%, #c8a8ff 50%, #88bbff 100%)' }}
          >
            ほぼ全てAIで操作できる段階
          </span>
          に来ている
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
