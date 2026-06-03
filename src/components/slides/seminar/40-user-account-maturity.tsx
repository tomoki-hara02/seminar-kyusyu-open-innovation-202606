'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p40: 2 ユーザー — アカウント付与の成熟度モデル
 *
 * ベース: `35-usage-purpose-maturity.tsx` / `templates/PricingTiers.tsx`
 */

const USER_ACCENT = '#88bbff';

const ACCOUNT_MATURITY_TIERS = [
  {
    name: 'スターター企業',
    line1: '少人数・特定部署から始める',
    line2: '小さく始めて生成AIの効果を確認する',
    focusTag: '少数から',
    focusAccent: '#9ee0a8',
    accent: '#c8a8ff',
    features: [
      '生成AIにアレルギーの少ない人材から起用',
      '法人アカウントのシート数による固定費の削減',
      'シャドーAIに特に注意',
    ],
    highlighted: false,
  },
  {
    name: 'スタンダード',
    line1: '特定のプロジェクトや部署単位でアカウント付与',
    line2: '事業レベルでの生成AI活用にチャレンジ',
    focusTag: '部署・PJ単位',
    focusAccent: '#88bbff',
    accent: '#88bbff',
    features: [
      '新規事業やプロジェクトで切り出して試験的に活用',
      '関連人数次第ではシート料金が大きな負担に',
      '生成AI格差問題に特に注意',
    ],
    highlighted: true,
  },
  {
    name: 'プロ',
    line1: '全社員にアカウントを配布し、アクセス権限で分ける',
    line2: '各事業レベルで生成AI活用を促す',
    focusTag: '全社・権限分離',
    focusAccent: '#f7c46c',
    accent: '#ffaacc',
    features: [
      '従業員コンプライアンスが必須',
      'セキュリティやコンプライアンスのモニタリングが重要',
      'ROI（投資対効果）の検証の見落とし厳禁',
    ],
    highlighted: false,
  },
] as const;

export default function Slide40UserAccountMaturity() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-5 md:gap-7 w-full max-w-6xl h-full justify-center py-4 pt-12 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-center shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            2 · ユーザー · Account Maturity
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
          >
            アカウント付与の
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, #c8a8ff 0%, ${USER_ACCENT} 55%, #ffaacc 100%)`,
              }}
            >
              成熟度
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            組織の規模と活用段階に応じて、使用者・アカウントの広げ方を変える
          </p>
          <p
            className="text-white/35 leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            style={{ fontSize: 'clamp(10px, 0.92vw, 13px)' }}
          >
            <span style={{ color: '#9ee0a8' }}>少数・特定部署</span>
            <span className="text-white/25">→</span>
            <span style={{ color: USER_ACCENT }}>プロジェクト・部署単位</span>
            <span className="text-white/25">→</span>
            <span style={{ color: '#f7c46c' }}>全社配布・権限分離</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-4 w-full flex-1 min-h-0 items-stretch">
          {ACCOUNT_MATURITY_TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              className={`relative flex flex-col gap-3 p-4 md:p-5 rounded-2xl border min-h-0 ${
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
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{
                    background: t.accent,
                    color: '#1a1530',
                    fontSize: 'clamp(8px, 0.75vw, 10px)',
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
                    className="font-semibold text-white tracking-tight"
                    style={{ fontSize: 'clamp(12px, 1.1vw, 16px)' }}
                  >
                    {t.name}
                  </span>
                </div>
              </div>

              <div
                className="flex flex-col gap-2 px-3 py-2.5 rounded-xl border leading-snug shrink-0"
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
                    fontSize: 'clamp(9px, 0.82vw, 11px)',
                  }}
                >
                  {t.focusTag}
                </span>
                <p
                  className="font-bold text-white/90 leading-snug"
                  style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                >
                  {t.line1}
                </p>
                <p
                  className="text-white/60 leading-snug"
                  style={{ fontSize: 'clamp(10px, 0.92vw, 12.5px)' }}
                >
                  {t.line2}
                </p>
              </div>

              <ul className="flex flex-col gap-2 flex-1 min-h-0">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 leading-snug text-white/75"
                    style={{ fontSize: 'clamp(11px, 0.98vw, 13px)' }}
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
          style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          ※ 2-1 使用者の範囲・2-2 アカウント管理とあわせて設計する
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
