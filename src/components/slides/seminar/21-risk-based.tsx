'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p21: リスクベースアプローチとは？
 *
 * Chapter 02 · 前編 · 全体像解説の 1 枚目。
 * 「発生確率 × 深刻さ」でリスクをスコア化し、レベルに応じて対応を変える考え方を、
 * 4 × 9 のリスクマトリックスと 4 段階の凡例で表現する。
 */

/* ────────── データ ────────── */

const SEVERITIES = [1.5, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] as const;
const LIKELIHOODS = [1, 2, 3, 4] as const;

type Level = 'low' | 'medium' | 'high' | 'critical';

const LEVELS: Record<
  Level,
  { label: string; jp: string; color: string; soft: string; desc: string }
> = {
  low: {
    label: 'LOW',
    jp: '低リスク',
    color: '#9ee0a8',
    soft: '#9ee0a826',
    desc: '通常、定期的な監視の対象。特別な対応は不要。',
  },
  medium: {
    label: 'MEDIUM',
    jp: '中程度リスク',
    color: '#f7c46c',
    soft: '#f7c46c30',
    desc: '対策を講じるか、監視の強化が必要。',
  },
  high: {
    label: 'HIGH',
    jp: '高リスク',
    color: '#ff9966',
    soft: '#ff996638',
    desc: 'リスク回避・軽減のため具体的な対策が必要。',
  },
  critical: {
    label: 'CRITICAL',
    jp: '極高リスク',
    color: '#ff5560',
    soft: '#ff556040',
    desc: '直ちに対策。場合によりプロジェクトの変更・中止を検討。',
  },
};

function levelOf(value: number): Level {
  if (value <= 5) return 'low';
  if (value <= 5.5) return 'medium';
  if (value <= 7.5) return 'high';
  return 'critical';
}

/* ────────── コンポーネント ────────── */

export default function Slide21RiskBased() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col w-full h-full max-w-7xl px-2 py-4 pt-14 gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
            >
              Risk-Based Approach
            </span>
            <div className="flex-1 max-w-[180px] h-px bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.9vw, 42px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #9ee0a8 0%, #f7c46c 50%, #ff5560 100%)' }}
            >
              リスクベースアプローチ
            </span>
            とは？
          </h2>
          <span
            className="text-white/55 leading-snug"
            style={{ fontSize: 'clamp(12px, 1.15vw, 16px)' }}
          >
            すべてのリスクを同じレベルで対応するのではなく、
            <span className="text-white/85 font-bold">「発生確率 × 深刻さ」</span>
            でスコア化し、
            <span className="text-white/85 font-bold">優先度の高い領域にリソースを集中</span>
            させる考え方。
          </span>
        </div>

        {/* 本体: 左マトリックス / 右 凡例 */}
        <div className="flex flex-row gap-4 md:gap-5 flex-1 min-h-0 min-w-0">
          {/* ── 左：リスクマトリックス ── */}
          <motion.div
            className="flex flex-col gap-3 p-4 md:p-5 rounded-2xl border border-white/10 flex-1 min-w-0 min-h-0 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)' }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="flex items-baseline justify-between gap-2 flex-wrap shrink-0">
              <span
                className="font-semibold tracking-wide text-white/80 whitespace-nowrap"
                style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
              >
                リスクマトリックス
              </span>
              <span
                className="text-white/35 tracking-widest whitespace-nowrap"
                style={{ fontSize: 'clamp(9px, 0.85vw, 11px)' }}
              >
                Likelihood × Severity
              </span>
            </div>

            {/* マトリックス本体：左に「発生確率」軸ラベル、右にグリッド全体 */}
            <div className="flex flex-row gap-2 flex-1 min-h-0 min-w-0">
              {/* 左端：発生確率の軸ラベル（縦方向中央寄せ） */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <span
                  className="text-white/80 font-bold leading-none whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(10px, 0.95vw, 13px)',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  発生確率
                </span>
                <span
                  className="font-mono tracking-widest text-white/35 leading-none mt-1 whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(8px, 0.7vw, 10px)',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  -Likelihood-
                </span>
              </div>

              {/* グリッド全体（軸タイトル＋列ヘッダー＋セル群） */}
              <div className="flex flex-col gap-1 flex-1 min-h-0 min-w-0">
                {/* 深刻さの軸タイトル（中央寄せ） */}
                <div
                  className="grid items-end shrink-0"
                  style={{
                    gridTemplateColumns: `clamp(20px, 2.5vw, 32px) repeat(${SEVERITIES.length}, minmax(0, 1fr))`,
                    columnGap: 4,
                  }}
                >
                  <div />
                  <div
                    className="flex flex-col items-center leading-none"
                    style={{ gridColumn: `2 / span ${SEVERITIES.length}` }}
                  >
                    <span
                      className="text-white/80 font-bold whitespace-nowrap"
                      style={{ fontSize: 'clamp(10px, 1vw, 13px)' }}
                    >
                      深刻さ
                    </span>
                    <span
                      className="font-mono tracking-widest text-white/35 mt-0.5 whitespace-nowrap"
                      style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}
                    >
                      -Severity-
                    </span>
                  </div>
                </div>

                {/* 列ヘッダー（深刻さの数値） */}
                <div
                  className="grid items-center shrink-0"
                  style={{
                    gridTemplateColumns: `clamp(20px, 2.5vw, 32px) repeat(${SEVERITIES.length}, minmax(0, 1fr))`,
                    columnGap: 4,
                  }}
                >
                  <div />
                  {SEVERITIES.map((s) => (
                    <div
                      key={s}
                      className="text-center font-mono tabular-nums text-white/60"
                      style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
                    >
                      {s}
                    </div>
                  ))}
                </div>

                {/* セル群（行ラベル + 各セル） */}
                {LIKELIHOODS.map((l, ri) => (
                  <motion.div
                    key={l}
                    className="grid items-stretch flex-1 min-h-0"
                    style={{
                      gridTemplateColumns: `clamp(20px, 2.5vw, 32px) repeat(${SEVERITIES.length}, minmax(0, 1fr))`,
                      columnGap: 4,
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + ri * 0.08 }}
                  >
                    {/* 行ラベル：発生確率の数値だけ */}
                    <div className="flex items-center justify-center">
                      <span
                        className="font-mono tabular-nums text-white/60"
                        style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
                      >
                        {l}
                      </span>
                    </div>

                    {/* 各セル */}
                    {SEVERITIES.map((s, ci) => {
                      const value = l + s;
                      const lv = levelOf(value);
                      const { color, soft } = LEVELS[lv];
                      return (
                        <motion.div
                          key={`${l}-${s}`}
                          className="flex items-center justify-center rounded-md font-mono tabular-nums font-semibold min-w-0"
                          style={{
                            background: soft,
                            border: `1px solid ${color}66`,
                            color,
                            fontSize: 'clamp(9px, 0.95vw, 13px)',
                            minHeight: 0,
                          }}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.35,
                            delay: 0.4 + ri * 0.05 + ci * 0.025,
                            ease: 'easeOut',
                          }}
                        >
                          {Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center gap-2 text-white/35 pt-1 shrink-0 break-words"
              style={{
                fontSize: 'clamp(10px, 0.85vw, 12px)',
                wordBreak: 'break-word',
              }}
            >
              <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
              <span>スコア ＝ 発生確率 ＋ 深刻さ。色は 4 段階のリスクレベルを示す。</span>
            </div>
          </motion.div>

          {/* ── 右：4 段階凡例 ── */}
          <motion.div
            className="flex flex-col gap-2 shrink-0 min-h-0"
            style={{ width: 'clamp(220px, 22vw, 300px)' }}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 px-1 shrink-0">
              <span className="w-1 h-4 rounded-full bg-white/40 shrink-0" />
              <span
                className="font-semibold tracking-wide text-white/80 whitespace-nowrap"
                style={{ fontSize: 'clamp(11px, 1.1vw, 15px)' }}
              >
                リスクレベルと対応方針
              </span>
            </div>

            {(['low', 'medium', 'high', 'critical'] as Level[]).map((lv, i) => {
              const { color, jp, label, desc } = LEVELS[lv];
              return (
                <motion.div
                  key={lv}
                  className="flex flex-col gap-1 p-2.5 md:p-3 rounded-xl border flex-1 min-h-0 min-w-0 overflow-hidden"
                  style={{
                    borderColor: `${color}55`,
                    background: `linear-gradient(135deg, ${color}1a 0%, ${color}05 100%)`,
                  }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                >
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <span
                      className="rounded-sm shrink-0"
                      style={{
                        width: 12,
                        height: 12,
                        background: color,
                        boxShadow: `0 0 10px ${color}88`,
                      }}
                    />
                    <span
                      className="font-bold text-white whitespace-nowrap"
                      style={{ fontSize: 'clamp(11px, 1.1vw, 15px)' }}
                    >
                      {jp}
                    </span>
                    <span
                      className="font-mono tracking-widest whitespace-nowrap"
                      style={{ color: `${color}cc`, fontSize: 'clamp(8px, 0.7vw, 10px)' }}
                    >
                      {label}
                    </span>
                  </div>
                  <p
                    className="text-white/70 leading-snug break-words"
                    style={{
                      fontSize: 'clamp(10px, 0.9vw, 12.5px)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* フッター */}
        <motion.p
          className="shrink-0 text-white/40 tracking-wide break-words"
          style={{
            fontSize: 'clamp(10px, 0.9vw, 12px)',
            wordBreak: 'break-word',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          ※ 生成AI利用も同じ。「業務に AI を入れるか／入れないか」を二択で決めず、
          用途ごとにスコアを付けて
          <span className="text-white/70 font-semibold">「赤は止める／黄〜橙は条件付きで使う／緑は積極活用」</span>
          を判断する。
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
