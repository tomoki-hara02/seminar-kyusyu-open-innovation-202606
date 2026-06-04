'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p91: 本セミナーのまとめ — Chapter 01〜03 の核心メッセージ
 *
 * ベース: 81-chapter-02-back-recap.tsx
 */

const TAKEAWAYS = [
  {
    chapter: 'Chapter 01',
    chapterLabel: '活用プラン',
    title: '無形業務領域でこそ、生成AIは能力の桁を変える',
    desc:
      '製造・在庫などの「形ある業務」だけでなく、企画・営業・意思決定など「形のない業務」を棚卸しすることが出発点。MCP（エージェント）前提の設計で、補助ツールではなく自動化へ。',
    accent: '#60a5fa',
  },
  {
    chapter: 'Chapter 02',
    chapterLabel: '社内規程',
    title: 'リスクベースで「安全に攻める」社内ルールをつくる',
    desc:
      'ユーザー / ツール / 入力 / 出力 の 4 分析セグメントで条文を組み立てる。生成AI利用規約や既存社内規程の枠内で、リスクの大小に応じた選択肢を残す設計を。',
    accent: '#9ee0a8',
  },
  {
    chapter: 'Chapter 03',
    chapterLabel: '実務シーン',
    title: '商談・クリエイティブの現場ごとに、法的論点を押さえる',
    desc:
      '議事録AI・音声合成・業務委託の成果物にAIが混入する時代。著作物性／譲渡対価／肖像権・パブリシティ権など、シーン固有の論点を運用と契約で備える。',
    accent: '#f2d160',
  },
] as const;

export default function Slide91SeminarRecap() {
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
              Final Recap · 本日のまとめ
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            本セミナーの
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #60a5fa 0%, #9ee0a8 50%, #f2d160 100%)',
              }}
            >
              3 つの核心メッセージ
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl border"
              style={{
                borderColor: `${t.accent}33`,
                background: 'rgba(255,255,255,0.04)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              <div
                className="shrink-0 flex flex-col items-center justify-center gap-0.5 w-16 md:w-20 py-2 rounded-xl"
                style={{
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                }}
              >
                <span
                  className="font-mono font-bold tracking-[0.14em] leading-none"
                  style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
                >
                  {t.chapter}
                </span>
                <span
                  className="font-bold leading-none"
                  style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}
                >
                  {t.chapterLabel}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.35vw, 19px)' }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-white/65 leading-relaxed"
                  style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          className="shrink-0 text-white/35 leading-snug"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          ※ 3 章を通じた共通テーマは「使わせない法務」ではなく「安全に攻める法務」。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
