'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p27: 社内生成AI利用規約のスコープ
 *
 * 各AI サービスの「生成AI利用規約」をファネル（漏斗）に流し込み、
 * その範囲内で抽出されたものが「社内生成AI利用規約」になる、
 * という関係を一瞥で理解できるダイアグラム。
 */

// ─── geometry ────────────────────────────────────────────────────────
const VW = 900;
const VH = 560;
const CX = VW / 2;

const TOP_Y          = 110;
const BOTTOM_Y       = 430;
const TOP_HALF_W     = 320;
const BOTTOM_HALF_W  = 70;

// 入力側の円 — 漏斗の内部に高さをずらしてちりばめる
// Y軸が高い（cy が小さい）順に：
//   1. 生成AI利用規約  2. SaaS利用規約  3. API利用規約  4. その他社内規程
const INPUT_CIRCLES = [
  { cx: CX + 170, cy: 125, r: 50, color: '#c8a8ff', delay: 0.30, lines: ['生成AI',  '利用規約'] },
  { cx: CX - 185, cy: 135, r: 50, color: '#88bbff', delay: 0.40, lines: ['SaaS',    '利用規約'] },
  { cx: CX - 90,  cy: 215, r: 46, color: '#9ee0a8', delay: 0.50, lines: ['API',     '利用規約'] },
  { cx: CX + 105, cy: 235, r: 44, color: '#f7c46c', delay: 0.60, lines: ['その他',  '社内規程'] },
];

// 出力側の円（社内生成AI利用規約）
const OUTPUT_CIRCLE = { cx: CX, cy: 470, r: 88 };

// ─── component ───────────────────────────────────────────────────────
export default function Slide27RulesFunnel() {
  // 漏斗の内側を流れるドット
  const DOTS = useMemo(() => {
    const N = 36;
    return Array.from({ length: N }, (_, i) => {
      const seed = Math.random();
      const palette = ['#88bbff', '#c8a8ff', '#9ee0a8', '#f7c46c'];
      const startX = CX + (seed - 0.5) * 2 * (TOP_HALF_W - 30);
      return {
        id: i,
        startX,
        startY: TOP_Y + 30,
        endX: CX + (Math.random() - 0.5) * (BOTTOM_HALF_W - 10),
        endY: BOTTOM_Y - 6,
        color: palette[i % palette.length],
        duration: 2.2 + Math.random() * 1.0,
        delay: (i / N) * 2.6,
      };
    });
  }, []);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-7xl px-2 py-4 pt-12 gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ── ヘッダー ── */}
        <div className="shrink-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
            >
              Scope of Internal Rules
            </span>
            <div className="flex-1 max-w-[220px] h-px bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.9vw, 40px)' }}
          >
            社内規程の射程は
            <span
              className="bg-clip-text text-transparent ml-1"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #88bbff 0%, #c8a8ff 50%, #ffaacc 100%)',
              }}
            >
              使用するAIの利用規約の範囲内
            </span>
          </h2>
        </div>

        {/* ── SVG ダイアグラム ── */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <filter id="p25-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="p25-soft" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="10" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="p25-funnel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#88bbff" stopOpacity="0.16" />
                <stop offset="55%" stopColor="#c8a8ff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffaacc" stopOpacity="0.04" />
              </linearGradient>
              <radialGradient id="p25-out-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  stopColor="#ffaacc" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffaacc" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── 漏斗本体 ── */}
            {/* 内側塗り（台形） */}
            <motion.path
              d={`M ${CX - TOP_HALF_W} ${TOP_Y}
                  L ${CX + TOP_HALF_W} ${TOP_Y}
                  L ${CX + BOTTOM_HALF_W} ${BOTTOM_Y}
                  L ${CX - BOTTOM_HALF_W} ${BOTTOM_Y} Z`}
              fill="url(#p25-funnel)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            {/* 左斜面 */}
            <motion.line
              x1={CX - TOP_HALF_W} y1={TOP_Y}
              x2={CX - BOTTOM_HALF_W} y2={BOTTOM_Y}
              stroke="rgba(136,187,255,0.6)"
              strokeWidth={1.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* 右斜面 */}
            <motion.line
              x1={CX + TOP_HALF_W} y1={TOP_Y}
              x2={CX + BOTTOM_HALF_W} y2={BOTTOM_Y}
              stroke="rgba(136,187,255,0.6)"
              strokeWidth={1.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* 上口（楕円） */}
            <motion.ellipse
              cx={CX} cy={TOP_Y} rx={TOP_HALF_W} ry={36}
              fill="none"
              stroke="rgba(136,187,255,0.55)"
              strokeWidth={1.4}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            />
            <ellipse
              cx={CX} cy={TOP_Y} rx={TOP_HALF_W * 0.7} ry={24}
              fill="none"
              stroke="rgba(136,187,255,0.18)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            {/* 下口（楕円） */}
            <motion.ellipse
              cx={CX} cy={BOTTOM_Y} rx={BOTTOM_HALF_W} ry={14}
              fill="none"
              stroke="rgba(255,170,204,0.85)"
              strokeWidth={1.6}
              filter="url(#p25-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            />

            {/* ── 漏斗内を流れるドット ── */}
            {DOTS.map((d) => (
              <motion.circle
                key={d.id}
                r={2.4}
                fill={d.color}
                opacity={0.85}
                initial={{ cx: d.startX, cy: d.startY, opacity: 0 }}
                animate={{
                  cx: [d.startX, d.endX],
                  cy: [d.startY, d.endY],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: d.duration,
                  delay: d.delay,
                  repeat: Infinity,
                  ease: 'easeIn',
                  times: [0, 0.1, 0.85, 1],
                }}
              />
            ))}

            {/* ── 入力側の円（生成AI利用規約） ── */}
            {INPUT_CIRCLES.map((c, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: c.delay, ease: 'easeOut' }}
                style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
              >
                {/* ぼんやりした外側のグロー */}
                <circle
                  cx={c.cx} cy={c.cy} r={c.r + 18}
                  fill={c.color}
                  opacity={0.07}
                  filter="url(#p25-soft)"
                />
                {/* パルスリング */}
                <motion.circle
                  cx={c.cx} cy={c.cy}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={1.2}
                  animate={{ r: [c.r, c.r + 14], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: i * 0.5,
                  }}
                />
                {/* メイン円 */}
                <circle
                  cx={c.cx} cy={c.cy} r={c.r}
                  fill={`${c.color}22`}
                  stroke={c.color}
                  strokeWidth={1.6}
                />
                {/* ラベル */}
                <text
                  x={c.cx} y={c.cy - 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="sans-serif"
                >
                  {c.lines[0]}
                </text>
                <text
                  x={c.cx} y={c.cy + 14}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="sans-serif"
                >
                  {c.lines[1]}
                </text>
              </motion.g>
            ))}

            {/* ── 出力側の円（社内生成AI利用規約） ── */}
            <motion.g
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.3, ease: 'easeOut' }}
              style={{ transformOrigin: `${OUTPUT_CIRCLE.cx}px ${OUTPUT_CIRCLE.cy}px` }}
            >
              {/* 後光 */}
              <circle
                cx={OUTPUT_CIRCLE.cx} cy={OUTPUT_CIRCLE.cy}
                r={OUTPUT_CIRCLE.r * 2.0}
                fill="url(#p25-out-halo)"
              />
              {/* 二重のパルス */}
              <motion.circle
                cx={OUTPUT_CIRCLE.cx} cy={OUTPUT_CIRCLE.cy}
                fill="none"
                stroke="#ffaacc"
                strokeWidth={1.5}
                animate={{
                  r: [OUTPUT_CIRCLE.r, OUTPUT_CIRCLE.r + 22],
                  opacity: [0.55, 0],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                cx={OUTPUT_CIRCLE.cx} cy={OUTPUT_CIRCLE.cy}
                fill="none"
                stroke="#ffaacc"
                strokeWidth={1.2}
                animate={{
                  r: [OUTPUT_CIRCLE.r, OUTPUT_CIRCLE.r + 16],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 1.2,
                }}
              />
              {/* メイン円 */}
              <circle
                cx={OUTPUT_CIRCLE.cx} cy={OUTPUT_CIRCLE.cy} r={OUTPUT_CIRCLE.r}
                fill="rgba(255,170,204,0.18)"
                stroke="#ffaacc"
                strokeWidth={2}
                filter="url(#p25-glow)"
              />
              {/* 中心のハイライト */}
              <circle
                cx={OUTPUT_CIRCLE.cx} cy={OUTPUT_CIRCLE.cy} r={OUTPUT_CIRCLE.r * 0.35}
                fill="rgba(255,255,255,0.12)"
              />
              {/* ラベル */}
              <text
                x={OUTPUT_CIRCLE.cx} y={OUTPUT_CIRCLE.cy - 10}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={18}
                fontWeight={800}
                fontFamily="sans-serif"
              >
                社内
              </text>
              <text
                x={OUTPUT_CIRCLE.cx} y={OUTPUT_CIRCLE.cy + 12}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={17}
                fontWeight={700}
                fontFamily="sans-serif"
              >
                生成AI利用規約
              </text>
            </motion.g>

            {/* ── 軸ラベル ── */}
            <motion.text
              x={CX - TOP_HALF_W - 18} y={TOP_Y - 6}
              textAnchor="end"
              fill="rgba(255,255,255,0.55)"
              fontSize={11}
              fontWeight={700}
              fontFamily="sans-serif"
              letterSpacing="0.32em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              OUTER FRAME
            </motion.text>
            <motion.text
              x={CX - TOP_HALF_W - 18} y={TOP_Y + 14}
              textAnchor="end"
              fill="rgba(255,255,255,0.85)"
              fontSize={14}
              fontWeight={700}
              fontFamily="sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              外郭
            </motion.text>
            <motion.text
              x={CX - TOP_HALF_W - 18} y={TOP_Y + 32}
              textAnchor="end"
              fill="rgba(255,255,255,0.40)"
              fontSize={10}
              fontFamily="sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              各AIサービスの規約
            </motion.text>

            <motion.text
              x={CX + BOTTOM_HALF_W + 24} y={OUTPUT_CIRCLE.cy - 14}
              textAnchor="start"
              fill="rgba(255,170,204,0.85)"
              fontSize={11}
              fontWeight={700}
              fontFamily="sans-serif"
              letterSpacing="0.32em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              CORE
            </motion.text>
            <motion.text
              x={CX + BOTTOM_HALF_W + 24} y={OUTPUT_CIRCLE.cy + 6}
              textAnchor="start"
              fill="rgba(255,255,255,0.85)"
              fontSize={14}
              fontWeight={700}
              fontFamily="sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
            >
              中核
            </motion.text>
            <motion.text
              x={CX + BOTTOM_HALF_W + 24} y={OUTPUT_CIRCLE.cy + 24}
              textAnchor="start"
              fill="rgba(255,255,255,0.40)"
              fontSize={10}
              fontFamily="sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              抽出された社内向け規程
            </motion.text>
          </svg>
        </div>

      </motion.div>
    </SlideWrapper>
  );
}
