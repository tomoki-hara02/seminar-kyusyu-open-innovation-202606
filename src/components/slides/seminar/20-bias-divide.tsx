'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p20a2: 「バイアス × AIディバイド」— 多様性・包摂に背く 2 つの落とし穴
 *
 * 左: モデルが学習した偏見をそのまま出力するケース（弁護士＝男性のデフォルト）
 * 右: AIを使いこなす層と取り残される層の格差が時間とともに拡大していくモーション
 */

// ─── 左: バイアスチャット ──────────────────────────────────────────────────

const LEFT_PROMPT = '弁護士の画像を生成して。';
const LEFT_TOKENS = [
  '承知しました。', '\n',
  '男性の弁護士', 'の画像を', '生成します…',
];
const TOKEN_MS  = 60;
const PROMPT_MS = 30;

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

// ─── 生成された男性弁護士のアバター（バイアス可視化） ───────────────────────

function MaleLawyerSilhouette({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 100 120" width="100%" height="100%" fill="none" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* 頭（男性的特徴: 角ばった顎・短髪） */}
      <path d="M50 8 C40 8 32 16 32 28 C32 40 38 48 50 48 C62 48 68 40 68 28 C68 16 60 8 50 8 Z" fill={`${accent}18`} />
      {/* 短髪のライン */}
      <path d="M32 24 Q40 14 50 14 Q60 14 68 24" strokeWidth="1.6" />
      {/* ネクタイ */}
      <path d="M44 52 L50 64 L56 52" />
      <path d="M50 64 L48 88 L52 92 L52 88 Z" fill={`${accent}33`} strokeWidth="1" />
      {/* スーツの肩 */}
      <path d="M28 60 Q30 56 44 52 L50 60 L56 52 Q70 56 72 60 L72 110 L28 110 Z" fill={`${accent}10`} />
      {/* 襟 */}
      <path d="M44 52 L36 70 M56 52 L64 70" />
    </svg>
  );
}

// ─── 左カラム: バイアスチャット ─────────────────────────────────────────────

function BiasChatColumn() {
  const accent = '#88bbff';
  const [phase, setPhase] = useState<'idle' | 'prompt' | 'thinking' | 'answer' | 'image'>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase('prompt'), 300);
    return () => clearTimeout(t);
  }, []);

  const promptText = useTypewriter(LEFT_PROMPT, PROMPT_MS, phase === 'prompt');
  const promptDone = phase !== 'idle' && promptText.length === LEFT_PROMPT.length;

  useEffect(() => {
    if (!promptDone || phase !== 'prompt') return;
    const t1 = setTimeout(() => setPhase('thinking'), 400);
    const t2 = setTimeout(() => setPhase('answer'), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [promptDone, phase]);

  const answerText = useTokenStream(LEFT_TOKENS, TOKEN_MS, phase === 'answer');
  const fullAnswer = LEFT_TOKENS.join('');
  const answerDone = answerText.length === fullAnswer.length;

  useEffect(() => {
    if (phase !== 'answer' || !answerDone) return;
    const t = setTimeout(() => setPhase('image'), 600);
    return () => clearTimeout(t);
  }, [phase, answerDone]);

  return (
    <motion.div
      className="flex flex-col gap-3 min-h-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* バッジ */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: accent }}>
          Bias
        </span>
        <span className="text-[10px] tracking-widest text-white/40">·</span>
        <span className="text-[11px] font-bold text-white/85 tracking-tight">
          学習データの偏り
        </span>
      </div>

      {/* カラム見出し */}
      <h3
        className="font-bold tracking-tight leading-tight"
        style={{ color: `${accent}f0`, fontSize: 'clamp(14px, 1.35vw, 18px)' }}
      >
        バイアスと差別の増幅
      </h3>

      {/* プロンプト */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] tracking-[0.18em] uppercase text-white/30">You</span>
        <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3">
          <p className="text-[12.5px] leading-relaxed text-white/85 font-mono min-h-[1.5em]">
            {phase === 'prompt' || phase === 'idle' ? promptText : LEFT_PROMPT}
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

      {/* AI 応答 */}
      <AnimatePresence>
        {(phase === 'thinking' || phase === 'answer' || phase === 'image') && (
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
              className="relative rounded-2xl rounded-tl-sm border px-4 py-3 overflow-hidden flex flex-col gap-3"
              style={{
                borderColor: `${accent}33`,
                background: `linear-gradient(160deg, ${accent}0d 0%, rgba(255,255,255,0.02) 60%)`,
              }}
            >
              {phase === 'thinking' && (
                <div className="flex items-center gap-2.5">
                  <ThinkingDots />
                  <span className="text-[11px] text-white/40 tracking-wider">男性のスーツ姿の弁護士の画像を生成中…</span>
                </div>
              )}
              {(phase === 'answer' || phase === 'image') && (
                <p className="text-[12.5px] leading-relaxed text-white/90 font-mono">
                  {phase === 'image' ? fullAnswer : answerText}
                  {phase === 'answer' && answerText.length < fullAnswer.length && (
                    <motion.span
                      className="inline-block w-[2px] h-[1em] align-middle ml-0.5"
                      style={{ background: accent }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </p>
              )}

              {/* 生成画像（男性弁護士） */}
              <AnimatePresence>
                {phase === 'image' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative mx-auto rounded-xl overflow-hidden border"
                    style={{
                      width: 'min(150px, 50%)',
                      aspectRatio: '1 / 1.2',
                      borderColor: `${accent}55`,
                      background: `radial-gradient(circle at 50% 30%, ${accent}22, ${accent}05 70%)`,
                    }}
                  >
                    <MaleLawyerSilhouette accent={accent} />
                    {/* スキャンライン */}
                    <motion.div
                      className="absolute left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* キャプション */}
                    <span
                      className="absolute bottom-1 left-1 right-1 text-center text-[9px] font-mono tracking-widest uppercase"
                      style={{ color: `${accent}cc` }}
                    >
                      generated · male · 40s
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── 右カラム: AI ディバイドモーション ───────────────────────────────────────

function AiDivideMotion() {
  const accentUp = '#9ee0a8';   // 活用層 = グリーン
  const accentDown = '#f17a45'; // 未活用層 = オレンジ

  return (
    <motion.div
      className="relative flex flex-col gap-3 min-h-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* バッジ */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ffaacc', boxShadow: '0 0 8px #ffaacc' }} />
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: '#ffaacc' }}>
          AI Divide
        </span>
        <span className="text-[10px] tracking-widest text-white/40">·</span>
        <span className="text-[11px] font-bold text-white/85 tracking-tight">
          活用層と取り残される層の格差
        </span>
      </div>

      {/* カラム見出し */}
      <h3
        className="font-bold tracking-tight leading-tight"
        style={{ color: '#ffaaccf0', fontSize: 'clamp(14px, 1.35vw, 18px)' }}
      >
        AIディバイド（排除・分断）
      </h3>

      {/* グラフ領域 */}
      <div className="flex-1 relative rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden min-h-[240px]">
        <svg viewBox="0 0 400 240" preserveAspectRatio="none" width="100%" height="100%">
          {/* 背景グリッド */}
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={y} x1="20" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
          ))}
          {[100, 200, 300].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
          ))}

          {/* 中央軸（出発点） */}
          <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="0.8" />
          <circle cx="20" cy="120" r="3" fill="white" />

          {/* 上昇カーブ: AI活用層 */}
          <motion.path
            d="M20 120 Q 100 110 180 80 T 380 28"
            fill="none"
            stroke={accentUp}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
          />
          {/* グロー */}
          <motion.path
            d="M20 120 Q 100 110 180 80 T 380 28"
            fill="none"
            stroke={accentUp}
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.18}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
          />

          {/* 下降カーブ: AI未活用層 */}
          <motion.path
            d="M20 120 Q 100 132 180 150 T 380 200"
            fill="none"
            stroke={accentDown}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
          />
          <motion.path
            d="M20 120 Q 100 132 180 150 T 380 200"
            fill="none"
            stroke={accentDown}
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.15}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
          />

          {/* 終点マーカー: 活用層 */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6, duration: 0.4 }}
          >
            <circle cx="380" cy="28" r="6" fill={accentUp} opacity={0.25} />
            <circle cx="380" cy="28" r="3.5" fill={accentUp} />
          </motion.g>
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6, duration: 0.4 }}
          >
            <circle cx="380" cy="200" r="6" fill={accentDown} opacity={0.25} />
            <circle cx="380" cy="200" r="3.5" fill={accentDown} />
          </motion.g>

          {/* パーティクル: 上昇 */}
          {[0, 0.4, 0.8].map((d, i) => (
            <motion.circle
              key={`up-${i}`}
              r="2"
              fill={accentUp}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.0, repeat: Infinity, delay: 2.4 + d, ease: 'easeOut' }}
              style={{ offsetPath: `path('M20 120 Q 100 110 180 80 T 380 28')` }}
            />
          ))}
          {/* パーティクル: 下降（ゆっくり / 暗め） */}
          {[0, 0.7].map((d, i) => (
            <motion.circle
              key={`down-${i}`}
              r="1.8"
              fill={accentDown}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ offsetDistance: '100%', opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 2.6 + d, ease: 'linear' }}
              style={{ offsetPath: `path('M20 120 Q 100 132 180 150 T 380 200')` }}
            />
          ))}

          {/* ギャップ縦線（格差の可視化） */}
          <motion.line
            x1="380" y1="28" x2="380" y2="200"
            stroke="white"
            strokeOpacity={0.4}
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          />
        </svg>

        {/* 上ラベル */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col items-end"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: accentUp }}>
            +95% productivity
          </span>
          <span className="text-[12px] font-bold text-white tracking-tight">
            AI活用層
          </span>
        </motion.div>
        {/* 下ラベル */}
        <motion.div
          className="absolute bottom-3 right-3 flex flex-col items-end"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: accentDown }}>
            stagnant · 機会喪失
          </span>
          <span className="text-[12px] font-bold text-white tracking-tight">
            AI未活用層
          </span>
        </motion.div>
        {/* 出発点ラベル */}
        <span className="absolute top-[112px] left-2 text-[9px] font-mono tracking-widest text-white/35">
          NOW
        </span>
        {/* 軸ラベル */}
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.28em] uppercase text-white/30">
          time →
        </span>
      </div>
    </motion.div>
  );
}

// ─── スライド本体 ──────────────────────────────────────────────────────────

export default function Slide20a2BiasDivide() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-6xl h-full px-2 py-6 pt-14 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#88bbff]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Principle 02 · Diversity & Inclusion の具体化
            </span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#ffaacc]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            「多様性・包摂」を損なう
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #ffaacc 100%)' }}
            >
              2つの構造
            </span>
          </h2>
        </div>

        {/* 2 カラム */}
        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          <BiasChatColumn />
          <AiDivideMotion />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
