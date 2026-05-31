'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p39: 3-4 エージェント・MCPの取扱い — 外部アプリへのデータ送信
 *
 * ベーステンプレート: `templates/WorldMap.tsx`
 */

/** モノトーン + 紫（AI）/ スカイ（入力）/ アンバー（外部送信）の3色 */
const COLORS = {
  ai: '#a78bfa',
  aiSoft: 'rgba(167,139,250,0.18)',
  input: '#67e8f9',
  flow: '#fbbf24',
  node: 'rgba(255,255,255,0.55)',
  nodeRing: 'rgba(255,255,255,0.22)',
  line: 'rgba(255,255,255,0.14)',
} as const;

const AI_HUB = { x: 50, y: 26, label: '生成AI' };
const INPUT_NODE = { x: 11, y: 26, label: '入力情報' };

const EXTERNAL_APPS = [
  { name: 'Web検索', x: 20, y: 12 },
  { name: 'コネクター', x: 42, y: 5 },
  { name: 'MCPサーバー', x: 80, y: 8 },
  { name: 'データベース', x: 86, y: 36 },
  { name: 'Email', x: 24, y: 42 },
];

function arcPath(fromX: number, fromY: number, toX: number, toY: number, bulge = 7): string {
  const mx = (fromX + toX) / 2;
  const my = Math.min(fromY, toY) - bulge;
  return `M ${fromX} ${fromY} Q ${mx} ${my} ${toX} ${toY}`;
}

export default function Slide38McpAgentHandling() {
  const dots = useMemo(() => {
    const out: { x: number; y: number; o: number }[] = [];
    const COLS = 56;
    const ROWS = 28;
    for (let yi = 0; yi < ROWS; yi += 1) {
      for (let xi = 0; xi < COLS; xi += 1) {
        const x = (xi + 0.5) * (100 / COLS);
        const y = (yi + 0.5) * (50 / ROWS);
        const dx = (x - 50) / 50;
        const dy = (y - 25) / 25;
        if (Math.hypot(dx, dy) > 1) continue;
        const seed = (((xi * 73 + yi * 137 + 11) * 9301) % 233280) / 233280;
        if (seed > 0.5) continue;
        out.push({ x, y, o: 0.06 + seed * 0.22 });
      }
    }
    return out;
  }, []);

  const outboundArcs = useMemo(
    () =>
      EXTERNAL_APPS.map((app) => ({
        d: arcPath(AI_HUB.x, AI_HUB.y, app.x, app.y, 5),
        app: app.name,
      })),
    []
  );

  const inputArc = arcPath(INPUT_NODE.x, INPUT_NODE.y, AI_HUB.x, AI_HUB.y, 4);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl pt-10 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            3-4 · エージェント・MCPの取扱い
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            MCP・エージェント
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${COLORS.ai} 0%, ${COLORS.input} 100%)`,
              }}
            >
              の扱い
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed max-w-3xl"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            生成AIが入力情報を処理する過程で、
            <span className="text-amber-300/90 font-medium">外部アプリに入力情報が送信される</span>
            点に注意
          </p>
        </div>

        <div
          className="relative w-full flex-1 min-h-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col"
          style={{ maxHeight: 'min(52vh, 460px)' }}
        >
          <div className="relative flex-1 min-h-0" style={{ aspectRatio: '2 / 1' }}>
          <svg
            viewBox="0 0 100 50"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={0.32} fill="white" opacity={d.o} />
            ))}

            {/* 入力 → 生成AI */}
            <path d={inputArc} fill="none" stroke={COLORS.line} strokeWidth={0.35} />
            <motion.path
              d={inputArc}
              fill="none"
              stroke={COLORS.input}
              strokeWidth={0.4}
              strokeOpacity={0.65}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            />

            {/* 生成AI → 外部アプリ（データ送信） */}
            {outboundArcs.map((arc, i) => (
              <g key={arc.app}>
                <path d={arc.d} fill="none" stroke={COLORS.line} strokeWidth={0.3} />
                <motion.path
                  d={arc.d}
                  fill="none"
                  stroke={COLORS.flow}
                  strokeWidth={0.38}
                  strokeOpacity={0.45}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                />
                <motion.path
                  d={arc.d}
                  fill="none"
                  stroke={COLORS.flow}
                  strokeWidth={0.42}
                  strokeDasharray="1 2.2"
                  strokeOpacity={0.75}
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -8 }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.8 + i * 0.15,
                  }}
                />
              </g>
            ))}

            {/* 入力情報ノード */}
            <g>
              <motion.circle
                cx={INPUT_NODE.x}
                cy={INPUT_NODE.y}
                r={2.4}
                fill="rgba(103,232,249,0.12)"
                stroke={COLORS.input}
                strokeWidth={0.4}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                style={{ transformOrigin: `${INPUT_NODE.x}px ${INPUT_NODE.y}px` }}
              />
              <motion.circle
                cx={INPUT_NODE.x}
                cy={INPUT_NODE.y}
                r={0.9}
                fill={COLORS.input}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, delay: 0.25 }}
                style={{ transformOrigin: `${INPUT_NODE.x}px ${INPUT_NODE.y}px` }}
              />
              <text
                x={INPUT_NODE.x}
                y={INPUT_NODE.y + 6}
                textAnchor="middle"
                fill="rgba(255,255,255,0.62)"
                fontSize="2.4"
                fontWeight="500"
                fontFamily="sans-serif"
              >
                {INPUT_NODE.label}
              </text>
            </g>

            {/* 生成AI ハブ */}
            <g>
              <motion.circle
                cx={AI_HUB.x}
                cy={AI_HUB.y}
                r={4.8}
                fill={COLORS.aiSoft}
                stroke={COLORS.ai}
                strokeWidth={0.45}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35, type: 'spring', stiffness: 180 }}
                style={{ transformOrigin: `${AI_HUB.x}px ${AI_HUB.y}px` }}
              />
              <motion.circle
                cx={AI_HUB.x}
                cy={AI_HUB.y}
                r={4.8}
                fill="none"
                stroke={COLORS.ai}
                strokeWidth={0.3}
                animate={{ r: [4.8, 7.5], opacity: [0.35, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformOrigin: `${AI_HUB.x}px ${AI_HUB.y}px` }}
              />
              <text
                x={AI_HUB.x}
                y={AI_HUB.y + 0.8}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="2.6"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                {AI_HUB.label}
              </text>
              <text
                x={AI_HUB.x}
                y={AI_HUB.y + 9}
                textAnchor="middle"
                fill="rgba(167,139,250,0.7)"
                fontSize="2"
                fontFamily="sans-serif"
              >
                Agent / MCP
              </text>
            </g>

            {/* 外部アプリノード */}
            {EXTERNAL_APPS.map((app, i) => (
              <g key={app.name}>
                <motion.circle
                  cx={app.x}
                  cy={app.y}
                  r={2}
                  fill="rgba(255,255,255,0.04)"
                  stroke={COLORS.nodeRing}
                  strokeWidth={0.35}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.08 }}
                  style={{ transformOrigin: `${app.x}px ${app.y}px` }}
                />
                <motion.circle
                  cx={app.x}
                  cy={app.y}
                  r={0.65}
                  fill={COLORS.node}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.08 }}
                  style={{ transformOrigin: `${app.x}px ${app.y}px` }}
                />
                <motion.circle
                  cx={app.x}
                  cy={app.y}
                  r={2}
                  fill="none"
                  stroke={COLORS.flow}
                  strokeWidth={0.25}
                  animate={{ r: [2, 4.2], opacity: [0.35, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${app.x}px ${app.y}px` }}
                />
                <motion.text
                  x={app.x}
                  y={app.y - 3.4}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="1.75"
                  fontWeight="500"
                  fontFamily="sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  {app.name}
                </motion.text>
              </g>
            ))}
          </svg>
          </div>

          <motion.div
            className="shrink-0 px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p
              className="text-white/55 leading-relaxed text-center max-w-4xl mx-auto"
              style={{ fontSize: 'clamp(11px, 0.95vw, 14px)' }}
            >
              防音の会議室（
              <span className="text-violet-300/85">AI本体</span>
              ）で秘密話をしていても、AIが窓を開けて外の通行人（
              <span className="text-amber-300/90">ウェブ検索</span>
              ）に大声で質問したら、
              <span className="text-amber-300/90 font-medium">情報は筒抜けになる</span>
              のと同じ
            </p>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
