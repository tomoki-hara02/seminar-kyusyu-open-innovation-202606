'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p21: 持続可能性 — 崩壊の具体例 × 果実分配の必要性
 *
 * 左: インフルエンサー推薦動画を安易に生成しようとするチャット（持続可能性の崩壊）
 * 右: 生成AIの果実を組織全体に行き渡らせる仕組み（果実分配）
 */

// ─── チャット ───────────────────────────────────────────────────────────────

const PROMPT = 'わが社の製品を有名インフルエンサー（仮: 山田太郎さん）が推薦している動画を作って。';
const TOKENS = [
  '承知しました。', '\n\n',
  '山田太郎さんが', '貴社の新商品「PRO-X」を', '\n',
  '手に取って', '笑顔で紹介する', '\n',
  '15秒の縦型動画', 'を生成します…', '\n\n',
  '[generating: ', 'endorsement_v01.mp4', ']',
];
const TOKEN_MS  = 55;
const PROMPT_MS = 28;

function useTypewriter(text: string, ms: number, start: boolean) {
  const [out, setOut] = useState('');
  const [prev, setPrev] = useState({ text, start });
  if (prev.text !== text || prev.start !== start) {
    setPrev({ text, start });
    setOut('');
  }
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [text, ms, start]);
  return out;
}

function useTokenStream(tokens: string[], ms: number, start: boolean) {
  const [count, setCount] = useState(0);
  const [prev, setPrev] = useState({ tokens, start });
  if (prev.tokens !== tokens || prev.start !== start) {
    setPrev({ tokens, start });
    setCount(0);
  }
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= tokens.length) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [tokens, ms, start]);
  return tokens.slice(0, count).join('');
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-white/65"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -1.5, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function InfluencerChatColumn() {
  const accent = '#ff7aa8';
  const [phase, setPhase] = useState<'idle' | 'prompt' | 'thinking' | 'answer'>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase('prompt'), 300);
    return () => clearTimeout(t);
  }, []);

  const promptText = useTypewriter(PROMPT, PROMPT_MS, phase === 'prompt');
  const promptDone = phase !== 'idle' && promptText.length === PROMPT.length;

  useEffect(() => {
    if (!promptDone || phase !== 'prompt') return;
    const t1 = setTimeout(() => setPhase('thinking'), 500);
    const t2 = setTimeout(() => setPhase('answer'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [promptDone, phase]);

  const answerText = useTokenStream(TOKENS, TOKEN_MS, phase === 'answer');
  const fullAnswer = TOKENS.join('');

  return (
    <motion.div
      className="flex flex-col gap-3 min-h-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: accent }}>
          Infringement
        </span>
        <span className="text-[10px] tracking-widest text-white/40">·</span>
        <span className="text-[11px] font-bold text-white/85 tracking-tight">
          安易な依頼に潜む権利侵害
        </span>
      </div>

      <h3
        className="font-bold tracking-tight leading-tight"
        style={{ color: `${accent}f0`, fontSize: 'clamp(14px, 1.35vw, 18px)' }}
      >
        社会基盤（民主主義など）の持続可能性の崩壊
      </h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] tracking-[0.18em] uppercase text-white/30">You</span>
        <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3">
          <p className="text-[12.5px] leading-relaxed text-white/85 font-mono min-h-[1.5em]">
            {phase === 'prompt' || phase === 'idle' ? promptText : PROMPT}
            {phase === 'prompt' && !promptDone && (
              <motion.span
                className="inline-block w-[2px] h-[1em] bg-white/70 align-middle ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {(phase === 'thinking' || phase === 'answer') && (
          <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <span className="text-[9px] tracking-[0.18em] uppercase text-white/30">AI</span>
            </div>
            <div
              className="relative rounded-2xl rounded-tl-sm border px-4 py-3 overflow-hidden"
              style={{
                borderColor: `${accent}33`,
                background: `linear-gradient(160deg, ${accent}0d 0%, rgba(255,255,255,0.02) 60%)`,
              }}
            >
              {phase === 'thinking' && (
                <div className="flex items-center gap-2.5">
                  <ThinkingDots />
                  <span className="text-[11px] text-white/40 tracking-wider">動画生成中…</span>
                </div>
              )}
              {phase === 'answer' && (
                <p className="text-[12.5px] leading-relaxed text-white/90 font-mono whitespace-pre-wrap" style={{ minHeight: '6em' }}>
                  {answerText}
                  {answerText.length < fullAnswer.length && (
                    <motion.span
                      className="inline-block w-[2px] h-[1em] align-middle ml-0.5"
                      style={{ background: accent }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── 右: 果実分配パネル ───────────────────────────────────────────────────────

type DistNode = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  /** ラベルの配置方向 */
  labelPos: 'above' | 'below' | 'left' | 'right';
  delay: number;
};

const HUB = { x: 160, y: 152, r: 34 };

const DIST_NODES: DistNode[] = [
  { id: 'emp',   label: '従業員', color: '#88bbff', x: 160, y: 52,  labelPos: 'above', delay: 0.2 },
  { id: 'cust',  label: '顧客',   color: '#c4aeff', x: 248, y: 92,  labelPos: 'right', delay: 0.35 },
  { id: 'mgmt',  label: '経営者', color: '#ffaacc', x: 248, y: 212, labelPos: 'right', delay: 0.5 },
  { id: 'sys',   label: 'システム', color: '#9ee0a8', x: 160, y: 252, labelPos: 'below', delay: 0.65 },
  { id: 'other', label: '関係者', color: '#fbbf24', x: 72,  y: 152, labelPos: 'left',  delay: 0.8 },
];

function nodeLabelCoords(n: DistNode) {
  const pad = 16;
  switch (n.labelPos) {
    case 'above':
      return { x: n.x, y: n.y - pad, anchor: 'middle' as const };
    case 'below':
      return { x: n.x, y: n.y + pad + 4, anchor: 'middle' as const };
    case 'left':
      return { x: n.x - pad, y: n.y + 4, anchor: 'end' as const };
    case 'right':
      return { x: n.x + pad, y: n.y + 4, anchor: 'start' as const };
  }
}

function DistributionDiagram() {
  return (
    <div className="relative w-full h-full min-h-[300px]">
      <svg viewBox="10 20 300 272" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        {DIST_NODES.map((n) => (
          <motion.line
            key={`line-${n.id}`}
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
            stroke={n.color}
            strokeWidth="1.2"
            strokeOpacity={0.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: n.delay, ease: 'easeOut' }}
          />
        ))}

        {DIST_NODES.map((n) => (
          <motion.circle
            key={`flow-${n.id}`}
            r="1.8"
            fill={n.color}
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: n.delay + 0.6, ease: 'linear' }}
            style={{ offsetPath: `path('M${HUB.x} ${HUB.y} L${n.x} ${n.y}')` }}
          />
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        >
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 10} fill="none" stroke="white" strokeOpacity={0.1} strokeWidth="1" />
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="url(#distHubGrad)" stroke="#88e0d8" strokeOpacity={0.6} strokeWidth="1.2" />
          <text x={HUB.x} y={HUB.y + 5} fill="white" textAnchor="middle" fontSize="14" fontWeight="700">AI</text>
        </motion.g>

        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={HUB.r}
          fill="none"
          stroke="#88e0d8"
          strokeOpacity={0.35}
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1.35, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        />

        <defs>
          <radialGradient id="distHubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#88e0d8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#88e0d8" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {DIST_NODES.map((n) => {
          const { x: tx, y: ty, anchor } = nodeLabelCoords(n);
          return (
          <motion.g
            key={`node-${n.id}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: n.delay + 0.15, ease: 'easeOut' }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="10" fill={`${n.color}22`} stroke={n.color} strokeWidth="1.2" />
            <circle cx={n.x} cy={n.y} r="2.8" fill={n.color} />
            <text
              x={tx}
              y={ty}
              fill="white"
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="700"
            >
              {n.label}
            </text>
          </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

function FruitDistributionPanel() {
  return (
    <motion.div
      className="flex flex-col gap-2 min-h-0 flex-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#88e0d8', boxShadow: '0 0 8px #88e0d8' }} />
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: '#88e0d8' }}>
          Distribution
        </span>
        <span className="text-[10px] tracking-widest text-white/40">·</span>
        <span className="text-[11px] font-bold text-white/85 tracking-tight">
          果実の分配
        </span>
      </div>

      <h3
        className="font-bold tracking-tight leading-tight"
        style={{ color: '#88e0d8f0', fontSize: 'clamp(14px, 1.35vw, 18px)' }}
      >
        生成AIの果実分配
      </h3>

      <div className="flex-1 min-h-0 w-full">
        <DistributionDiagram />
      </div>
    </motion.div>
  );
}

// ─── スライド本体 ──────────────────────────────────────────────────────────

export default function Slide21RightsNetwork() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-6xl h-full px-2 py-6 pt-14 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#ff7aa8]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Principle 03 · Sustainability の具体化
            </span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#88e0d8]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            崩壊の具体例と、
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #ff7aa8 0%, #88e0d8 100%)' }}
            >
              果実分配の設計
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          <InfluencerChatColumn />
          <FruitDistributionPanel />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
