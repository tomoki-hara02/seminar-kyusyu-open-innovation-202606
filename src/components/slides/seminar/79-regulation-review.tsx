'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 7-3 規程の見直し — 事業者規約の改訂頻度から導く社内見直しの視点
 *
 * 構成（左→右の視線誘導）:
 *   1. 観察: 事業者は規約を継続的に動かしている（3社のリズム）
 *   2. 帰結: だから社内規程も同じリズムで追随する
 *   3. 視点: いつ見直すか — 定期1つ＋不定期2つ
 */

const GOVERN_ACCENT = '#ff7aa8';
const PINK_SOFT = '#ffaacc';

/** 0〜1 の頻度強度（バー長さ・ドット数の駆動値） */
const PROVIDERS = [
  {
    name: 'OpenAI',
    accent: '#10b981',
    cadence: '数か月',
    cadenceNote: '本体ポリシー＋広告系で常時改訂',
    intensity: 0.88,
    recent: [
      { date: '2026.1.9', label: 'Service Terms' },
      { date: '2026.4–5', label: '広告系ポリシー' },
    ],
  },
  {
    name: 'Anthropic',
    accent: '#e8b86d',
    cadence: '四半期',
    cadenceNote: 'Usage Policy 等の小幅修正が継続',
    intensity: 0.55,
    recent: [{ date: '2026.3.16', label: '3規程の一括改訂' }],
  },
  {
    name: 'Google',
    accent: '#60a5fa',
    cadence: '年1+α',
    cadenceNote: 'API / 製品ドキュメントは月次でも動く',
    intensity: 0.35,
    recent: [{ date: '2026.1.7', label: 'Generative AI Prohibited Use Policy' }],
  },
] as const;

const TRIGGERS = [
  {
    badge: '定期',
    title: '半年〜1年に1度',
    desc: '事業者規約・法令・ガイドラインの差分を反映する基本リズム',
    accent: GOVERN_ACCENT,
    primary: true,
  },
  {
    badge: '不定期',
    title: '社内の生成AI活用レベルが上がったとき',
    desc: '利用範囲・ツール・MCP・データ区分を再点検',
    accent: '#c8a8ff',
  },
  {
    badge: '不定期',
    title: '主要リスクがニュース等で公表されたとき',
    desc: '事業者の規約改訂を待たず先回りで追随',
    accent: '#88bbff',
  },
] as const;

function IntensityBar({
  intensity,
  accent,
  delay = 0,
}: {
  intensity: number;
  accent: string;
  delay?: number;
}) {
  return (
    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${accent}88, ${accent})`,
          boxShadow: `0 0 10px ${accent}55`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(intensity * 100)}%` }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </div>
  );
}

function ProviderCard({
  provider,
  index,
}: {
  provider: (typeof PROVIDERS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2 p-3 md:p-3.5 rounded-2xl border"
      style={{
        borderColor: `${provider.accent}44`,
        background: `linear-gradient(160deg, ${provider.accent}10 0%, rgba(255,255,255,0.015) 100%)`,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: provider.accent, boxShadow: `0 0 8px ${provider.accent}` }}
          />
          <span
            className="font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
          >
            {provider.name}
          </span>
        </div>
        <span
          className="font-semibold tracking-wide"
          style={{ color: provider.accent, fontSize: 'clamp(11px, 1vw, 13px)' }}
        >
          {provider.cadence}
        </span>
      </div>

      <IntensityBar
        intensity={provider.intensity}
        accent={provider.accent}
        delay={0.25 + index * 0.08}
      />

      <p
        className="text-white/55 leading-snug"
        style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
      >
        {provider.cadenceNote}
      </p>

      <div
        className="mt-1 pt-2 border-t flex flex-col gap-1"
        style={{ borderColor: `${provider.accent}22` }}
      >
        <span
          className="tracking-[0.18em] uppercase text-white/35 font-semibold"
          style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}
        >
          直近の改訂
        </span>
        {provider.recent.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2 leading-snug"
          >
            <span
              className="font-mono tabular-nums shrink-0"
              style={{ color: provider.accent, fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              {item.date}
            </span>
            <span
              className="text-white/72"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BridgeArrow() {
  return (
    <motion.div
      className="hidden lg:flex flex-col items-center justify-center gap-2 py-4 shrink-0"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
    >
      <span
        className="tracking-[0.32em] uppercase text-white/35 font-semibold writing-mode-vertical"
        style={{
          fontSize: 'clamp(9px, 0.78vw, 11px)',
          writingMode: 'vertical-rl',
        }}
      >
        だから
      </span>
      <svg width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden>
        <motion.path
          d="M11 0 L11 32 M11 32 L4 25 M11 32 L18 25"
          stroke={`${GOVERN_ACCENT}cc`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        />
      </svg>
    </motion.div>
  );
}

function TriggerCard({
  trigger,
  index,
}: {
  trigger: (typeof TRIGGERS)[number];
  index: number;
}) {
  const isPrimary = 'primary' in trigger && trigger.primary;

  return (
    <motion.div
      className="relative flex flex-col gap-1.5 p-3.5 md:p-4 rounded-2xl border"
      style={{
        borderColor: isPrimary ? `${trigger.accent}77` : `${trigger.accent}40`,
        background: isPrimary
          ? `linear-gradient(160deg, ${trigger.accent}22 0%, rgba(255,255,255,0.02) 100%)`
          : `${trigger.accent}0c`,
        boxShadow: isPrimary ? `0 0 32px ${trigger.accent}25` : undefined,
      }}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.08 }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded"
          style={{
            color: trigger.accent,
            background: `${trigger.accent}1c`,
            border: `1px solid ${trigger.accent}55`,
            fontSize: 'clamp(9px, 0.72vw, 10.5px)',
          }}
        >
          {trigger.badge}
        </span>
        {isPrimary && (
          <span
            className="font-semibold tracking-widest text-white/55"
            style={{ fontSize: 'clamp(9px, 0.72vw, 10.5px)' }}
          >
            最低限のリズム
          </span>
        )}
      </div>

      <h3
        className={`font-bold leading-snug ${isPrimary ? 'text-white' : 'text-white/92'}`}
        style={{ fontSize: isPrimary ? 'clamp(16px, 1.5vw, 22px)' : 'clamp(13px, 1.15vw, 16px)' }}
      >
        {isPrimary ? (
          <>
            <span style={{ color: trigger.accent }}>{trigger.title}</span>
            <span className="text-white/85 ml-1">はマスト</span>
          </>
        ) : (
          trigger.title
        )}
      </h3>

      <p
        className="text-white/55 leading-snug"
        style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
      >
        {trigger.desc}
      </p>
    </motion.div>
  );
}

export default function Slide79RegulationReview() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.85vw, 11px)' }}
          >
            7-2 · ガバナンス · 規程の見直し
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 34px)' }}
          >
            事業者の規約は
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${GOVERN_ACCENT} 0%, ${PINK_SOFT} 100%)`,
              }}
            >
              止まらない
            </span>
            — 社内規程も同じリズムで追随する
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-3 items-stretch">
          {/* LEFT: 事業者の改訂リズム */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-1">
              <span
                className="tracking-[0.2em] uppercase font-semibold text-white/40"
                style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
              >
                ① 事業者規約の改訂リズム
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="flex flex-col gap-2.5">
              {PROVIDERS.map((p, i) => (
                <ProviderCard key={p.name} provider={p} index={i} />
              ))}
            </div>
          </div>

          {/* BRIDGE */}
          <BridgeArrow />

          {/* RIGHT: 社内規程の見直し視点 */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-1">
              <span
                className="tracking-[0.2em] uppercase font-semibold"
                style={{ color: GOVERN_ACCENT, fontSize: 'clamp(9px, 0.78vw, 11px)' }}
              >
                ② 社内規程 — 見直しのタイミング
              </span>
              <div className="flex-1 h-px" style={{ background: `${GOVERN_ACCENT}33` }} />
            </div>
            <div className="flex flex-col gap-2.5">
              {TRIGGERS.map((t, i) => (
                <TriggerCard key={t.title} trigger={t} index={i} />
              ))}
            </div>
          </div>
        </div>

        <motion.p
          className="text-center text-white/45 leading-snug shrink-0"
          style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          視点 ＝ <span className="text-white/75">既存規程の枠内</span>で、
          <span className="text-white/75">最小の労力</span>で
          <span className="text-white/75">最大の追随効果</span>を狙う
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
