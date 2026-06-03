'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p44: 3-1 ツール総論 — 生成AIツール分析の視点
 *
 * ギミック参照:
 * - `templates/LayeredArch.tsx` … 4視点のレイヤーカード
 * - `templates/TechStack.tsx` … モデル名チップ
 * - `templates/BeforeAfter.tsx` … 個人 / 法人プラン対比
 * - `templates/WorldMap.tsx` … データレジデンシー（サーバー所在地）
 */

const PERSPECTIVES = [
  {
    num: '01',
    title: 'どのモデルを使用しているか',
    sub: 'GPT · Sonnet · Gemini など',
    accent: '#c8a8ff',
  },
  {
    num: '02',
    title: '個人プランと法人プランの違い',
    sub: '利用規約の範囲・責任分界',
    accent: '#a98aea',
  },
  {
    num: '03',
    title: 'データのレジデンシー',
    sub: '処理サーバーの所在地',
    accent: '#88bbff',
  },
  {
    num: '04',
    title: 'サービスに責任を持つ主体',
    sub: '国内か外国か',
    accent: '#60a5fa',
  },
];

const MODELS = ['GPT', 'Sonnet', 'Gemini'];

const SERVER_REGIONS = [
  { label: 'US', x: 22, y: 18, accent: '#88bbff' },
  { label: 'EU', x: 48, y: 14, accent: '#c8a8ff' },
  { label: 'JP', x: 78, y: 17, accent: '#ffaacc' },
];

const DATA_LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
];

function ModelsVisual({ accent }: { accent: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 w-full">
      {MODELS.map((model, i) => (
        <motion.span
          key={model}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border"
          style={{
            color: accent,
            borderColor: `${accent}66`,
            background: `${accent}14`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.35 + i * 0.08 }}
          whileHover={{
            background: `${accent}28`,
            boxShadow: `0 0 16px ${accent}44`,
          }}
        >
          {model}
        </motion.span>
      ))}
    </div>
  );
}

function PlansVisual() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 w-full px-1">
      {[
        { label: '個人', sub: 'Consumer ToS', accent: '#ffaacc' },
        { label: '法人', sub: 'Enterprise ToS', accent: '#88bbff' },
      ].map((plan, i) => (
        <motion.div
          key={plan.label}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center min-w-0"
          style={{
            borderColor: `${plan.accent}44`,
            background: `${plan.accent}10`,
            gridColumn: i === 0 ? 1 : 3,
          }}
          initial={{ opacity: 0, x: i === 0 ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
        >
          <span
            className="font-bold text-white"
            style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
          >
            {plan.label}
          </span>
          <span
            className="text-white/45 leading-none"
            style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}
          >
            {plan.sub}
          </span>
        </motion.div>
      ))}
      <motion.span
        className="text-white/35 text-lg"
        style={{ gridColumn: 2 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        ⇄
      </motion.span>
    </div>
  );
}

function ResidencyVisual({ accent }: { accent: string }) {
  const dots = useMemo(() => {
    const out: { x: number; y: number; o: number }[] = [];
    const COLS = 28;
    const ROWS = 14;
    for (let yi = 0; yi < ROWS; yi += 1) {
      for (let xi = 0; xi < COLS; xi += 1) {
        const x = (xi + 0.5) * (100 / COLS);
        const y = (yi + 0.5) * (50 / ROWS);
        const dx = (x - 50) / 50;
        const dy = (y - 25) / 25;
        if (Math.hypot(dx * 0.95, dy) > 1) continue;
        const seed = (((xi * 73 + yi * 137 + 11) * 9301) % 233280) / 233280;
        if (seed > 0.52) continue;
        out.push({ x, y, o: 0.1 + seed * 0.35 });
      }
    }
    return out;
  }, []);

  const arcs = useMemo(
    () =>
      DATA_LINKS.map(([a, b]) => {
        const A = SERVER_REGIONS[a];
        const B = SERVER_REGIONS[b];
        const mx = (A.x + B.x) / 2;
        const my = Math.min(A.y, B.y) - 6;
        return {
          d: `M ${A.x} ${A.y + 2} Q ${mx} ${my} ${B.x} ${B.y + 2}`,
          color: A.accent,
        };
      }),
    []
  );

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 100 50" className="w-full h-24 md:h-28">
        <defs>
          <filter id="residency-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.35} fill="white" opacity={d.o} />
        ))}

        {arcs.map((arc, i) => (
          <g key={arc.d}>
            <path
              d={arc.d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.35}
            />
            <motion.path
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth={0.45}
              strokeOpacity={0.75}
              filter="url(#residency-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.45 + i * 0.15, ease: 'easeOut' }}
            />
            <motion.path
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth={0.6}
              strokeDasharray="1.2 2.4"
              strokeOpacity={0.9}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -8 }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'linear',
                delay: 1 + i * 0.2,
              }}
            />
          </g>
        ))}

        {SERVER_REGIONS.map((region, i) => (
          <g key={region.label}>
            <motion.rect
              x={region.x - 3.2}
              y={region.y - 1}
              width={6.4}
              height={4.2}
              rx={0.6}
              fill={`${region.accent}22`}
              stroke={region.accent}
              strokeWidth={0.35}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              style={{ transformOrigin: `${region.x}px ${region.y + 1}px` }}
            />
            <motion.circle
              cx={region.x}
              cy={region.y + 6}
              r={1.2}
              fill={region.accent}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
            />
            <motion.circle
              cx={region.x}
              cy={region.y + 1}
              r={2.5}
              fill="none"
              stroke={region.accent}
              strokeWidth={0.35}
              animate={{ r: [2.5, 6], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeOut' }}
            />
            <text
              x={region.x}
              y={region.y + 11}
              textAnchor="middle"
              fill="rgba(255,255,255,0.72)"
              fontSize="3.2"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              {region.label}
            </text>
            <text
              x={region.x}
              y={region.y + 15}
              textAnchor="middle"
              fill="rgba(255,255,255,0.38)"
              fontSize="2.4"
              fontFamily="sans-serif"
            >
              Server
            </text>
          </g>
        ))}
      </svg>
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.18em] uppercase whitespace-nowrap"
        style={{ color: `${accent}bb` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Where is your data processed?
      </motion.span>
    </div>
  );
}

function EntityVisual() {
  return (
    <div className="flex items-center justify-center gap-3 w-full">
      {[
        { label: '国内', icon: 'JP', accent: '#ffaacc' },
        { label: '外国', icon: 'Global', accent: '#88bbff' },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border min-w-[5.5rem]"
          style={{
            borderColor: `${item.accent}55`,
            background: `${item.accent}10`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + i * 0.12 }}
        >
          <span
            className="font-mono font-bold tracking-widest"
            style={{ color: item.accent, fontSize: 'clamp(10px, 0.85vw, 12px)' }}
          >
            {item.icon}
          </span>
          <span
            className="text-white/80 font-medium"
            style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PerspectiveVisual({ index, accent }: { index: number; accent: string }) {
  switch (index) {
    case 0:
      return <ModelsVisual accent={accent} />;
    case 1:
      return <PlansVisual />;
    case 2:
      return <ResidencyVisual accent={accent} />;
    default:
      return <EntityVisual />;
  }
}

export default function Slide44ToolAnalysisPerspectives() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-7 md:gap-8 w-full max-w-6xl pt-10 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            3-1 · ツール総論
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            生成AIツール
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #c8a8ff 0%, #88bbff 55%, #60a5fa 100%)',
              }}
            >
              分析の視点
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0">
          {PERSPECTIVES.map((item, i) => (
            <motion.div
              key={item.num}
              className="relative flex flex-col gap-3 p-4 md:p-5 rounded-xl border overflow-hidden min-h-0"
              style={{
                background: `linear-gradient(90deg, ${item.accent}16 0%, rgba(255,255,255,0.03) 65%, transparent 100%)`,
                borderColor: `${item.accent}33`,
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.08 }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: item.accent,
                  boxShadow: `0 0 12px ${item.accent}aa`,
                }}
              />

              <div className="flex items-start gap-3 pl-2 min-w-0">
                <span
                  className="font-mono tabular-nums shrink-0 w-7"
                  style={{ color: item.accent, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
                >
                  {item.num}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3
                    className="font-semibold text-white leading-snug"
                    style={{ fontSize: 'clamp(14px, 1.2vw, 17px)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white/45"
                    style={{ fontSize: 'clamp(11px, 0.9vw, 13px)' }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>

              <div
                className={`rounded-lg border px-3 py-3 flex items-center justify-center ml-2 ${
                  i === 2 ? 'min-h-[7.5rem]' : 'min-h-[5.5rem]'
                }`}
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.16)',
                }}
              >
                <PerspectiveVisual index={i} accent={item.accent} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#c8a8ff]/40 bg-[#c8a8ff]/10 shrink-0">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#c8a8ff]"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#d8c0ff] font-bold">
              Workshop
            </span>
          </span>
          <p
            className="text-white/65 font-medium text-center"
            style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            自身が使用している生成AIを分析してみましょう
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
