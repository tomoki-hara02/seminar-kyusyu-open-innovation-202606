'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * ワークショップ用 架空企業 KPI 比較（左） ＋ IT 環境（右）の 2 カラム構成。
 */

/* ─────────────────── KPI 型定義 ─────────────────── */
type Kpi = {
  label: string;
  area: string;
  current: { value: string; raw: number };
  target:  { value: string; raw: number };
  gap:     { value: string };
  accent: string;
  Icon: React.FC<{ color: string; size?: number }>;
  isShorter?: boolean;
};

/* ─────────────────── KPI アイコン ─────────────────── */
const IconRevenue: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconProfit: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
);
const IconPercent: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const IconCart: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconUsers: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconClock: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─────────────────── IT 環境アイコン ─────────────────── */
const IconChat: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconServer: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const IconFolder: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconShop: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const IconClipboard: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

/* ─────────────────── データ ─────────────────── */
const KPIS: Kpi[] = [
  { label: '売上高',           area: 'TOP LINE',    current: { value: '18.5億', raw: 18.5 }, target: { value: '22.0億', raw: 22.0 }, gap: { value: '+3.5億' },    accent: '#88bbff', Icon: IconRevenue },
  { label: '経常利益',         area: 'PROFIT',      current: { value: '5,000万', raw: 0.5 }, target: { value: '1.1億',   raw: 1.1  }, gap: { value: '+6,000万' }, accent: '#9ee0a8', Icon: IconProfit },
  { label: '経常利益率',       area: 'MARGIN',      current: { value: '2.7%',  raw: 2.7  }, target: { value: '5.0%',  raw: 5.0  }, gap: { value: '+2.3pt' },   accent: '#ffaacc', Icon: IconPercent },
  { label: 'EC売上比率',       area: 'CHANNEL MIX', current: { value: '20%',   raw: 20   }, target: { value: '30%',   raw: 30   }, gap: { value: '+10pt' },    accent: '#c8a8ff', Icon: IconCart },
  { label: '1人あたり粗利',    area: 'PRODUCTIVITY',current: { value: '670万', raw: 670  }, target: { value: '850万', raw: 850  }, gap: { value: '+180万' },   accent: '#f7c46c', Icon: IconUsers },
  { label: '新規商品リードタイム', area: 'SPEED',   current: { value: '4〜6ヶ月', raw: 5 }, target: { value: '3ヶ月以内', raw: 3 }, gap: { value: '−2ヶ月' },  accent: '#7bd3ff', Icon: IconClock, isShorter: true },
];

type ItTool = {
  category: string;
  tool: string;
  desc: string;
  accent: string;
  tag: 'legacy' | 'mixed' | 'modern';
  Icon: React.FC<{ color: string; size?: number }>;
};

const IT_TOOLS: ItTool[] = [
  {
    category: '社内コミュニケーション',
    tool: '電話・FAX ／ LINE WORKS ／ 一部 Slack',
    desc: '部署によりバラバラ。製造現場は電話・FAX、企画・ECはLINE WORKSと一部Slack',
    accent: '#f7c46c',
    tag: 'mixed',
    Icon: IconChat,
  },
  {
    category: '基幹システム（生産・在庫）',
    tool: 'オンプレミス独自システム',
    desc: '15年前に構築。データ抽出は情シスへの依頼が必要',
    accent: '#ff9999',
    tag: 'legacy',
    Icon: IconServer,
  },
  {
    category: 'ファイル管理',
    tool: 'ローカルサーバー（共有フォルダ）',
    desc: 'Excel・PDFが散在。バージョン管理が煩雑',
    accent: '#ffbb88',
    tag: 'legacy',
    Icon: IconFolder,
  },
  {
    category: 'EC プラットフォーム',
    tool: 'Shopify',
    desc: '3年前にリニューアル。顧客データ・購買履歴はここに蓄積',
    accent: '#9ee0a8',
    tag: 'modern',
    Icon: IconShop,
  },
  {
    category: 'OEM 受注管理',
    tool: 'Excel ／ PDF ／ 一部 FAX',
    desc: '顧客指定フォーマットを営業が手入力で転記',
    accent: '#ff9999',
    tag: 'legacy',
    Icon: IconClipboard,
  },
];

const TAG_LABEL: Record<ItTool['tag'], string> = {
  legacy: 'レガシー',
  mixed:  'バラバラ',
  modern: 'モダン',
};

/* ─────────────────── コンポーネント ─────────────────── */
export default function Slide15FictionalKpi() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-7xl px-2 py-2 pt-12 gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex items-end gap-4">
          <div className="flex flex-col gap-0.5">
            <span
              className="tracking-[0.22em] uppercase text-white/30"
              style={{ fontSize: 'clamp(9px, 0.9vw, 13px)' }}
            >
              Workshop · Company Profile · 2/3
            </span>
            <h2
              className="font-bold tracking-tight text-white leading-tight whitespace-nowrap"
              style={{ fontSize: 'clamp(20px, 2.8vw, 40px)' }}
            >
              経営目標 &amp; IT 環境
              <span
                className="bg-clip-text text-transparent ml-3"
                style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #9ee0a8 50%, #ffaacc 100%)' }}
              >
                架空企業プロファイル
              </span>
            </h2>
          </div>
        </div>

        {/* 2カラム */}
        <div className="flex flex-row gap-3 flex-1 min-h-0">

          {/* ── 左：経営目標 KPI テーブル ── */}
          <motion.div
            className="flex flex-col gap-1.5 flex-1 min-w-0"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* 左カラムヘッダー */}
            <div className="shrink-0 flex items-center gap-2 px-1">
              <span className="w-1 h-4 rounded-full bg-[#88bbff]" />
              <span
                className="font-semibold tracking-wide text-white/70"
                style={{ fontSize: 'clamp(10px, 1.1vw, 15px)' }}
              >
                経営目標
              </span>
              <span
                className="text-white/35 tracking-widest"
                style={{ fontSize: 'clamp(9px, 0.85vw, 12px)' }}
              >
                第54期 → 第55期
              </span>
            </div>

            {/* テーブル枠 */}
            <div className="flex-1 flex flex-col rounded-xl border border-white/10 overflow-hidden min-h-0">
              {/* ヘッダー行 */}
              <div
                className="grid shrink-0 border-b border-white/10"
                style={{
                  gridTemplateColumns: '2fr 1fr 1fr 1.1fr',
                  background: 'rgba(255,255,255,0.03)',
                  padding: 'clamp(4px, 0.5vw, 8px) clamp(8px, 1vw, 16px)',
                }}
              >
                {['指標', '現状', '目標', 'GAP'].map((h, i) => (
                  <span
                    key={h}
                    className={`tracking-[0.2em] uppercase text-white/40 ${i > 0 ? 'text-right' : ''}`}
                    style={{ fontSize: 'clamp(8px, 0.8vw, 11px)' }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* 行 */}
              {KPIS.map((k, i) => (
                <motion.div
                  key={k.label}
                  className="grid border-b border-white/5 last:border-b-0 items-center flex-1 min-h-0"
                  style={{
                    gridTemplateColumns: '2fr 1fr 1fr 1.1fr',
                    padding: 'clamp(3px, 0.4vw, 6px) clamp(8px, 1vw, 16px)',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                >
                  {/* 指標名 */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className="rounded-md flex items-center justify-center shrink-0"
                      style={{
                        width: 'clamp(22px, 2.2vw, 32px)',
                        height: 'clamp(22px, 2.2vw, 32px)',
                        background: `linear-gradient(135deg, ${k.accent}33, ${k.accent}10)`,
                        border: `1px solid ${k.accent}55`,
                      }}
                    >
                      <k.Icon color={k.accent} size={14} />
                    </div>
                    <div className="flex flex-col gap-0 min-w-0">
                      <span
                        className="font-bold text-white leading-tight truncate"
                        style={{ fontSize: 'clamp(10px, 1.1vw, 15px)' }}
                      >
                        {k.label}
                      </span>
                      <span
                        className="tracking-[0.18em] uppercase"
                        style={{ color: `${k.accent}99`, fontSize: 'clamp(7px, 0.7vw, 10px)' }}
                      >
                        {k.area}
                      </span>
                    </div>
                  </div>

                  {/* 現状 */}
                  <div className="text-right">
                    <span
                      className="font-bold font-mono tabular-nums text-white/50"
                      style={{ fontSize: 'clamp(10px, 1.1vw, 15px)' }}
                    >
                      {k.current.value}
                    </span>
                  </div>

                  {/* 目標 */}
                  <div className="text-right">
                    <span
                      className="font-bold font-mono tabular-nums"
                      style={{ color: k.accent, fontSize: 'clamp(11px, 1.2vw, 17px)', filter: `drop-shadow(0 0 6px ${k.accent}55)` }}
                    >
                      {k.target.value}
                    </span>
                  </div>

                  {/* GAP */}
                  <div className="text-right">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full font-bold font-mono tabular-nums"
                      style={{
                        color: k.accent,
                        background: `${k.accent}1c`,
                        border: `1px solid ${k.accent}55`,
                        fontSize: 'clamp(9px, 0.9vw, 13px)',
                      }}
                    >
                      {k.gap.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 縦区切り */}
          <div className="w-px shrink-0 bg-white/10 self-stretch" />

          {/* ── 右：IT 環境 ── */}
          <motion.div
            className="flex flex-col gap-1.5 flex-1 min-w-0"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* 右カラムヘッダー */}
            <div className="shrink-0 flex items-center gap-2 px-1">
              <span className="w-1 h-4 rounded-full bg-[#f7c46c]" />
              <span
                className="font-semibold tracking-wide text-white/70"
                style={{ fontSize: 'clamp(10px, 1.1vw, 15px)' }}
              >
                IT 環境
              </span>
              <span
                className="text-white/35 tracking-widest"
                style={{ fontSize: 'clamp(9px, 0.85vw, 12px)' }}
              >
                利用中のシステム構成
              </span>
            </div>

            {/* IT ツールカード群 */}
            <div className="flex flex-col gap-1.5 flex-1 min-h-0">
              {IT_TOOLS.map((t, i) => (
                <motion.div
                  key={t.category}
                  className="flex flex-row items-center gap-2.5 rounded-xl border flex-1 min-h-0 overflow-hidden"
                  style={{
                    borderColor: `${t.accent}33`,
                    background: `linear-gradient(90deg, ${t.accent}0d 0%, transparent 60%)`,
                    padding: 'clamp(4px, 0.5vw, 10px) clamp(8px, 1vw, 16px)',
                  }}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                >
                  {/* アイコン */}
                  <div
                    className="rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      width: 'clamp(28px, 2.8vw, 40px)',
                      height: 'clamp(28px, 2.8vw, 40px)',
                      background: `linear-gradient(135deg, ${t.accent}33, ${t.accent}10)`,
                      border: `1px solid ${t.accent}55`,
                    }}
                  >
                    <t.Icon color={t.accent} size={16} />
                  </div>

                  {/* テキスト */}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono tracking-widest uppercase"
                        style={{ color: `${t.accent}bb`, fontSize: 'clamp(7px, 0.7vw, 10px)' }}
                      >
                        {t.category}
                      </span>
                      {/* タグ */}
                      <span
                        className="px-1.5 py-px rounded-full font-bold tracking-wide"
                        style={{
                          color: t.accent,
                          background: `${t.accent}22`,
                          border: `1px solid ${t.accent}44`,
                          fontSize: 'clamp(7px, 0.65vw, 10px)',
                        }}
                      >
                        {TAG_LABEL[t.tag]}
                      </span>
                    </div>
                    <span
                      className="font-bold text-white leading-tight"
                      style={{ fontSize: 'clamp(10px, 1.1vw, 15px)' }}
                    >
                      {t.tool}
                    </span>
                    <span
                      className="text-white/55 leading-snug"
                      style={{ fontSize: 'clamp(9px, 0.9vw, 13px)' }}
                    >
                      {t.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
