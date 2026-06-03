'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p24: リスクベースアプローチ — 具体例
 *
 * チャット形式のアニメーションで 2 つの対話を順番に表示。
 * 各会話の下にリスクレベルバッジ（CRITICAL / LOW）を添えて直感的に比較させる。
 */

type Message = {
  from: 'employee' | 'president';
  name: string;
  text: string;
};

type Case = {
  id: string;
  label: string;
  messages: Message[];
  level: 'critical' | 'low';
};

const CASES: Case[] = [
  {
    id: 'case2',
    label: 'Example 1',
    messages: [
      {
        from: 'president',
        name: '社長',
        text: 'そろそろ各取引先に挨拶をする時期だな。今年もわが社のレターを送らないとだな。',
      },
      {
        from: 'employee',
        name: '従業員 A',
        text: 'そうですね！去年は調べるのに時間がかかって結構大変でした。早めに取り掛かった方がいいですかね。',
      },
      {
        from: 'employee',
        name: '従業員 A',
        text: 'そうだ、季節の挨拶文を生成AIで出して、気に入ったものを採用する方が０から考えるより早いです！',
      },
      {
        from: 'president',
        name: '社長',
        text: 'まぁ、それならいいだろう。',
      },
    ],
    level: 'low',
  },
  {
    id: 'case1',
    label: 'Example 2',
    messages: [
      {
        from: 'employee',
        name: '従業員 A',
        text: '社長、昨日の会議は大変お疲れさまでした。商談成立まであと一歩ですね。',
      },
      {
        from: 'president',
        name: '社長',
        text: 'そうだな、昨日の会議内容に応じて補足の提案資料があればよさそうだ。頼めるか？',
      },
      {
        from: 'employee',
        name: '従業員 A',
        text: 'お任せください！ちなみに先日の会議の議事録をAIに読み込ませて資料化するのはどうでしょうか？',
      },
      {
        from: 'president',
        name: '社長',
        text: '万が一でも漏洩したら、わが社は終わりだぞ！',
      },
    ],
    level: 'critical',
  },
];

const LEVEL_CONFIG = {
  critical: {
    label: 'CRITICAL',
    jp: '極高リスク',
    color: '#ff5560',
    soft: '#ff556020',
    border: '#ff556066',
    score: '9',
    icon: '⚠',
  },
  low: {
    label: 'LOW',
    jp: '低リスク',
    color: '#9ee0a8',
    soft: '#9ee0a820',
    border: '#9ee0a866',
    score: '3',
    icon: '✓',
  },
} as const;


/* ── チャットカード（マトリクスなし） ── */
function CaseCard({ c, startDelay }: { c: Case; startDelay: number }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const cfg = LEVEL_CONFIG[c.level];

  useEffect(() => {
    let current = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    c.messages.forEach((_, i) => {
      const t = setTimeout(
        () => { current = i + 1; setVisibleCount(current); },
        (startDelay + i * 0.9) * 1000
      );
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [c.messages, startDelay]);

  return (
    <div
      className="flex flex-col gap-2.5 p-4 rounded-2xl border flex-1 min-h-0 min-w-0 overflow-hidden"
      style={{
        borderColor: `${cfg.color}33`,
        background: `linear-gradient(160deg, ${cfg.color}0d 0%, rgba(255,255,255,0.02) 70%)`,
      }}
    >
      {/* カードヘッダー */}
      <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
        <span
          className="font-mono tracking-[0.22em] text-white/50 shrink-0"
          style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
        >
          {c.label}
        </span>
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full font-bold whitespace-nowrap"
          style={{
            color: cfg.color,
            background: cfg.soft,
            border: `1px solid ${cfg.border}`,
            fontSize: 'clamp(10px, 0.9vw, 13px)',
            boxShadow: `0 0 16px ${cfg.color}44`,
          }}
        >
          <span>{cfg.icon}</span>
          <span>{cfg.jp}</span>
          <span className="opacity-60 font-mono">· {cfg.label}</span>
        </div>
      </div>

      {/* メッセージ群 */}
      <div className="flex flex-col gap-1.5 flex-1 min-h-0 min-w-0 overflow-hidden">
        <AnimatePresence>
          {c.messages.slice(0, visibleCount).map((msg, mi) => {
            const isEmployee = msg.from === 'employee';
            return (
              <motion.div
                key={mi}
                className={`flex flex-col gap-0.5 w-full min-w-0 ${isEmployee ? 'items-start' : 'items-end'}`}
                initial={{ opacity: 0, y: 8, x: isEmployee ? -6 : 6 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <span className="font-mono tracking-widest text-white/40" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}>
                  {msg.name}
                </span>
                <div
                  className="px-3 py-1.5 leading-snug"
                  style={{
                    maxWidth: '86%',
                    background: isEmployee ? 'rgba(255,255,255,0.06)' : `${cfg.color}22`,
                    border: isEmployee ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${cfg.color}55`,
                    borderRadius: isEmployee ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    color: isEmployee ? 'rgba(255,255,255,0.88)' : cfg.color,
                    fontSize: 'clamp(11px, 1vw, 14px)',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── 右パネル：マトリクス 1 つ（LOW と CRITICAL を同時ハイライト） ── */
function MatrixPanel() {
  const cellLevels = [
    'low',    'low',    'medium',
    'low',    'medium', 'high',
    'medium', 'high',   'critical',
  ] as const;
  const colorMap = {
    low:      '#9ee0a8',
    medium:   '#f7c46c',
    high:     '#ff9966',
    critical: '#ff5560',
  };

  return (
    <div
      className="flex flex-col gap-3 justify-center shrink-0 p-4 rounded-2xl border border-white/10"
      style={{ width: 'clamp(160px, 17vw, 210px)', background: 'rgba(255,255,255,0.02)' }}
    >
      <span className="text-[9px] tracking-[0.28em] uppercase text-white/35 text-center">
        Risk Matrix
      </span>

      {/* 軸ラベル上段 */}
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-white/30">発生確率 ↓</span>
        <span className="text-[8px] text-white/30">深刻さ →</span>
      </div>

      {/* Y 軸 + グリッド */}
      <div className="flex items-stretch gap-1 w-full">
        <div className="flex flex-col justify-between py-0.5 shrink-0">
          <span className="text-[7px] text-white/30 leading-none">低</span>
          <span className="text-[7px] text-white/30 leading-none">高</span>
        </div>

        <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cellLevels.map((lv, i) => {
            const isLow      = i === 0;
            const isCritical = i === 8;
            const col = colorMap[lv];
            const activeColor = isLow ? '#9ee0a8' : isCritical ? '#ff5560' : null;

            return (
              <motion.div
                key={i}
                className="rounded flex items-center justify-center"
                style={{
                  minHeight: 22,
                  background: activeColor ? `${activeColor}66` : `${col}18`,
                  border: `1px solid ${activeColor ? activeColor : col + '33'}`,
                  boxShadow: activeColor ? `0 0 12px ${activeColor}99` : 'none',
                }}
                animate={activeColor ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: isLow ? 0 : 0.6 }}
              >
                {isLow && (
                  <span style={{ fontSize: 8, color: '#9ee0a8', fontWeight: 700, lineHeight: 1 }}>✓</span>
                )}
                {isCritical && (
                  <span style={{ fontSize: 8, color: '#ff5560', fontWeight: 700, lineHeight: 1 }}>⚠</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* X 軸ラベル */}
      <div className="flex justify-between pl-3 text-[7px] text-white/25 font-mono">
        <span>低</span>
        <span>高</span>
      </div>

      {/* 凡例 */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
        {[
          { color: '#9ee0a8', icon: '✓', label: 'Example 1', jp: '低リスク' },
          { color: '#ff5560', icon: '⚠', label: 'Example 2', jp: '極高リスク' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span style={{ fontSize: 10, color: item.color }}>{item.icon}</span>
            <span className="font-mono text-white/40" style={{ fontSize: 'clamp(8px, 0.75vw, 10px)' }}>
              {item.label}
            </span>
            <span
              className="px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap ml-auto"
              style={{
                color: item.color,
                background: `${item.color}18`,
                border: `1px solid ${item.color}55`,
                fontSize: 'clamp(8px, 0.7vw, 10px)',
              }}
            >
              {item.jp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── スライド本体 ── */
export default function Slide24RiskExamples() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-7xl px-2 py-4 pt-14 gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex flex-col gap-1">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            Risk-Based Approach · 具体例
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.9vw, 42px)' }}
          >
            同じ「生成AI活用」でも
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #ff5560 0%, #f7c46c 50%, #9ee0a8 100%)' }}
            >
              リスクは全然違う
            </span>
          </h2>
        </div>

        {/* 本体：チャット 2 枚横並び（左） + マトリクスパネル（右） */}
        <div className="flex flex-row gap-4 flex-1 min-h-0 min-w-0">
          {/* チャットカード 2 枚（横並び） */}
          {CASES.map((c, i) => (
            <CaseCard key={c.id} c={c} startDelay={0.6 + i * 4.8} />
          ))}

          {/* 右：マトリクスパネル（1つ） */}
          <MatrixPanel />
        </div>

        {/* フッター */}
        <motion.p
          className="shrink-0 text-white/35 tracking-wide"
          style={{ fontSize: 'clamp(10px, 0.9vw, 12px)', wordBreak: 'break-word' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          ※ 「生成AIを使う」という行為そのものではなく、
          <span className="text-white/65 font-semibold">何を入力するか</span>
          によってリスクレベルが大きく変わる。規程で判断基準を揃えることが重要。
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
