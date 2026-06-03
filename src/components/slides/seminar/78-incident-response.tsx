'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 7-1 違反時の対応 — インシデント対応の基本フロー
 *
 * 構成:
 *   ① 種類を見極める   — 規程準拠 / 規程非準拠
 *   ② 保全する         — ログ・入出力情報・関連資料（証拠保全）
 *   ③ 特定する         — 影響を受ける関係者
 *   ④ 連携する         — 専門家の支援を確保
 */

const INCIDENT_ACCENT = '#ff7aa8';
const COMPLIANT_ACCENT = '#9ee0a8';
const VIOLATION_ACCENT = '#ff9966';
const LAW_ACCENT = '#60a5fa';
const TRACE_ACCENT = '#88bbff';
const PEOPLE_ACCENT = '#c8a8ff';
const EXPERT_ACCENT = '#f7c46c';

const INCIDENT_TYPES = [
  {
    badge: '①',
    label: '規程に則って生じた',
    title: 'コンプライアントなインシデント',
    desc: '規程通り運用したにもかかわらず発生 — 規程・仕組みの限界が露呈したケース',
    next: '→ 規程の見直しに反映（7-2 へ）',
    accent: COMPLIANT_ACCENT,
  },
  {
    badge: '②',
    label: '規程に則らず生じた',
    title: '規程違反・逸脱型インシデント',
    desc: '規程・社内ルールから逸脱した行為が原因 — 違反者対応＋規程の周知・教育不足の検証も必要',
    next: '→ 違反者対応＋リテラシー向上（7-3 へ）',
    accent: VIOLATION_ACCENT,
  },
] as const;

const ACTIONS = [
  {
    num: '01',
    title: '保全（証拠保全）',
    accent: TRACE_ACCENT,
    icon: '🔒',
    items: [
      'ログ — 作業ログ・操作ログ（p75 と同じ視点で）',
      '入力情報・出力情報',
      '関連資料・記録（メール／チャット／契約書 等）',
    ],
    note: '改変・削除前に「現状のまま」確保するのが大原則',
  },
  {
    num: '02',
    title: '関係者の特定',
    accent: PEOPLE_ACCENT,
    icon: '👥',
    items: [
      '秘密情報漏洩 → 秘密情報の提供者',
      '個人データ漏洩 → 個人データの本人',
      '著作物の侵害可能性 → 当該著作権者',
    ],
    note: '通知・謝罪・是正の射程を最初に把握する',
  },
  {
    num: '03',
    title: '専門家支援の確保',
    accent: EXPERT_ACCENT,
    icon: '⚖',
    items: [
      '法務（社内・外部弁護士）',
      'セキュリティ（CSIRT・ベンダ）',
      '関連監督官庁（個情委・所管省庁 等）',
    ],
    note: '判断を抱え込まず、初動から相談ルートを動かす',
  },
] as const;

function TypeCard({
  type,
  index,
}: {
  type: (typeof INCIDENT_TYPES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2 p-3.5 md:p-4 rounded-2xl border h-full"
      style={{
        borderColor: `${type.accent}55`,
        background: `linear-gradient(160deg, ${type.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border font-bold"
          style={{
            color: type.accent,
            borderColor: `${type.accent}66`,
            background: `${type.accent}18`,
            fontSize: 'clamp(13px, 1.1vw, 16px)',
          }}
        >
          {type.badge}
        </span>
        <div className="flex flex-col leading-tight gap-0.5 min-w-0">
          <span
            className="tracking-[0.18em] uppercase text-white/45 font-semibold"
            style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}
          >
            {type.label}
          </span>
          <span
            className="font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(13px, 1.18vw, 17px)' }}
          >
            {type.title}
          </span>
        </div>
      </div>

      <p
        className="text-white/70 leading-snug"
        style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
      >
        {type.desc}
      </p>

      <div
        className="mt-auto pt-2 border-t"
        style={{ borderColor: `${type.accent}33` }}
      >
        <p
          className="font-semibold leading-snug"
          style={{ color: type.accent, fontSize: 'clamp(11px, 0.92vw, 13px)' }}
        >
          {type.next}
        </p>
      </div>
    </motion.div>
  );
}

function ActionCard({
  action,
  index,
}: {
  action: (typeof ACTIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-2 p-3.5 md:p-4 rounded-2xl border h-full"
      style={{
        borderColor: `${action.accent}55`,
        background: `linear-gradient(160deg, ${action.accent}10 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: `0 0 28px -10px ${action.accent}33`,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45 + index * 0.08 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="font-mono font-bold tabular-nums"
            style={{ color: action.accent, fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            {action.num}
          </span>
          <h3
            className="font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(13px, 1.2vw, 17px)' }}
          >
            {action.title}
          </h3>
        </div>
        <span
          className="shrink-0"
          style={{ fontSize: 'clamp(15px, 1.4vw, 19px)' }}
          aria-hidden
        >
          {action.icon}
        </span>
      </div>

      <ul className="flex flex-col gap-1">
        {action.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-1.5 text-white/78 leading-snug"
            style={{ fontSize: 'clamp(10.5px, 0.9vw, 12.5px)' }}
          >
            <span
              className="shrink-0 mt-1.5 w-1 h-1 rounded-full"
              style={{ background: action.accent }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-auto pt-2 border-t"
        style={{ borderColor: `${action.accent}28` }}
      >
        <p
          className="text-white/55 leading-snug italic"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          {action.note}
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide78IncidentResponse() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            7-1 · ガバナンス · 違反時の対応
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
          >
            インシデントが起きたら —
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${INCIDENT_ACCENT} 0%, ${EXPERT_ACCENT} 100%)`,
              }}
            >
              見極める・保全する・動く
            </span>
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            「何のインシデントか」で事後対応の射程が変わり、共通の3アクションで初動の質が決まる
          </p>
        </div>

        {/* STEP 1: 種類の見極め */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: INCIDENT_ACCENT,
                borderColor: `${INCIDENT_ACCENT}66`,
                background: `${INCIDENT_ACCENT}1c`,
                fontSize: 'clamp(9px, 0.72vw, 10.5px)',
              }}
            >
              STEP 1
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              種類を見極める — 事後の打ち手が変わる
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            {INCIDENT_TYPES.map((t, i) => (
              <TypeCard key={t.badge} type={t} index={i} />
            ))}
          </div>
        </div>

        {/* STEP 2-4: 共通アクション */}
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
              STEP 2–4
            </span>
            <span
              className="font-semibold text-white/65 tracking-wider"
              style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
            >
              共通の初動 — 種類によらず必ず通すべき3アクション
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {ACTIONS.map((a, i) => (
              <ActionCard key={a.num} action={a} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
