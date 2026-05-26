'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

const PROMPT =
  '架空企業「サンプル株式会社（従業員50名・製造業）」の情報をもとに、' +
  '生成AI活用プランを提案してください。' +
  'MCPで外部ツールと連携する方法と、MIT GenAI Divide の成功パターンも踏まえてください。';

const TOKENS = [
  'サンプル株式会社の', '状況を', '分析しました。\n\n',
  '【活用プラン概要】\n',
  '① ', 'バックオフィス自動化（優先）\n',
  '　受発注メールの', 'OCR・', '仕訳データ整形を', 'AI化。\n',
  '　MCP経由で', '会計ソフトに', '自動連携。\n\n',
  '② ', 'Webマーケティング\n',
  '　GA4・GSCデータを', 'AI分析し、\n',
  '　コンテンツ案の', '生成・CMS投稿を', '自動化。\n\n',
  '【MIT成功パターンとの対応】\n',
  '・業務フローへの深い統合\n',
  '・バックオフィスからROIを先に確保\n',
  '・部門ごとに自律的に運営\n\n',
  '次のステップ：', '社内規程の整備。',
];

const TOKEN_MS = 55;
const PROMPT_MS = 32;

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
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/70"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function Slide13LivePlan() {
  const [phase, setPhase] = useState<'prompt' | 'thinking' | 'answer'>('prompt');

  const promptText = useTypewriter(PROMPT, PROMPT_MS, phase === 'prompt');
  const promptDone = promptText.length === PROMPT.length;

  useEffect(() => {
    if (!promptDone || phase !== 'prompt') return;
    const t1 = setTimeout(() => setPhase('thinking'), 500);
    const t2 = setTimeout(() => setPhase('answer'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [promptDone, phase]);

  const answerText = useTokenStream(TOKENS, TOKEN_MS, phase === 'answer');
  const fullAnswer = TOKENS.join('');

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-2xl gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Live Demo · 活用プラン作成
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            架空企業をモデルに
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)',
              }}
            >
              活用プランを考える
            </span>
          </h2>
        </div>

        {/* ── 注意事項（赤字） ── */}
        <motion.div
          className="flex items-start gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg
            className="w-4 h-4 shrink-0 mt-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#f87171"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2L14 13H2L8 2z" />
            <line x1="8" y1="7" x2="8" y2="9.5" />
            <circle cx="8" cy="11.5" r="0.5" fill="#f87171" stroke="none" />
          </svg>
          <p className="text-xs text-red-400 leading-relaxed font-medium">
            必ず架空企業などの情報を用いてください。
            <span className="font-bold underline decoration-red-400/60 ml-1">
              自社の実際の情報は絶対に入力しないでください。
            </span>
          </p>
        </motion.div>

        {/* ── プロンプトバブル ── */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.18em] uppercase text-white/30">You</span>
          <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-5 py-4">
            <p className="text-sm leading-relaxed text-white/85 font-mono min-h-[1.5em]">
              {phase === 'prompt' ? promptText : PROMPT}
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

        {/* ── 回答バブル ── */}
        <AnimatePresence>
          {(phase === 'thinking' || phase === 'answer') && (
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/30">
                  Claude
                </span>
              </div>

              <div className="relative rounded-2xl rounded-tl-sm border border-white/10 px-5 py-4 overflow-hidden">
                <div className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-br from-[#7B5EA7]/20 via-transparent to-[#4F8EF7]/15 blur-2xl" />

                {phase === 'thinking' && (
                  <div className="flex items-center gap-3">
                    <ThinkingDots />
                    <span className="text-xs text-white/40 tracking-wider">
                      企業情報を分析中…
                    </span>
                  </div>
                )}

                {phase === 'answer' && (
                  <p className="text-sm leading-relaxed text-white/90 font-mono whitespace-pre-wrap min-h-[8em]">
                    {answerText}
                    {answerText.length < fullAnswer.length && (
                      <motion.span
                        className="inline-block w-[2px] h-[1em] bg-[#88bbff] align-middle ml-0.5"
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

        {/* フッター */}
        <div className="flex items-center gap-2 text-[10px] text-white/25 tracking-widest">
          <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
          Claude · MCP連携対応 · 架空企業データ使用
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
