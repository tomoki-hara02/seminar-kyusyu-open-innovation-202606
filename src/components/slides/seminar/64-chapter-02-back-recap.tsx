'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p63: Recap · Chapter 02 後編まとめ — 社内生成AI利用規程づくり
 *
 * ベーステンプレート: `templates/Recap.tsx`
 */

const TAKEAWAYS = [
  {
    text:
      '社内生成AI利用規程を作るときは、生成AI利用規約や取引先との契約書、その他社内規程の枠内で構築する',
    accent: '#60a5fa',
  },
  {
    text: '社内規程では、ユーザー、ツール、入力情報、出力利用を項目立てて検討する',
    accent: '#9ee0a8',
  },
  {
    text: 'ルールの詳細は関連法令知識をもとにリスクベースアプローチを採用する',
    accent: '#f2d160',
  },
] as const;

export default function Slide63Chapter02BackRecap() {
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
              Recap · Chapter 02 後編
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            社内生成AI利用規程づくりの
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #60a5fa 0%, #9ee0a8 50%, #f2d160 100%)',
              }}
            >
              3 つのポイント
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.text}
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
                className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold tabular-nums"
                style={{
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <p
                className="font-semibold text-white leading-relaxed min-w-0 pt-1"
                style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
              >
                {t.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
