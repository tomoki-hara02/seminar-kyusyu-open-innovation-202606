'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p48: 3-4 エージェント・MCP — ツール・接続の成熟度モデル
 *
 * ベース: `35-usage-purpose-maturity.tsx` / `templates/PricingTiers.tsx`
 */

const TOOL_ACCENT = '#c8a8ff';

const MCP_MATURITY_TIERS = [
  {
    name: 'スターター',
    desc: 'MCP・エージェント連携の初期段階の企業向け',
    focusTag: '厳選3ツール',
    focusLabel: 'ChatGPT・Claude・Gemini から選ぶ',
    focusAccent: '#9ee0a8',
    approach: '法人プラン以外は使用しない',
    accent: '#c8a8ff',
    features: [
      'MCPはウェブ検索を基準にする',
      '公式MCPサーバー接続は、リスクの最も低い領域に限定する',
    ],
    highlighted: false,
  },
  {
    name: 'スタンダード',
    desc: 'MCP連携を業務に広げる企業向け',
    focusTag: '規約適合',
    focusLabel: '必要条件を満たすサービスを選ぶ',
    focusAccent: '#88bbff',
    approach: '法人プラン以外は使用しない',
    accent: '#88bbff',
    features: [
      'MCPはRBAに基づき、コスパの良いアプリに限定',
      '公式サーバーを原則とし、非公式は承認制を採る',
      '接続先アプリのデータのバックアップなどに注意',
    ],
    highlighted: true,
  },
  {
    name: 'プロ',
    desc: 'エージェント・MCPを本格運用する企業向け',
    focusTag: '範囲拡大',
    focusLabel: 'CLIなど、チャットアプリ以外にも範囲を広げる',
    focusAccent: '#f7c46c',
    approach: '法人プラン／API規約を確認の上利用する',
    accent: '#ffaacc',
    features: [
      '使用可能なMCPサーバの基準を設ける（セキュリティ・コンプライアンス）',
      'ミスアライメントリスクの検証',
    ],
    highlighted: false,
  },
] as const;

export default function Slide48McpAgentMaturity() {
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
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            3-4 · エージェント・MCP · Maturity
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
          >
            ツール・MCP接続の
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, #c8a8ff 0%, ${TOOL_ACCENT} 55%, #ffaacc 100%)`,
              }}
            >
              成熟度
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            組織の連携範囲に応じて、利用ツールとMCPの許容範囲を段階的に設計する
          </p>
          <p
            className="text-white/35 leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            style={{ fontSize: 'clamp(10px, 0.92vw, 13px)' }}
          >
            <span style={{ color: '#9ee0a8' }}>厳選・低リスク</span>
            <span className="text-white/25">→</span>
            <span style={{ color: '#88bbff' }}>RBA・承認制</span>
            <span className="text-white/25">→</span>
            <span style={{ color: '#f7c46c' }}>基準設計・検証</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full flex-1 min-h-0 items-stretch">
          {MCP_MATURITY_TIERS.map((t, i) => (
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
                    className="tracking-[0.22em] uppercase text-white/45 font-semibold"
                    style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                  >
                    {t.name}
                  </span>
                </div>
                <p
                  className="text-white/55 leading-snug"
                  style={{ fontSize: 'clamp(12px, 1.05vw, 14px)' }}
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
                    fontSize: 'clamp(9px, 0.82vw, 11px)',
                  }}
                >
                  {t.focusTag}
                </span>
                <p
                  className="font-bold text-white leading-snug"
                  style={{ fontSize: 'clamp(12px, 1.1vw, 15px)' }}
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
                  style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}
                >
                  プラン・契約
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
                    style={{ fontSize: 'clamp(12px, 1.05vw, 14px)' }}
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
          ※ 外部アプリへのデータ送信リスクを踏まえ、段階的にMCPの接続範囲を広げる
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
