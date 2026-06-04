'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p89: 明日から始める 3 つの一歩 — Next Steps
 *
 * セミナーで学んだことを実務に落とすための具体アクション。
 */

const STEPS = [
  {
    label: 'Step 01',
    timeline: '今週中に',
    title: '自社の「無形業務」を棚卸しする',
    desc:
      '製造・在庫以外の意思決定・コミュニケーション・創造業務をリスト化し、生成AIで桁を変えられる領域に優先順位を付ける。',
    accent: '#60a5fa',
  },
  {
    label: 'Step 02',
    timeline: '今月中に',
    title: '4 分析セグメント（U / T / I / O）で現行運用を点検する',
    desc:
      'ユーザー範囲・使用ツール・入力情報・出力利用 — 各セグメントが現状どう運用されているかを書き出し、リスクの濃淡を可視化する。',
    accent: '#9ee0a8',
  },
  {
    label: 'Step 03',
    timeline: '半年以内に',
    title: '社内規程 v0.1 を生成AIで作り、改訂サイクルを回す',
    desc:
      '完璧な規程を待たず、まず v0.1 を策定。半年〜1 年ごとに運用実績と法令動向を踏まえて改訂し、現場と規程を同期し続ける。',
    accent: '#f2d160',
  },
] as const;

export default function Slide89NextSteps() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl h-full justify-center py-4 md:py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
            >
              Next Steps · 明日から
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            明日から始める
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #60a5fa 0%, #9ee0a8 50%, #f2d160 100%)',
              }}
            >
              3 つの一歩
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              className="grid grid-cols-[auto_1fr] items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl border"
              style={{
                borderColor: `${s.accent}33`,
                background: 'rgba(255,255,255,0.04)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              <div className="flex flex-col items-stretch gap-2">
                <div
                  className="flex items-center justify-center font-mono font-bold tracking-[0.16em] px-3 py-1.5 rounded-lg"
                  style={{
                    color: s.accent,
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}66`,
                    fontSize: 'clamp(10px, 0.85vw, 12px)',
                    boxShadow: `0 0 14px ${s.accent}33`,
                  }}
                >
                  {s.label}
                </div>
                <span
                  className="text-center font-semibold text-white/70"
                  style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
                >
                  {s.timeline}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.35vw, 19px)' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-white/65 leading-relaxed"
                  style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          className="shrink-0 text-white/35 leading-snug"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          ※ 一気に整える必要はありません。小さく回すサイクル自体が、生成AI時代の競争優位になります。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
