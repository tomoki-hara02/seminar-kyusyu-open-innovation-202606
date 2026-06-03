'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p41: 2-2 アカウントの管理 — 2つの要点
 *
 * ギミック参照:
 * - `templates/BeforeAfter.tsx` … 共有禁止の ✕ マーク
 * - `templates/BentoGrid.tsx` … アカウント別アクセスバー
 * - `templates/Recap.tsx` … 番号バッジ + 要点カード
 */

const POINTS = [
  {
    num: '01',
    message: '生成AIの利用規約上、アカウントの共有は禁止されている',
    accent: '#ff7aa8',
  },
  {
    num: '02',
    message: 'アクセス可能な情報の制限は、アカウントごとに設定する',
    accent: '#88bbff',
  },
];

const ACCESS_PROFILES = [
  { label: 'Account A', level: 85, color: '#88bbff' },
  { label: 'Account B', level: 52, color: '#c8a8ff' },
  { label: 'Account C', level: 28, color: '#60a5fa' },
];

function NoShareVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex items-center justify-center w-full h-36 md:h-40">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center gap-1.5"
          style={{ left: i === 0 ? '22%' : '62%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 + i * 0.12 }}
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg font-bold"
            style={{
              borderColor: `${accent}88`,
              background: `${accent}18`,
              color: accent,
              boxShadow: `0 0 24px ${accent}33`,
            }}
          >
            {i === 0 ? 'A' : 'B'}
          </div>
          <span className="text-[10px] text-white/40 tracking-wider">User</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[32%] right-[32%] top-[38%] h-px border-t border-dashed"
        style={{ borderColor: `${accent}55` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      />

      <motion.div
        className="absolute left-1/2 top-[28%] -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl"
        style={{
          background: `${accent}22`,
          border: `2px solid ${accent}`,
          color: accent,
          boxShadow: `0 0 20px ${accent}55`,
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.65, type: 'spring', stiffness: 260 }}
      >
        ✕
      </motion.div>

      <motion.span
        className="absolute bottom-1 text-[10px] tracking-[0.2em] uppercase"
        style={{ color: `${accent}cc` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Account Sharing Prohibited
      </motion.span>
    </div>
  );
}

function PerAccountAccessVisual() {
  return (
    <div className="flex flex-col gap-3 w-full px-2">
      {ACCESS_PROFILES.map((profile, i) => (
        <motion.div
          key={profile.label}
          className="flex flex-col gap-1.5"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: `${profile.color}22`,
                  border: `1px solid ${profile.color}66`,
                  color: profile.color,
                }}
              >
                {profile.label.slice(-1)}
              </span>
              <span
                className="text-white/70 truncate"
                style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
              >
                {profile.label}
              </span>
            </div>
            <span
              className="tabular-nums shrink-0"
              style={{ color: profile.color, fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              Access {profile.level}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${profile.color}88, ${profile.color})`,
                boxShadow: `0 0 10px ${profile.color}66`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${profile.level}%` }}
              transition={{ duration: 0.75, delay: 0.45 + i * 0.12, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
      <motion.span
        className="text-[10px] tracking-[0.2em] uppercase text-white/35 pt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        Per-Account Access Control
      </motion.span>
    </div>
  );
}

export default function Slide41AccountManagement() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-5xl pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0 text-center items-center">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            2-2 · アカウントの管理
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}
          >
            アカウント管理で
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #ff7aa8 0%, #88bbff 55%, #60a5fa 100%)',
              }}
            >
              押さえる 2 つの要点
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.num}
              className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border min-h-0"
              style={{
                background: `linear-gradient(160deg, ${point.accent}12 0%, rgba(255,255,255,0.03) 100%)`,
                borderColor: `${point.accent}44`,
                boxShadow: `0 24px 48px -24px rgba(0,0,0,0.55), 0 0 36px -12px ${point.accent}33`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg tabular-nums"
                  style={{
                    background: `${point.accent}1f`,
                    border: `1px solid ${point.accent}66`,
                    color: point.accent,
                    boxShadow: `0 0 16px ${point.accent}33`,
                  }}
                >
                  {point.num}
                </div>
                <p
                  className="font-semibold text-white leading-snug pt-1"
                  style={{ fontSize: 'clamp(15px, 1.35vw, 19px)' }}
                >
                  {point.message}
                </p>
              </div>

              <div
                className="rounded-xl border px-3 py-3 md:py-4 min-h-[9.5rem] flex items-center"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.18)',
                }}
              >
                {i === 0 ? (
                  <NoShareVisual accent={point.accent} />
                ) : (
                  <PerAccountAccessVisual />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
