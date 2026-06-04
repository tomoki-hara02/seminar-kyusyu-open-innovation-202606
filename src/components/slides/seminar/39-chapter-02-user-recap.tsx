'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p39: Recap — 2 ユーザーで抑えるべきポイント
 *
 * ベーステンプレート: `templates/Recap.tsx`
 * （2-1 使用者の範囲 / アカウント成熟度 / 2-2 アカウント管理のまとめ）
 */

const USER_ACCENT = '#88bbff';

const TAKEAWAYS = [
  {
    title: '利用目的に合わせて「誰が使えるか」を明確化し、間接利用を禁止する',
    accent: '#88bbff',
  },
  {
    title: '組織の成熟度（スターター／スタンダード／プロ）に応じてアカウント付与の広げ方を設計する',
    accent: '#c8a8ff',
  },
  {
    title: 'アカウント共有を禁じ、情報へのアクセスはアカウント単位で制限する',
    accent: '#ffaacc',
  },
];

export default function Slide39Chapter02UserRecap() {
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
              Recap · Chapter 02 後編 · 2 ユーザー
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}
          >
            ユーザーで
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${USER_ACCENT} 0%, #c8a8ff 50%, #ffaacc 100%)`,
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
          style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          ※ 次は「3 ツール」— 生成AIツールの分析・指定・アクセス端末へ進みます
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
