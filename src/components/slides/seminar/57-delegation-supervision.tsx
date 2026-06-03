'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 4-4 個人情報 — 委託先の監督（第三者認証 × PDCA）
 *
 * 構成:
 *   上: 主要生成AIサービスが取得する第三者認証の例（OpenAI / Anthropic / Google）
 *   中: 第三者機関の監査を通じた委託運用 = 法25条 委託先監督義務を満たす形
 *   下: 委託先の監督における PDCA サイクル
 */

const LAW_ACCENT = '#60a5fa';
const CHAPTER_ACCENT = '#9ee0a8';
const BRIDGE_ACCENT = '#f7c46c';

const PROVIDERS = [
  {
    name: 'OpenAI',
    accent: '#10b981',
    certs: ['SOC 2 Type II', 'CSA STAR', 'HIPAA-eligible (Enterprise)'],
  },
  {
    name: 'Anthropic',
    accent: '#e8b86d',
    certs: ['SOC 2 Type II', 'ISO 27001', 'HIPAA-eligible (Claude for Work)'],
  },
  {
    name: 'Google',
    accent: '#60a5fa',
    certs: ['SOC 1/2/3', 'ISO 27001 / 27017 / 27018', 'HIPAA-eligible'],
  },
] as const;

const PDCA_STEPS = [
  {
    phase: 'Plan',
    title: '委託先の選定',
    desc: '安全管理体制の確立をチェック',
    accent: LAW_ACCENT,
  },
  {
    phase: 'Do',
    title: '委任契約の締結',
    desc: 'サービス利用規約の確認',
    accent: '#88bbff',
  },
  {
    phase: 'Check',
    title: '取扱状況の把握',
    desc: '第三者機関レポートの確認',
    accent: '#c8a8ff',
  },
  {
    phase: 'Act',
    title: 'プロセスの見直し',
    desc: '改善点を次のPlanへ反映',
    accent: CHAPTER_ACCENT,
  },
] as const;

function ProviderCard({
  provider,
  index,
}: {
  provider: (typeof PROVIDERS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2 p-3 md:p-3.5 rounded-2xl border h-full"
      style={{
        borderColor: `${provider.accent}55`,
        background: `linear-gradient(160deg, ${provider.accent}12 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07 }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: provider.accent, boxShadow: `0 0 8px ${provider.accent}` }}
        />
        <span
          className="font-bold text-white tracking-tight"
          style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}
        >
          {provider.name}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {provider.certs.map((cert) => (
          <li
            key={cert}
            className="flex items-start gap-1.5 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            <span
              className="shrink-0 mt-1.5 w-1 h-1 rounded-full"
              style={{ background: provider.accent }}
            />
            <span className="text-white/75">{cert}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PdcaCard({
  step,
  index,
  showCycleHint,
}: {
  step: (typeof PDCA_STEPS)[number];
  index: number;
  showCycleHint: boolean;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-1 p-3 rounded-2xl border h-full"
      style={{
        borderColor: `${step.accent}55`,
        background: `linear-gradient(160deg, ${step.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.55 + index * 0.08 }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
          style={{
            color: step.accent,
            borderColor: `${step.accent}88`,
            background: `${step.accent}1c`,
            fontSize: 'clamp(9px, 0.78vw, 11px)',
          }}
        >
          {step.phase}
        </span>
        {showCycleHint && (
          <span
            className="font-mono text-white/35 tracking-wider leading-none"
            style={{ fontSize: 'clamp(9px, 0.72vw, 10.5px)' }}
          >
            ↻ サイクル継続
          </span>
        )}
      </div>
      <p
        className="font-bold text-white leading-snug"
        style={{ fontSize: 'clamp(13px, 1.12vw, 16px)' }}
      >
        {step.title}
      </p>
      <p
        className="text-white/65 leading-snug"
        style={{ fontSize: 'clamp(10.5px, 0.9vw, 12.5px)' }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

function PdcaArrow({ index }: { index: number }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
    >
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
        <path
          d="M0 7 H15 M11 3 L15 7 L11 11"
          stroke={`${BRIDGE_ACCENT}cc`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function Slide57DelegationSupervision() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報 · 委託先の監督
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.3vw, 32px)' }}
          >
            第三者機関の監査を通じて
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              委託の要件
            </span>
            を満たす運用
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            主要サービスが取得する第三者認証を出発点に、PDCAサイクルで継続監督
          </p>
        </div>

        {/* 第三者認証の例 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: LAW_ACCENT,
                borderColor: `${LAW_ACCENT}66`,
                background: `${LAW_ACCENT}1c`,
                fontSize: 'clamp(9px, 0.72vw, 10.5px)',
              }}
            >
              EXAMPLES
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              主要生成AIサービスが取得する第三者認証（例）
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3 items-stretch">
            {PROVIDERS.map((p, i) => (
              <ProviderCard key={p.name} provider={p} index={i} />
            ))}
          </div>
        </div>

        {/* ブリッジメッセージ */}
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl border shrink-0"
          style={{
            borderColor: `${BRIDGE_ACCENT}55`,
            background: `linear-gradient(135deg, ${BRIDGE_ACCENT}14 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <span
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border font-bold"
            style={{
              color: BRIDGE_ACCENT,
              borderColor: `${BRIDGE_ACCENT}88`,
              background: `${BRIDGE_ACCENT}1c`,
              fontSize: 'clamp(13px, 1.1vw, 15px)',
            }}
            aria-hidden
          >
            →
          </span>
          <p
            className="text-white/85 leading-snug"
            style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
          >
            これら<span className="text-white font-semibold">第三者機関の監査</span>を通じた委託運用にすることで、
            <span style={{ color: BRIDGE_ACCENT }} className="font-semibold">法25条 委託先監督義務</span>
            の要件を満たす形を取りやすくなる。
          </p>
        </motion.div>

        {/* PDCA サイクル */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: CHAPTER_ACCENT,
                borderColor: `${CHAPTER_ACCENT}66`,
                background: `${CHAPTER_ACCENT}1c`,
                fontSize: 'clamp(9px, 0.72vw, 10.5px)',
              }}
            >
              PDCA
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              委託先の監督 — 想定されるサイクル
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex items-stretch gap-2 md:gap-2.5">
            {PDCA_STEPS.map((step, i) => (
              <div key={step.phase} className="flex items-stretch gap-2 md:gap-2.5 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <PdcaCard
                    step={step}
                    index={i}
                    showCycleHint={i === PDCA_STEPS.length - 1}
                  />
                </div>
                {i < PDCA_STEPS.length - 1 && <PdcaArrow index={i} />}
              </div>
            ))}
          </div>

          {/* recycle ヒント */}
          <motion.div
            className="flex items-center justify-center gap-2 pt-1 text-white/40"
            style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
          >
            <span className="inline-block w-6 h-px bg-white/15" />
            <span>Act の結果は次の Plan に反映 — サイクルが回ることで委託監督の実効性が担保される</span>
            <span className="inline-block w-6 h-px bg-white/15" />
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
