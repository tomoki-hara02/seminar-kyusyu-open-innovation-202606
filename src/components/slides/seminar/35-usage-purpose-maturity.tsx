'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p35: 1-2 利用目的 — 成熟度モデル
 *
 * ベーステンプレート: `templates/PricingTiers.tsx`
 */

const CHAPTER_ACCENT = '#60a5fa';

const MATURITY_TIERS = [
  {
    name: 'Starter',
    desc: 'これから生成AIを使う企業向け',
    focusTag: 'OK中心',
    focusLabel: '生成AIの使い方としてOKなものを中心に書く',
    focusAccent: '#9ee0a8',
    approach: 'ユースケースを明示する',
    accent: '#c8a8ff',
    features: [
      '指定したユースケース以外の使用禁止',
      'ユースケースにコンプライアンスリソースを集中',
      '順次現場の声で範囲を拡大していく',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    desc: '生成AI活用企業向け',
    focusTag: 'NG中心',
    focusLabel: '生成AIの使い方としてNGなものを中心に書く',
    focusAccent: '#ff9966',
    approach: '禁止事項のみ明示する',
    accent: '#88bbff',
    features: [
      '従業員のAIリテラシーが必須',
      '禁止事項を中心に構成し、活用方法発見を重視',
      'グレーゾーンの判断に専門家を導入',
    ],
    highlighted: true,
  },
  {
    name: 'PRO',
    desc: '本格的な生成AI企業',
    focusTag: '環境分離',
    focusLabel: '生成AIのNG領域でも使える環境を用意する',
    focusAccent: '#f7c46c',
    approach: 'サンドボックス環境の構築',
    accent: '#ffaacc',
    features: [
      '本番環境とサンドボックス環境を分離',
      '技術者はサンドボックスで開発',
      '非技術者は、Standardと同様',
    ],
    highlighted: false,
  },
] as const;

export default function Slide35UsagePurposeMaturity() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-6xl h-full justify-center py-4 pt-12 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-center shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            1-2 · 利用目的 · Maturity
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
          >
            規程設計の
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, #c8a8ff 0%, ${CHAPTER_ACCENT} 55%, #ffaacc 100%)`,
              }}
            >
              成熟度
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            組織の生成AI活用段階に応じて、利用目的の定め方を変える
          </p>
          <p
            className="text-white/35 leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            style={{ fontSize: 'clamp(13px, 0.92vw, 14px)' }}
          >
            <span style={{ color: '#9ee0a8' }}>OK中心</span>
            <span className="text-white/25">→</span>
            <span style={{ color: '#ff9966' }}>NG中心</span>
            <span className="text-white/25">→</span>
            <span style={{ color: '#f7c46c' }}>NG領域でも使える環境</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full flex-1 min-h-0 items-stretch">
          {MATURITY_TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              className={`relative flex flex-col gap-4 p-5 md:p-6 rounded-2xl border min-h-0 ${
                t.highlighted
                  ? 'bg-white/[0.08] border-white/20 md:scale-[1.03]'
                  : 'bg-white/[0.04] border-white/10'
              }`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.1,
                ease: 'easeOut',
              }}
              style={{
                boxShadow: t.highlighted
                  ? `0 0 40px ${t.accent}33, inset 0 0 0 1px ${t.accent}55`
                  : undefined,
              }}
            >
              {t.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full tracking-[0.16em] uppercase whitespace-nowrap"
                  style={{
                    background: t.accent,
                    color: '#1a1530',
                    fontSize: 'clamp(10px, 0.75vw, 11px)',
                  }}
                >
                  推奨アプローチ
                </div>
              )}

              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: t.accent }}
                  />
                  <span
                    className="tracking-[0.22em] uppercase text-white/45 font-semibold"
                    style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                  >
                    {t.name}
                  </span>
                </div>
                <p
                  className="text-white/55 leading-snug"
                  style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                >
                  {t.desc}
                </p>
              </div>

              <div
                className="flex flex-col gap-2 px-3 py-3 rounded-xl border leading-snug shrink-0"
                style={{
                  borderColor: `${t.focusAccent}55`,
                  background: `linear-gradient(160deg, ${t.focusAccent}18 0%, rgba(255,255,255,0.02) 100%)`,
                  boxShadow: `0 0 20px ${t.focusAccent}15`,
                }}
              >
                <span
                  className="w-fit px-2 py-0.5 rounded-md font-bold tracking-wide"
                  style={{
                    color: t.focusAccent,
                    border: `1px solid ${t.focusAccent}66`,
                    background: `${t.focusAccent}14`,
                    fontSize: 'clamp(10px, 0.82vw, 11px)',
                  }}
                >
                  {t.focusTag}
                </span>
                <p
                  className="font-bold text-white leading-snug"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
                >
                  {t.focusLabel}
                </p>
              </div>

              <div
                className="px-3 py-2.5 rounded-xl border leading-snug shrink-0"
                style={{
                  borderColor: `${t.accent}44`,
                  background: `${t.accent}10`,
                }}
              >
                <p
                  className="text-white/40 tracking-wide uppercase mb-1"
                  style={{ fontSize: 'clamp(10px, 0.8vw, 11px)' }}
                >
                  設計の考え方
                </p>
                <p
                  className="font-bold leading-snug"
                  style={{ color: t.accent, fontSize: 'clamp(13px, 1.15vw, 16px)' }}
                >
                  {t.approach}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1 min-h-0">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 leading-snug text-white/75"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    <span style={{ color: t.accent }} className="shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p
          className="text-white/30 tracking-wider text-center shrink-0"
          style={{ fontSize: 'clamp(13px, 0.88vw, 14px)' }}
        >
          ※ 関連規程の枠内で、いずれかの成熟度に合わせて利用目的を設計する
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
