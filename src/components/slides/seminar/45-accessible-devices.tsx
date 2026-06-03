'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p45: 3-2 アクセス可能な端末 — 企業が注意すべきこと
 *
 * ギミック参照:
 * - `templates/BeforeAfter.tsx` … 私用端末 ✕ / 業務端末 ○
 * - `templates/LayeredArch.tsx` … 法的 / 技術的の2層
 * - `templates/Recap.tsx` … 要点カード
 * - `templates/KnowledgeGraph.tsx` … 規程間の連携ネットワーク
 */

const POLICIES = [
  { id: 'ai', label: '生成AI社内規程', x: 50, y: 12 },
  { id: 'work', label: '就業規則', sub: '懲戒処分', x: 14, y: 68 },
  { id: 'sec', label: 'セキュリティポリシー', x: 86, y: 68 },
] as const;

const POLICY_LINKS: [typeof POLICIES[number]['id'], typeof POLICIES[number]['id']][] = [
  ['ai', 'work'],
  ['ai', 'sec'],
  ['work', 'sec'],
];

const APPROACHES = [
  {
    tag: '法的',
    message: '利用可能な端末の指定（業務用PCなど）',
    accent: '#f7c46c',
  },
  {
    tag: '技術的',
    message: '社内端末でないとログインできない — ログインサービス × SSO連携',
    accent: '#88bbff',
  },
];

const TECH_EXAMPLES = [
  {
    vendor: 'Google Workspace',
    feature: 'エンドポイント管理',
    accent: '#f7c46c',
  },
  {
    vendor: 'MS365',
    feature: '条件付きアクセスの設定',
    accent: '#88bbff',
  },
];

function LegalVisual({ accent }: { accent: string }) {
  const byId = Object.fromEntries(POLICIES.map((p) => [p.id, p]));

  return (
    <div className="relative w-full min-h-[8.5rem]">
      <svg viewBox="0 0 100 78" className="absolute inset-0 w-full h-full">
        {POLICY_LINKS.map(([from, to], i) => {
          const A = byId[from];
          const B = byId[to];
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={A.x}
                y1={A.y + 8}
                x2={B.x}
                y2={B.y - 4}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={0.5}
              />
              <motion.line
                x1={A.x}
                y1={A.y + 8}
                x2={B.x}
                y2={B.y - 4}
                stroke={accent}
                strokeWidth={0.55}
                strokeOpacity={0.7}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: 'easeOut' }}
              />
              <motion.line
                x1={A.x}
                y1={A.y + 8}
                x2={B.x}
                y2={B.y - 4}
                stroke={accent}
                strokeWidth={0.7}
                strokeDasharray="1.5 2.5"
                strokeOpacity={0.85}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -10 }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.9 + i * 0.15,
                }}
              />
            </g>
          );
        })}

        <motion.circle
          cx={50}
          cy={44}
          r={3.2}
          fill={`${accent}33`}
          stroke={accent}
          strokeWidth={0.45}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 220 }}
        />
        {POLICIES.map((p) => (
          <motion.line
            key={`hub-${p.id}`}
            x1={50}
            y1={44}
            x2={p.x}
            y2={p.y + (p.id === 'ai' ? 6 : 2)}
            stroke={accent}
            strokeWidth={0.35}
            strokeOpacity={0.35}
            strokeDasharray="1 1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          />
        ))}
      </svg>

      {POLICIES.map((policy, i) => (
        <motion.div
          key={policy.id}
          className="absolute flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-md border text-center -translate-x-1/2 -translate-y-1/2 max-w-[5.5rem]"
          style={{
            left: `${policy.x}%`,
            top: `${policy.y}%`,
            borderColor: `${accent}55`,
            background: 'rgba(10,10,18,0.92)',
            boxShadow: `0 0 16px ${accent}22`,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
        >
          <span
            className="text-white/85 font-semibold leading-tight"
            style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
          >
            {policy.label}
          </span>
          {'sub' in policy && policy.sub ? (
            <span
              className="leading-none"
              style={{ color: accent, fontSize: 'clamp(8px, 0.68vw, 10px)' }}
            >
              （{policy.sub}）
            </span>
          ) : null}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-[56%] -translate-x-1/2 flex flex-col items-center gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <span
          className="font-semibold tracking-wide"
          style={{ color: accent, fontSize: 'clamp(8px, 0.72vw, 10px)' }}
        >
          規程連携
        </span>
        <span className="text-white/35" style={{ fontSize: 'clamp(7px, 0.62vw, 9px)' }}>
          等
        </span>
      </motion.div>
    </div>
  );
}

function NoPersonalAccessVisual() {
  const accent = '#ff7aa8';

  return (
    <div className="relative flex items-center justify-center w-full h-32 md:h-36 overflow-hidden">
      <div
        className="flex items-center justify-center gap-10 md:gap-12 origin-center"
        style={{ transform: 'scale(1.18)' }}
      >
      <motion.div
        className="flex flex-col items-center gap-2.5 opacity-55"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 0.55, x: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <div className="flex items-end gap-3">
          <div
            className="w-9 h-14 rounded-md border-2 flex items-center justify-center text-[11px] font-bold"
            style={{ borderColor: `${accent}66`, background: `${accent}10`, color: accent }}
          >
            SP
          </div>
          <div
            className="w-[4.5rem] h-12 rounded-md border-2 flex items-center justify-center text-[11px] font-bold"
            style={{ borderColor: `${accent}66`, background: `${accent}10`, color: accent }}
          >
            PC
          </div>
        </div>
        <span
          className="text-white/45 tracking-wider line-through decoration-white/30"
          style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}
        >
          私用端末
        </span>
      </motion.div>

      <motion.div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-2xl md:text-3xl shrink-0"
        style={{
          background: `${accent}22`,
          border: `2px solid ${accent}`,
          color: accent,
          boxShadow: `0 0 20px ${accent}55`,
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.5, type: 'spring', stiffness: 260 }}
      >
        ✕
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2.5"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.65 }}
      >
        <div
          className="w-20 h-14 md:w-24 md:h-16 rounded-md border-2 flex items-center justify-center"
          style={{
            borderColor: '#88bbff88',
            background: '#88bbff18',
            boxShadow: '0 0 28px rgba(136,187,255,0.3)',
          }}
        >
          <span
            className="font-bold text-[#88bbff]"
            style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
          >
            Biz PC
          </span>
        </div>
        <span
          className="text-[#88bbff] tracking-wider font-medium"
          style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}
        >
          業務端末のみ
        </span>
      </motion.div>
      </div>
    </div>
  );
}

function TechnicalVisual({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {TECH_EXAMPLES.map((ex, i) => (
        <motion.div
          key={ex.vendor}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border"
          style={{
            borderColor: `${ex.accent}44`,
            background: `linear-gradient(90deg, ${ex.accent}10 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
        >
          <div
            className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[10px]"
            style={{
              color: ex.accent,
              border: `1px solid ${ex.accent}55`,
              background: `${ex.accent}18`,
              boxShadow: `0 0 12px ${ex.accent}33`,
            }}
          >
            {i === 0 ? 'G' : 'M'}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className="font-semibold text-white leading-snug"
              style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
            >
              {ex.vendor}
            </span>
            <span
              className="text-white/55 leading-snug"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              {ex.feature}
            </span>
          </div>
          <motion.span
            className="ml-auto shrink-0 text-[10px] font-mono tracking-wider"
            style={{ color: accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 + i * 0.1 }}
          >
            SSO
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Slide45AccessibleDevices() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-7 w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            3-2 · アクセス可能な端末
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            企業が
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #ff7aa8 0%, #c8a8ff 50%, #88bbff 100%)',
              }}
            >
              注意すべきこと
            </span>
          </h2>
        </div>

        <motion.div
          className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border"
          style={{
            borderColor: 'rgba(255,122,168,0.35)',
            background: 'linear-gradient(160deg, rgba(255,122,168,0.12) 0%, rgba(255,255,255,0.03) 100%)',
            boxShadow: '0 24px 48px -24px rgba(0,0,0,0.55)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <p
            className="font-bold text-white text-center leading-snug"
            style={{ fontSize: 'clamp(17px, 1.6vw, 24px)' }}
          >
            私用端末からのアクセスを認めない
          </p>
          <div
            className="rounded-xl border px-3 py-2"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.16)',
            }}
          >
            <NoPersonalAccessVisual />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPROACHES.map((item, i) => (
            <motion.div
              key={item.tag}
              className="relative flex flex-col gap-3 p-4 md:p-5 rounded-xl border overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${item.accent}14 0%, rgba(255,255,255,0.03) 70%, transparent 100%)`,
                borderColor: `${item.accent}33`,
              }}
              initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: item.accent,
                  boxShadow: `0 0 12px ${item.accent}aa`,
                }}
              />

              <div className="flex items-start gap-3 pl-2">
                <span
                  className="shrink-0 px-2.5 py-1 rounded-md border text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    color: item.accent,
                    borderColor: `${item.accent}66`,
                    background: `${item.accent}14`,
                  }}
                >
                  {item.tag}
                </span>
                <p
                  className="font-semibold text-white leading-snug"
                  style={{ fontSize: 'clamp(13px, 1.15vw, 16px)' }}
                >
                  {item.message}
                </p>
              </div>

              <div
                className="rounded-lg border px-3 py-3 min-h-[8.5rem] flex items-center ml-2"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.14)',
                }}
              >
                {i === 0 ? (
                  <LegalVisual accent={item.accent} />
                ) : (
                  <TechnicalVisual accent={item.accent} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
