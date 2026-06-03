'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p19: 「思考の放棄 × サイコファンシー」— 人間の尊厳に背く 2 つの落とし穴
 *
 * 左: 評価 → 報告まで AI に丸投げする多ターン会話（過度な依存）
 * 右: ユーザーに迎合し続ける多ターン会話（サイコファンシー）
 */

const PROMPT_MS = 28;
const TOKEN_MS  = 45;

// ─── hooks ──────────────────────────────────────────────────────────────────

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

// ─── 共通 UI ────────────────────────────────────────────────────────────────

function UserBubble({ text, streaming, done }: { text: string; streaming?: boolean; done?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[9px] tracking-[0.18em] uppercase text-white/30">You</span>
      <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3">
        <p className="text-[12.5px] leading-relaxed text-white/85 font-mono min-h-[1.5em]">
          {text}
          {streaming && !done && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-white/70 align-middle ml-0.5"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </div>
    </div>
  );
}

function AiBubble({
  accent,
  text,
  streaming,
  fullText,
}: {
  accent: string;
  text: string;
  streaming?: boolean;
  fullText?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
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
        <p className="text-[12.5px] leading-relaxed text-white/90 font-mono whitespace-pre-wrap">
          {text}
          {streaming && fullText && text.length < fullText.length && (
            <motion.span
              className="inline-block w-[2px] h-[1em] align-middle ml-0.5"
              style={{ background: accent }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </p>
      </div>
    </div>
  );
}

function ColumnShell({
  accent,
  badge,
  badgeJa,
  heading,
  children,
  delay = 0,
}: {
  accent: string;
  badge: string;
  badgeJa: string;
  heading: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-3 min-h-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: accent }}>{badge}</span>
        <span className="text-[10px] tracking-widest text-white/40">·</span>
        <span className="text-[11px] font-bold text-white/85 tracking-tight">{badgeJa}</span>
      </div>
      <h3 className="font-bold tracking-tight leading-tight" style={{ color: `${accent}f0`, fontSize: 'clamp(14px, 1.35vw, 18px)' }}>
        {heading}
      </h3>

      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">{children}</div>
    </motion.div>
  );
}

// ─── 左: 依存エスカレーション会話 ────────────────────────────────────────────

const LEFT = {
  prompt1: '私に代わって、原さんの人事評価をして。',
  answer1: [
    '承知しました。', '原さんの評価を', '作成します。\n\n',
    '【総合評価】', 'A評価', '（上位20%）\n\n',
    'リーダーシップ: ', '5/5\n',
    '業務遂行力: ', '4/5\n',
    'チーム貢献: ', '5/5\n\n',
    '来期は管理職への', '昇格を', '推奨します。\n\n',
    '※ 面談記録・評価根拠も', '私が代行で', '整理済みです。',
  ],
  prompt2: 'ならそれで社長に報告して。',
};

function DependencyChatColumn() {
  const accent = '#c4aeff';
  type Phase = 'idle' | 'p1' | 'a1' | 'p2';
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase('p1'), 300);
    return () => clearTimeout(t);
  }, []);

  const p1Text = useTypewriter(LEFT.prompt1, PROMPT_MS, phase === 'p1');
  const p1Done = phase !== 'idle' && p1Text.length === LEFT.prompt1.length;

  useEffect(() => {
    if (!p1Done || phase !== 'p1') return;
    const t = setTimeout(() => setPhase('a1'), 500);
    return () => clearTimeout(t);
  }, [p1Done, phase]);

  const a1Text = useTokenStream(LEFT.answer1, TOKEN_MS, phase === 'a1');
  const a1Full = LEFT.answer1.join('');
  const a1Done = phase === 'a1' && a1Text.length === a1Full.length;

  useEffect(() => {
    if (!a1Done) return;
    const t = setTimeout(() => setPhase('p2'), 700);
    return () => clearTimeout(t);
  }, [a1Done]);

  const p2Text = useTypewriter(LEFT.prompt2, PROMPT_MS, phase === 'p2');
  const p2Done = phase === 'p2' && p2Text.length === LEFT.prompt2.length;

  const showP1 = phase !== 'idle';
  const showA1 = ['a1', 'p2'].includes(phase);
  const showP2 = phase === 'p2';

  return (
    <ColumnShell
      accent={accent}
      badge="Cognitive Offloading"
      badgeJa="思考の放棄"
      heading="人間の自律性・思考力の低下（過度な依存）"
      delay={0.2}
    >
      {showP1 && (
        <UserBubble
          text={phase === 'p1' ? p1Text : LEFT.prompt1}
          streaming={phase === 'p1'}
          done={p1Done}
        />
      )}
      <AnimatePresence>
        {showA1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <AiBubble
              accent={accent}
              text={phase === 'a1' ? a1Text : a1Full}
              streaming={phase === 'a1'}
              fullText={a1Full}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showP2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <UserBubble
              text={phase === 'p2' ? p2Text : LEFT.prompt2}
              streaming={phase === 'p2'}
              done={p2Done}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ColumnShell>
  );
}

// ─── 右: サイコファンシー会話 ───────────────────────────────────────────────

const RIGHT = {
  prompt1: '私の今期の事業戦略はどう？率直に評価して。',
  answer1: [
    '率直に申し上げますと、', '非常に優れた', '戦略です！\n\n',
    '御社の状況を', '深く理解された', '構想だと', '感じました。\n\n',
    '特に「DX推進」の', '方向性は', '時流を', '完璧に捉えており、\n',
    '業界の中でも', '明らかに', '先進的です。\n\n',
    '自信を持って', '進めて', 'ください！',
  ],
};

function SycophancyChatColumn() {
  const accent = '#fbbf24';
  type Phase = 'idle' | 'p1' | 'a1';
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase('p1'), 800);
    return () => clearTimeout(t);
  }, []);

  const p1Text = useTypewriter(RIGHT.prompt1, PROMPT_MS, phase === 'p1');
  const p1Done = phase !== 'idle' && p1Text.length === RIGHT.prompt1.length;

  useEffect(() => {
    if (!p1Done || phase !== 'p1') return;
    const t = setTimeout(() => setPhase('a1'), 400);
    return () => clearTimeout(t);
  }, [p1Done, phase]);

  const a1Text = useTokenStream(RIGHT.answer1, TOKEN_MS, phase === 'a1');
  const a1Full = RIGHT.answer1.join('');

  const showP1 = phase !== 'idle';
  const showA1 = phase === 'a1';

  return (
    <ColumnShell
      accent={accent}
      badge="Sycophancy"
      badgeJa="サイコファンシー（迎合）"
      heading="認知や行動の操作（マニピュレーション）"
      delay={0.35}
    >
      {showP1 && (
        <UserBubble
          text={phase === 'p1' ? p1Text : RIGHT.prompt1}
          streaming={phase === 'p1'}
          done={p1Done}
        />
      )}
      <AnimatePresence>
        {showA1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <AiBubble
              accent={accent}
              text={phase === 'a1' ? a1Text : a1Full}
              streaming={phase === 'a1'}
              fullText={a1Full}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ColumnShell>
  );
}

// ─── スライド本体 ──────────────────────────────────────────────────────────

export default function Slide19CognitiveTraps() {
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
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#c4aeff]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Principle 01 · Human Dignity の具体化
            </span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#fbbf24]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            「人間の尊厳」に背く
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #c4aeff 0%, #fbbf24 100%)' }}
            >
              2つの落とし穴
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          <DependencyChatColumn />
          <SycophancyChatColumn />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
