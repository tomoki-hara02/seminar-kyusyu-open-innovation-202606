'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p60: 4-4 個人情報 — 全体判断フロー（Step i → vii）
 *
 * デザイン意図:
 *   - 中央に「YES で進む spine」を配置 — 番号バッジ＋設問カード＋YES↓ 矢印
 *   - 右側に「NO で外れる dead-end」を小さく muted で並べる
 *   - 末尾の goal カードを hero 扱いにして「全YES＝同意原則不要」を明示
 */

type Step = {
  id: string;
  label: string;
  check: string;
  no: string;
  accent: string;
};

const STEPS: Step[] = [
  {
    id: 'i',
    label: 'Step i',
    check: '入力プロンプトに個人情報が含まれるか（法2条1項）',
    no: '個情法上の問題なし',
    accent: '#88bbff',
  },
  {
    id: 'ii',
    label: 'Step ii',
    check: '特定された利用目的の範囲内か（法18条）',
    no: '法18条違反のおそれ',
    accent: '#88bbff',
  },
  {
    id: 'iii',
    label: 'Step iii',
    check: '入力情報が「個人データ」か（DB等で体系的整理）',
    no: '個人データでないなら22条～30条は不適用',
    accent: '#a0b8ff',
  },
  {
    id: 'iv',
    label: 'Step iv',
    check: '個人データの「提供」にあたるか（クラウド例外・注意喚起基準）',
    no: '法27・28条不適用。ただし法23条 安全管理措置義務',
    accent: '#b8a8ff',
  },
  {
    id: 'v',
    label: 'Step v',
    check: '個人データ取扱いの「委託」にあたるか',
    no: '第三者提供として法27・28条適用 → 原則 本人同意が必要',
    accent: '#c8a8ff',
  },
  {
    id: 'vi',
    label: 'Step vi',
    check: '「外国」にある者への提供か（規則15条）',
    no: '法28条不適用。法27条の要件のみ検討',
    accent: '#e0a8dd',
  },
  {
    id: 'vii',
    label: 'Step vii',
    check: '基準適合体制（DPA等・規則16条）を整備しているか',
    no: '原則として本人同意が必要（法28条1項）',
    accent: '#ffaacc',
  },
];

const FINAL_ACCENT = '#9ee0a8';

function StepRow({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  return (
    <motion.div
      className="grid grid-cols-[auto_minmax(0,1.25fr)_auto_minmax(0,1fr)] gap-2.5 md:gap-3 items-stretch"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
    >
      {/* 番号バッジ + 縦スパイン */}
      <div className="flex flex-col items-center">
        <span
          className="shrink-0 flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border font-bold font-mono italic"
          style={{
            color: step.accent,
            borderColor: `${step.accent}88`,
            background: `${step.accent}1c`,
            boxShadow: `0 0 12px -2px ${step.accent}66`,
            fontSize: 'clamp(11px, 0.95vw, 13px)',
          }}
        >
          {step.id}
        </span>
        {!isLast && (
          <div
            className="flex-1 w-px mt-1"
            style={{
              background: `linear-gradient(to bottom, ${step.accent}aa, ${STEPS[index + 1]?.accent ?? step.accent}aa)`,
              minHeight: 12,
            }}
          />
        )}
      </div>

      {/* 設問カード（YES 路） */}
      <div
        className="rounded-lg px-3 py-2 border min-w-0"
        style={{
          borderColor: `${step.accent}55`,
          background: `linear-gradient(120deg, ${step.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <span
            className="font-bold tracking-wide leading-none"
            style={{ color: step.accent, fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            {step.label}
          </span>
          <span
            className="font-mono tracking-wider text-white/40 leading-none"
            style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
          >
            {isLast ? 'YES ↓ 同意不要へ' : 'YES ↓ 次へ'}
          </span>
        </div>
        <p
          className="text-white/90 leading-snug"
          style={{ fontSize: 'clamp(12px, 1.02vw, 14.5px)' }}
        >
          {step.check}
        </p>
      </div>

      {/* NO → 矢印 */}
      <span
        className="self-center font-mono text-white/30 leading-none"
        style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
      >
        NO →
      </span>

      {/* NO 結果カード（dead-end） */}
      <div
        className="self-stretch flex items-center rounded-lg px-2.5 py-1.5 border min-w-0"
        style={{
          borderColor: 'rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <p
          className="text-white/60 leading-snug"
          style={{ fontSize: 'clamp(10.5px, 0.88vw, 12.5px)' }}
        >
          {step.no}
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide60PipRecap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報 · 全体判断フロー
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
          >
            生成AIに
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, #88bbff 0%, #c8a8ff 50%, #ffaacc 100%)`,
              }}
            >
              個人データを含むプロンプト
            </span>
            を入力するときの判断フロー
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            7つの Step を <span className="text-white/75">YES で進み続ける</span> と、最終的に「本人同意 原則不要」に辿り着く。
            どこかで <span className="text-white/75">NO になればその段階の規律が発動</span>。
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {STEPS.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        <motion.div
          className="relative rounded-xl border px-3.5 py-2.5 overflow-hidden"
          style={{
            borderColor: `${FINAL_ACCENT}77`,
            background: `linear-gradient(135deg, ${FINAL_ACCENT}24 0%, rgba(255,255,255,0.03) 100%)`,
            boxShadow: `0 0 36px -10px ${FINAL_ACCENT}55`,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 + STEPS.length * 0.06 }}
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
              style={{
                color: FINAL_ACCENT,
                borderColor: `${FINAL_ACCENT}88`,
                background: `${FINAL_ACCENT}1c`,
                fontSize: 'clamp(9px, 0.78vw, 11px)',
              }}
            >
              全STEP YES
            </span>
            <span
              className="font-bold leading-none"
              style={{ color: FINAL_ACCENT, fontSize: 'clamp(15px, 1.4vw, 20px)' }}
            >
              本人同意 原則不要
            </span>
          </div>
          <p
            className="text-white/65 leading-snug"
            style={{ fontSize: 'clamp(10.5px, 0.9vw, 13px)' }}
          >
            ただし <span className="text-white/85">法28条3項の継続的対応義務</span>（vii）と
            <span className="text-white/85"> 法25条 委託先監督義務</span>（v）は残る点に注意。
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
