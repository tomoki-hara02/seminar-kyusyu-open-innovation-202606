'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p48: 4-4 個人情報 — 全体判断フロー（Step i → vii）
 * 縦型シーケンシャル分岐：YES = 下へ / NO = 右へ結論
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
    no: '法27・28条は不適用。ただし法23条 安全管理措置義務を負う',
    accent: '#a0b8ff',
  },
  {
    id: 'iv',
    label: 'Step iv',
    check: '個人データの「提供」にあたるか（クラウド例外・注意喚起基準）',
    no: '法27・28条不適用。ただし法23条 安全管理措置義務を負う',
    accent: '#b8a8ff',
  },
  {
    id: 'v',
    label: 'Step v',
    check: '個人データ取扱いの「委託」にあたるか',
    no: '第三者提供として法27・28条適用→原則 本人同意が必要',
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

const FINAL = {
  label: '本人同意 原則不要',
  sub: 'ただし法28条3項の継続的対応義務が残る（vii）／法25条 委託先監督義務（v）',
};

export default function Slide47PipRecap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-7xl h-full justify-center overflow-hidden py-1.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="shrink-0 flex flex-col gap-0.5 mb-1.5">
          <span
            className="tracking-[0.32em] uppercase text-white/40 leading-none"
            style={{ fontSize: 'clamp(13px, 1.35vh, 16px)' }}
          >
            Decision Flow ／ 個人情報保護法
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 3.2vh, 36px)' }}
          >
            生成AIに個人データを含むプロンプトを入力する場合の判断フロー
          </h2>
        </div>

        <div className="flex flex-col shrink-0 gap-[3px]">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className="shrink-0 grid grid-cols-[minmax(0,1.42fr)_auto_minmax(0,1fr)] gap-x-2.5 items-start"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <div className="flex flex-col gap-px min-w-0 col-start-1">
                <div
                  className="rounded-md px-3.5 py-2 border leading-[1.35]"
                  style={{
                    borderColor: step.accent,
                    background: `${step.accent}14`,
                    fontSize: 'clamp(14px, 1.55vh, 17px)',
                  }}
                >
                  <span
                    className="font-bold tracking-wide block leading-none mb-1"
                    style={{ color: step.accent, fontSize: 'clamp(15px, 1.65vh, 18px)' }}
                  >
                    {step.label}
                  </span>
                  <p className="text-white">{step.check}</p>
                </div>
                <span
                  className="pl-1 font-medium leading-none"
                  style={{
                    color: step.accent,
                    fontSize: 'clamp(13px, 1.35vh, 15px)',
                  }}
                >
                  {i < STEPS.length - 1 ? 'YES ↓ 次へ' : 'YES ↓ 同意不要'}
                </span>
              </div>

              <span
                className="text-white/30 shrink-0 self-center leading-none col-start-2 pt-2"
                style={{ fontSize: 'clamp(13px, 1.35vh, 15px)' }}
              >
                NO →
              </span>
              <div
                className="col-start-3 min-w-0 self-center rounded-md px-3 py-2 border border-white/15 bg-white/[0.03] leading-[1.35]"
                style={{ fontSize: 'clamp(13px, 1.45vh, 16px)' }}
              >
                <p className="text-white/70">{step.no}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="shrink-0 rounded-lg px-3.5 py-2 border leading-[1.35]"
            style={{
              borderColor: '#88ffcc',
              background: 'rgba(136,255,204,0.10)',
              fontSize: 'clamp(14px, 1.55vh, 17px)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + STEPS.length * 0.08 }}
          >
            <span className="font-bold text-[#88ffcc]">
              全Step YES → {FINAL.label}
            </span>
            <p className="mt-0.5 text-white/60 leading-snug">{FINAL.sub}</p>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
