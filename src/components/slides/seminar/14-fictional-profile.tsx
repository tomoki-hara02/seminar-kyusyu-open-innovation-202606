'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { useCountUp } from '@/hooks/useCountUp';

/**
 * ワークショップ用 架空企業プロファイル：熊本テクスタイル株式会社。
 * 会社基本情報 + 事業セグメント + ターゲット + 簡略組織図 を 1 枚で。
 */

type Stat = { value: string; label: string; accent: string };

const STATS: Stat[] = [
  { value: '1972', label: '創業（年）',       accent: '#88bbff' },
  { value: '85',   label: '従業員（名）',     accent: '#c8a8ff' },
  { value: '18.5', label: '売上高（億円）',   accent: '#ffaacc' },
  { value: '410',  label: '平均年収（万円）', accent: '#f7c46c' },
];

const SEGMENTS = [
  { label: 'OEM受託製造',  sub: '首都圏・関西アパレル 3社中心', amount: '8.5 億', value: 46, color: '#88bbff' },
  { label: '自社ブランド店舗', sub: '熊本市・近県 30〜50代 女性', amount: '6.2 億', value: 34, color: '#c8a8ff' },
  { label: '自社ブランドEC',  sub: '全国 30〜50代 女性',         amount: '3.8 億', value: 20, color: '#ffaacc' },
];

const ORG = [
  { name: '管理本部',    count: 10, accent: '#88bbff' },
  { name: '製造本部',    count: 35, accent: '#9ee0a8', note: '菊池工場' },
  { name: '営業本部',    count: 15, accent: '#ffaacc' },
  { name: '商品本部',    count: 10, accent: '#c8a8ff' },
  { name: '店舗・EC本部', count: 15, accent: '#f7c46c' },
];

function arcPath(cx: number, cy: number, r: number, s: number, e: number) {
  const xy = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x1, y1] = xy(s); const [x2, y2] = xy(e);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${e - s > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`;
}

export default function Slide14FictionalProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  let acc = -Math.PI / 2;
  const segPaths = SEGMENTS.map((s) => {
    const span = (s.value / 100) * Math.PI * 2;
    const path = arcPath(60, 60, 52, acc, acc + span);
    acc += span;
    return { ...s, path };
  });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col w-full h-full max-w-6xl px-2 py-4 pt-14 gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
              Workshop · Company Profile · 1/3
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              架空企業：
              <span
                className="bg-clip-text text-transparent ml-1"
                style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)' }}
              >
                熊本テクスタイル株式会社
              </span>
            </h2>
            <span className="text-[12px] text-white/45 mt-0.5">
              創業 54年・熊本の中堅アパレル製造小売。自社ブランド × OEM の二本柱
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/45 shrink-0 pb-1">
            <Fact label="資本金"       value="5,000万円" />
            <span className="w-px h-3 bg-white/15" />
            <Fact label="平均勤続"     value="11.2年" />
            <span className="w-px h-3 bg-white/15" />
            <Fact label="平均年齢"     value="43.8歳" />
          </div>
        </div>

        {/* 数値カード 4 つ */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} inView={inView} delay={0.2 + i * 0.08} />
          ))}
        </div>

        {/* メイン：左 セグメント円グラフ / 右 組織図 */}
        <div className="flex flex-row gap-4 flex-1 min-h-0">

          {/* ── 左：事業セグメント別売上 ── */}
          <motion.div
            className="flex flex-col gap-3 p-4 rounded-2xl border border-white/10 shrink-0 w-[440px]"
            style={{ background: 'rgba(255,255,255,0.02)' }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.28em] uppercase text-white/35">
                事業セグメント別売上（FY2025）
              </span>
              <span className="text-[10px] text-white/30">18.5 億円</span>
            </div>

            <div className="flex flex-row items-center gap-4">
              <div className="shrink-0">
                <svg width="150" height="150" viewBox="0 0 120 120">
                  {segPaths.map((s, i) => (
                    <motion.path
                      key={s.label} d={s.path} fill={s.color} opacity={0.85}
                      initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                      style={{ transformOrigin: '60px 60px' }}
                      transition={{ duration: 0.7, delay: 0.55 + i * 0.1, ease: 'easeOut' }}
                    />
                  ))}
                  <circle cx="60" cy="60" r="30" fill="#0a0a0f" />
                  <text x="60" y="56" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6.5" letterSpacing="0.18em">REVENUE</text>
                  <text x="60" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight={700}>18.5 億</text>
                </svg>
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {SEGMENTS.map((s, i) => (
                  <motion.div key={s.label} className="flex flex-col gap-1"
                    initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.75 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ background: s.color, boxShadow: `0 0 7px ${s.color}66` }} />
                      <span className="text-[13px] text-white/85 font-medium flex-1">{s.label}</span>
                      <span className="text-sm font-bold font-mono tabular-nums shrink-0" style={{ color: s.color }}>
                        {s.amount}
                      </span>
                      <span className="text-[11px] font-mono text-white/45 shrink-0 w-9 text-right">{s.value}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden bg-white/5 ml-4">
                      <motion.div className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.value}%` } : {}}
                        transition={{ duration: 0.85, delay: 0.95 + i * 0.08, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[10px] text-white/40 ml-4">{s.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ターゲット */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/8">
              <span className="text-[9px] tracking-[0.28em] uppercase text-white/35">
                主な事業ターゲット
              </span>
              <div className="flex flex-col gap-1 text-[11.5px] text-white/65 leading-snug">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-[#88bbff] shrink-0 w-12">OEM</span>
                  <span>首都圏・関西のアパレルブランド（既存 3社中心）</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-[#c8a8ff] shrink-0 w-12">店舗</span>
                  <span>熊本市・近県在住 30〜50代 女性</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-[#ffaacc] shrink-0 w-12">EC</span>
                  <span>全国 30〜50代 女性（会員 約 3万人）</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 右：組織図 ── */}
          <motion.div
            className="flex-1 flex flex-col gap-3 p-4 rounded-2xl border border-white/10 min-w-0"
            style={{ background: 'rgba(255,255,255,0.02)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between shrink-0">
              <span className="text-[10px] tracking-[0.28em] uppercase text-white/35">
                組織図 · 85 名
              </span>
              <span className="text-[10px] text-white/30">正社員 62 ／ パート 23</span>
            </div>

            {/* CEO */}
            <div className="flex flex-col items-center gap-0 flex-1 justify-center">
              <motion.div
                className="flex flex-col items-center px-6 py-2.5 rounded-xl border shrink-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(123,94,167,0.2), rgba(79,142,247,0.2), rgba(255,107,157,0.2))',
                  borderColor: 'rgba(255,255,255,0.25)',
                  boxShadow: '0 0 28px -8px rgba(79,142,247,0.55)',
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-[9px] tracking-[0.28em] uppercase text-white/50">
                  代表取締役社長
                </span>
                <span className="text-base font-bold text-white">田島 直樹</span>
                <span className="text-[10px] text-white/40">3代目 · 52歳</span>
              </motion.div>

              {/* 接続線 */}
              <div className="flex flex-col items-center w-full shrink-0">
                <div className="w-px h-3 bg-white/20" />
                <div className="relative w-[92%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent">
                  {ORG.map((_, i) => (
                    <span key={i} className="absolute top-0 w-px h-3 bg-white/20"
                      style={{ left: `${(i / (ORG.length - 1)) * 100}%`, transform: 'translateX(-50%)' }} />
                  ))}
                </div>
                <div className="w-full h-3" />
              </div>

              {/* 5部門 */}
              <div className="flex flex-row gap-2 w-full shrink-0">
                {ORG.map((d, i) => (
                  <motion.div
                    key={d.name}
                    className="flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border"
                    style={{
                      background: `linear-gradient(180deg, ${d.accent}1c 0%, ${d.accent}06 100%)`,
                      borderColor: `${d.accent}55`,
                    }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.85 + i * 0.08 }}
                  >
                    <span className="text-[11.5px] text-white/85 font-bold text-center leading-tight">
                      {d.name}
                    </span>
                    <div className="flex items-baseline gap-0.5">
                      <span
                        className="text-2xl font-bold font-mono tabular-nums leading-none"
                        style={{ color: d.accent, filter: `drop-shadow(0 0 8px ${d.accent}66)` }}
                      >
                        {d.count}
                      </span>
                      <span className="text-[9px] text-white/45">名</span>
                    </div>
                    {d.note && (
                      <span className="text-[9px] text-white/40">{d.note}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[9px] tracking-[0.22em] uppercase text-white/30">{label}</span>
      <span className="text-white/75 font-medium">{value}</span>
    </div>
  );
}

function StatCard({ stat, inView, delay }: { stat: Stat; inView: boolean; delay: number }) {
  const target = parseFloat(stat.value);
  const isNumeric = !isNaN(target);
  const v = useCountUp(isNumeric ? target : 0, { duration: 1.6, start: inView, easePower: 3 });
  return (
    <motion.div
      className="flex flex-col items-start gap-1 p-4 rounded-xl border"
      style={{
        background: `linear-gradient(135deg, ${stat.accent}14 0%, transparent 100%)`,
        borderColor: `${stat.accent}33`,
        boxShadow: `0 10px 28px -12px ${stat.accent}33`,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span
        className="text-3xl md:text-4xl font-bold font-mono tabular-nums leading-none"
        style={{ color: stat.accent, filter: `drop-shadow(0 0 12px ${stat.accent}55)` }}
      >
        {isNumeric ? (Number.isInteger(target) ? Math.round(v).toString() : v.toFixed(1)) : stat.value}
      </span>
      <span className="text-[10px] tracking-widest uppercase text-white/45 mt-1">
        {stat.label}
      </span>
    </motion.div>
  );
}
