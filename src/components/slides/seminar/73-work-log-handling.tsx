'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p73: 6-1 記録 — 作業ログの取扱い
 *
 * 3W で構成:
 *   WHY  なぜ残すか        — 法的証拠 / 創作性判断 / 社内改善
 *   WHAT 特に残すべきは    — 権利義務付着系の処理（p51 5法令・p73 個別審査と整合）
 *   HOW  どう残すか        — チャット形式は自動／エージェント・Claude Code は自分で残す
 */

const LOG_ACCENT = '#f2d160';
const LOG_GRAD: [string, string] = ['#e0bb3a', '#a98a17'];
const FOCUS_ACCENT = '#ff7aa8';
const OK_ACCENT = '#9ee0a8';
const WARN_ACCENT = '#ff9966';

const WHY_ROLES = [
  {
    icon: '⚖',
    title: '法的証拠',
    desc: '著作権・個人データ・秘密情報の取扱いを後から立証できる',
    accent: '#88bbff',
  },
  {
    icon: '✎',
    title: '創作性判断',
    desc: '生成物に創作性が認められるかの判断資料になる',
    accent: '#c8a8ff',
  },
  {
    icon: '↗',
    title: '改善ヒント',
    desc: '社内の生成AI活用を継続的に改善するための材料になる',
    accent: LOG_ACCENT,
  },
] as const;

const FOCUS_TAGS = ['個人情報', '著作物', '営業秘密', 'NDA対象'];

const HOW_PATTERNS = [
  {
    mark: '○',
    kind: 'チャット形式',
    examples: 'ChatGPT / Claude.ai / Gemini など',
    status: '自動でスレッドに残る',
    note: 'スレッド単位で時系列が保たれるため、原則そのまま審査・証拠資料として使える',
    accent: OK_ACCENT,
  },
  {
    mark: '×',
    kind: 'エージェント / Claude Code 等',
    examples: 'ブラウザエージェント・MCP・コーディングエージェント',
    status: 'スレッド単位では残らない',
    note: '実行ログ・プロンプト・差分・スクリーンショット等を「自分で残す仕組み」を別途用意する',
    accent: WARN_ACCENT,
  },
] as const;

function RoleCard({
  role,
  index,
}: {
  role: (typeof WHY_ROLES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-start gap-2 p-3 md:p-3.5 rounded-2xl border h-full"
      style={{
        borderColor: `${role.accent}44`,
        background: `linear-gradient(160deg, ${role.accent}12 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-lg border font-bold"
          style={{
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: role.accent,
            borderColor: `${role.accent}55`,
            background: `${role.accent}14`,
          }}
          aria-hidden
        >
          {role.icon}
        </span>
        <span
          className="font-bold text-white tracking-tight"
          style={{ fontSize: 'clamp(13px, 1.15vw, 16px)' }}
        >
          {role.title}
        </span>
      </div>
      <p
        className="text-white/72 leading-snug"
        style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
      >
        {role.desc}
      </p>
    </motion.div>
  );
}

function HowCard({
  pattern,
  index,
}: {
  pattern: (typeof HOW_PATTERNS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-2 p-3.5 md:p-4 rounded-2xl border h-full overflow-hidden"
      style={{
        borderColor: `${pattern.accent}55`,
        background: `linear-gradient(160deg, ${pattern.accent}12 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, x: index === 0 ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.08 }}
    >
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border font-bold"
          style={{
            color: pattern.accent,
            borderColor: `${pattern.accent}88`,
            background: `${pattern.accent}1c`,
            fontSize: 'clamp(15px, 1.3vw, 18px)',
          }}
          aria-hidden
        >
          {pattern.mark}
        </span>
        <div className="flex flex-col leading-none gap-0.5 min-w-0">
          <span
            className="font-bold text-white tracking-tight truncate"
            style={{ fontSize: 'clamp(13px, 1.18vw, 16px)' }}
          >
            {pattern.kind}
          </span>
          <span
            className="text-white/45 truncate"
            style={{ fontSize: 'clamp(10px, 0.82vw, 11.5px)' }}
          >
            {pattern.examples}
          </span>
        </div>
      </div>

      <p
        className="font-semibold leading-snug"
        style={{ color: pattern.accent, fontSize: 'clamp(12px, 1.05vw, 14.5px)' }}
      >
        {pattern.status}
      </p>

      <p
        className="text-white/65 leading-snug"
        style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
      >
        {pattern.note}
      </p>
    </motion.div>
  );
}

export default function Slide73WorkLogHandling() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            6-1 · 記録 · 作業ログの取扱い
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LOG_GRAD[0]} 0%, ${LOG_GRAD[1]} 100%)`,
              }}
            >
              作業ログ
            </span>
            <span className="text-white/55 mx-1.5">—</span>
            なぜ残し、何を特に残し、どう残すか
          </h2>
        </div>

        {/* WHY */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: LOG_ACCENT,
                borderColor: `${LOG_ACCENT}66`,
                background: `${LOG_ACCENT}14`,
                fontSize: 'clamp(10px, 0.72vw, 10.5px)',
              }}
            >
              WHY
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              なぜ残すか
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {WHY_ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>

        {/* WHAT */}
        <motion.div
          className="flex flex-col gap-2.5 p-3.5 md:p-4 rounded-2xl border"
          style={{
            borderColor: `${FOCUS_ACCENT}55`,
            background: `linear-gradient(135deg, ${FOCUS_ACCENT}16 0%, rgba(255,255,255,0.02) 100%)`,
            boxShadow: `0 0 28px -10px ${FOCUS_ACCENT}55`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: FOCUS_ACCENT,
                borderColor: `${FOCUS_ACCENT}77`,
                background: `${FOCUS_ACCENT}1c`,
                fontSize: 'clamp(10px, 0.72vw, 10.5px)',
              }}
            >
              WHAT
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              特に残すべきは
            </span>
            <div className="flex-1 h-px" style={{ background: `${FOCUS_ACCENT}33` }} />
          </div>
          <p
            className="font-bold text-white leading-snug"
            style={{ fontSize: 'clamp(14px, 1.3vw, 19px)' }}
          >
            <span style={{ color: FOCUS_ACCENT }}>法的な権利義務が付着する処理</span>
            <span className="text-white/85"> のログ</span>
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {FOCUS_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded font-semibold"
                style={{
                  color: FOCUS_ACCENT,
                  background: `${FOCUS_ACCENT}14`,
                  border: `1px solid ${FOCUS_ACCENT}40`,
                  fontSize: 'clamp(10px, 0.85vw, 12px)',
                }}
              >
                {tag}
              </span>
            ))}
            <span
              className="text-white/45 leading-snug"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              … リスクベースで「絞って残す」と運用が続く
            </span>
          </div>
        </motion.div>

        {/* HOW */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: OK_ACCENT,
                borderColor: `${OK_ACCENT}66`,
                background: `${OK_ACCENT}14`,
                fontSize: 'clamp(10px, 0.72vw, 10.5px)',
              }}
            >
              HOW
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              どう残すか — ツールによって残り方が違う
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            {HOW_PATTERNS.map((p, i) => (
              <HowCard key={p.kind} pattern={p} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
