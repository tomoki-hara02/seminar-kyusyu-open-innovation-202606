'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p37: Recap — 目的・基本理念で抑えるべきポイント
 *
 * ベーステンプレート: `templates/Recap.tsx`
 * （1-1 基本方針 / 1-2 利用目的 / 1-3 統括責任者のまとめ）
 */

const IDEALS_ACCENT = '#60a5fa';

const TAKEAWAYS = [
  {
    title: '生成AI活用に関する基本的な方向性を踏まえる',
    accent: '#60a5fa',
  },
  {
    title: '自社の状況から生成AIの利用目的の方針を決める',
    accent: '#88bbff',
  },
  {
    title: '統括責任者は、自社方針や理念を踏まえ活用促進を促す役割を設定する',
    accent: '#c8a8ff',
  },
];

export default function Slide37Chapter01IdealsRecap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-7 md:gap-9 w-full max-w-5xl pt-10 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
            >
              Recap · Chapter 02 後編 · 1 目的・基本理念
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}
          >
            目的・基本理念で
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${IDEALS_ACCENT} 0%, #88bbff 50%, #c8a8ff 100%)`,
              }}
            >
              抑えるべきポイント
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-center">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white/[0.04] border"
              style={{ borderColor: `${t.accent}33` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div
                className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold tabular-nums"
                style={{
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                  fontSize: 'clamp(16px, 1.4vw, 22px)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex flex-col gap-1 min-w-0 py-0.5">
                <h3
                  className="font-semibold text-white tracking-tight leading-snug"
                  style={{ fontSize: 'clamp(15px, 1.35vw, 20px)' }}
                >
                  {t.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          className="text-white/30 tracking-wider shrink-0"
          style={{ fontSize: 'clamp(13px, 0.88vw, 14px)' }}
        >
          ※ 次は「2 ユーザー」— 使用者の範囲・アカウント管理へ進みます
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
