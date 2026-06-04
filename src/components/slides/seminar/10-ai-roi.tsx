'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { useCountUp } from '@/hooks/useCountUp';

/**
 * MIT「GenAI Divide」レポート（2025）をベースにしたスライド。
 *
 * 出典: MIT Sloan Management Review / State of AI in Business 2025
 * - 企業の95%が生成AIで測定可能なP&L改善を得られていない
 * - 5%の成功企業には共通する「アプローチの違い」がある
 */

const SUCCESS_FACTORS = [
  {
    label: '業務フローへの深い統合',
    desc: 'ツールを「使う」のではなく、実際の業務プロセスに直接組み込む',
    accent: '#88bbff',
  },
  {
    label: '学習サイクルの構築',
    desc: '検証 → 評価 → 学習 → 実践のループを継続的に回し続ける',
    accent: '#c8a8ff',
  },
  {
    label: 'バックオフィスからROIを出す',
    desc: 'BPO廃止・代理店費削減など、見えにくいコストこそ最大のリターン源',
    accent: '#ffaacc',
  },
  {
    label: '部門に自律性を与える',
    desc: '一元管理より、各部門が自分たちの業務に合ったAIを主体的に所有・運営',
    accent: '#9ee0a8',
  },
  {
    label: '継続的な改善システム',
    desc: 'インタラクションごとに改善し続ける仕組みを構築。完成形を目指さない',
    accent: '#f7c46c',
  },
];

export default function Slide10AiRoi() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const v = useCountUp(95, { duration: 1.8, start: inView, easePower: 4 });

  return (
    <SlideWrapper>
      <div
        ref={ref}
        className="flex flex-row w-full h-full max-w-6xl items-center gap-12 px-2 py-8"
      >
        {/* ── 左：95% ヒーロー数字 ── */}
        <motion.div
          className="flex flex-col items-center gap-4 shrink-0 w-72 text-center"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* 放射グロー */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(255,100,100,0.18) 0%, transparent 65%)',
            }}
          />

          {/* ラベル */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8888]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              MIT GenAI Divide 2025
            </span>
          </div>

          {/* 数字 */}
          <div className="flex items-end gap-1 leading-none">
            <span
              className="font-bold tabular-nums tracking-tight"
              style={{
                fontSize: 'clamp(6rem, 14vw, 11rem)',
                color: '#ff8888',
                filter: 'drop-shadow(0 0 40px rgba(255,100,100,0.5))',
              }}
            >
              {Math.round(v)}
            </span>
            <span
              className="font-light text-white/70 mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              %
            </span>
          </div>

          {/* サブテキスト */}
          <motion.p
            className="text-base md:text-lg font-semibold text-white/80 leading-snug"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            の企業が生成AIで
            <br />
            <span className="text-[#ff8888]">ROIを出せていない</span>
          </motion.p>

          {/* 区切り */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* 引用元 */}
          <p className="text-sm text-white/25 leading-relaxed tracking-wide">
            出典: MIT Sloan Management Review<br />
            State of AI in Business (2025)<br />
            <a
              href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="underline underline-offset-2 text-white/40 hover:text-white/70 transition-colors"
            >
              資料はこちら
            </a>
          </p>
        </motion.div>

        {/* 縦区切り */}
        <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-white/15 to-transparent shrink-0" />

        {/* ── 右：5%の成功企業の特徴 ── */}
        <motion.div
          className="flex flex-col gap-4 flex-1 min-w-0"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          {/* セクションヘッダー */}
          <div className="flex flex-col gap-1 mb-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#88bbff]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                The Successful 5%
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              成功企業に共通する
              <span
                className="bg-clip-text text-transparent ml-2"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)',
                }}
              >
                5つのアプローチ
              </span>
            </h2>
          </div>

          {/* 特徴リスト */}
          <div className="flex flex-col gap-2.5">
            {SUCCESS_FACTORS.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-white/8"
                style={{
                  background: `linear-gradient(135deg, ${f.accent}0e 0%, transparent 100%)`,
                  borderColor: `${f.accent}22`,
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
              >
                {/* 番号バッジ */}
                <span
                  className="text-xs font-bold font-mono tabular-nums shrink-0 mt-0.5 w-5 text-right"
                  style={{ color: f.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-base font-bold text-white/90 leading-snug">
                    {f.label}
                  </span>
                  <span className="text-sm text-white/45 leading-relaxed">
                    {f.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
