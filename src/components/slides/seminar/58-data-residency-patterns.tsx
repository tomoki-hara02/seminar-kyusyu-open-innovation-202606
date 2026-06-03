'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p58: 4-4 個人情報 — データレジデンシーパターンの概要
 *
 * 左: オンプレ / SaaS（国内・海外ホスティング）のデータフロー図
 * 右: 個人情報保護法における個人データ規制
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const OVERSEAS_ACCENT = '#fb923c';

const VW = 560;
const VH = 450;

/** 図中の共通サイズ（右カラム ~1.5x に合わせたスケール） */
const BOX = { w: 108, h: 42, rx: 7, fs: 14 };
const MODEL = { w: 117, h: 48, rx: 10, fs: 15 };

const LAYOUT = {
  onPrem: { x: 12, y: 8, w: 536, h: 78 },
  saas: { x: 12, y: 92, w: 168, h: 350 },
  hostDom: { x: 186, y: 100, w: 362, h: 140 },
  hostOver: { x: 186, y: 256, w: 362, h: 140 },
  saasDataX: 28,
  row1: { inY: 118, outY: 168 },
  row2: { inY: 288, outY: 338 },
  modelX: 300,
  onPremFlowY: 34,
  onPremFlow: {
    inX: 44,
    modelX: 218,
    outX: 402,
  },
  dividerY: 252,
  saasLabelY: 118,
  /** 矢印ラベル — 内側配置用オフセット（→=下、←=上） */
  arrowLabel: { offset: 14 },
} as const;

const REGULATIONS = [
  {
    num: '1',
    title: 'データ内容の正確性の確保等',
    items: [
      { text: '正確性の確保（22条前段）' },
      { text: '不要となったデータの消去（22条後段）' },
    ],
  },
  {
    num: '2',
    title: '安全管理措置関係',
    items: [
      { text: '安全管理措置（23条）' },
      { text: '従業者の監督（24条）' },
      { text: '委託先の監督（25条）' },
      { text: '漏洩等の報告等（26条）' },
    ],
  },
  {
    num: '3',
    title: '第三者提供関係',
    items: [
      { text: '第三者提供の制限（27条）' },
      {
        text: '外国にある第三者への提供の制限（28条）',
        highlight: true,
      },
      { text: '第三者提供に係る記録の作成等（29条）' },
      { text: '第三者提供を受ける際の確認等（30条）' },
    ],
  },
] as const;

function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  label,
  delay,
  accent = LAW_ACCENT,
  strokeWidth = 1.3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  delay: number;
  accent?: string;
  strokeWidth?: number;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const pointingRight = x2 >= x1;
  // → は下（内側）、← は上（内側）にラベルを置く
  const labelY = pointingRight
    ? midY + LAYOUT.arrowLabel.offset
    : midY - LAYOUT.arrowLabel.offset;

  return (
    <g>
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke="rgba(255,255,255,0.32)"
        strokeWidth={strokeWidth}
        fill="none"
        markerEnd="url(#residency-arrow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      />
      {label && (
        <text
          x={midX}
          y={labelY}
          fill={accent}
          fontSize={12}
          textAnchor="middle"
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function DataBox({
  x,
  y,
  label,
  delay,
  fill = 'rgba(255,255,255,0.06)',
  stroke = 'rgba(255,255,255,0.22)',
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  fill?: string;
  stroke?: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={x}
        y={y}
        width={BOX.w}
        height={BOX.h}
        rx={BOX.rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <text
        x={x + BOX.w / 2}
        y={y + BOX.h / 2 + 5}
        fill="rgba(255,255,255,0.9)"
        fontSize={BOX.fs}
        textAnchor="middle"
        fontWeight={600}
      >
        {label}
      </text>
    </motion.g>
  );
}

function ModelBox({
  x,
  y,
  accent,
  delay,
}: {
  x: number;
  y: number;
  accent: string;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={x}
        y={y}
        width={MODEL.w}
        height={MODEL.h}
        rx={MODEL.rx}
        fill={`${accent}22`}
        stroke={accent}
        strokeWidth={1.3}
      />
      <text
        x={x + MODEL.w / 2}
        y={y + MODEL.h / 2 + 5}
        fill={accent}
        fontSize={MODEL.fs}
        textAnchor="middle"
        fontWeight={700}
      >
        モデル
      </text>
    </motion.g>
  );
}

function EnvFrame({
  x,
  y,
  w,
  h,
  label,
  accent,
  delay,
  labelSize = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent: string;
  delay: number;
  labelSize?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={`${accent}0a`}
        stroke={accent}
        strokeWidth={1.2}
      />
      <text x={x + 14} y={y + 20} fill={accent} fontSize={labelSize} fontWeight={700}>
        {label}
      </text>
    </motion.g>
  );
}

function SaasHostingFlow({
  row,
  host,
  accent,
  delayBase,
}: {
  row: { inY: number; outY: number };
  host: { x: number; y: number; w: number; h: number; label: string };
  accent: string;
  delayBase: number;
}) {
  const inX = LAYOUT.saasDataX;
  const inRight = inX + BOX.w;
  const outRight = inX + BOX.w;
  const inCy = row.inY + BOX.h / 2;
  const outCy = row.outY + BOX.h / 2;
  const modelX = LAYOUT.modelX;
  const modelY = (row.inY + row.outY + BOX.h) / 2 - MODEL.h / 2;

  return (
    <g>
      <EnvFrame
        x={host.x}
        y={host.y}
        w={host.w}
        h={host.h}
        label={host.label}
        accent={accent}
        delay={delayBase}
        labelSize={14}
      />
      <DataBox x={inX} y={row.inY} label="社内情報" delay={delayBase + 0.05} />
      <DataBox x={inX} y={row.outY} label="AI出力" delay={delayBase + 0.1} />
      <ModelBox x={modelX} y={modelY} accent={accent} delay={delayBase + 0.08} />

      {/* 入力: 社内情報 → モデル（水平直線） */}
      <FlowArrow
        x1={inRight}
        y1={inCy}
        x2={modelX}
        y2={inCy}
        label="入力"
        delay={delayBase + 0.12}
        accent={accent}
      />
      {/* 出力: モデル → AI出力（水平直線・左向き） */}
      <FlowArrow
        x1={modelX}
        y1={outCy}
        x2={outRight}
        y2={outCy}
        label="出力"
        delay={delayBase + 0.16}
        accent={accent}
      />
    </g>
  );
}

function ResidencyDiagram() {
  const op = LAYOUT.onPrem;
  const flowY = LAYOUT.onPremFlowY;
  const flowCy = flowY + BOX.h / 2;
  const inX = LAYOUT.onPremFlow.inX;
  const modelX = LAYOUT.onPremFlow.modelX;
  const outX = LAYOUT.onPremFlow.outX;

  return (
    <div className="flex w-full h-full min-h-0 items-center justify-center">
      <div
        className="relative w-full rounded-xl border border-white/10 bg-black/20 overflow-hidden"
        style={{ aspectRatio: `${VW} / ${VH}`, maxHeight: 'min(62vh, 450px)' }}
      >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="residency-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,0.5)" />
          </marker>
        </defs>

        {/* オンプレ */}
        <EnvFrame
          x={op.x}
          y={op.y}
          w={op.w}
          h={op.h}
          label="【オンプレ環境】"
          accent={LAW_ACCENT}
          delay={0.12}
        />
        <DataBox x={inX} y={flowY} label="社内情報" delay={0.2} />
        <DataBox x={outX} y={flowY} label="AI出力" delay={0.28} />
        <ModelBox x={modelX} y={flowY - 2} accent={LAW_ACCENT} delay={0.24} />
        <FlowArrow
          x1={inX + BOX.w}
          y1={flowCy}
          x2={modelX}
          y2={flowCy}
          label="入力"
          delay={0.3}
        />
        <FlowArrow
          x1={modelX + MODEL.w}
          y1={flowCy}
          x2={outX}
          y2={flowCy}
          label="出力"
          delay={0.34}
        />

        {/* SaaS 外枠 */}
        <motion.rect
          x={LAYOUT.saas.x}
          y={LAYOUT.saas.y}
          width={LAYOUT.saas.w}
          height={LAYOUT.saas.h}
          rx={12}
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1.1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.38 }}
        />
        <text
          x={26}
          y={LAYOUT.saasLabelY}
          fill="rgba(255,255,255,0.68)"
          fontSize={14}
          fontWeight={700}
        >
          【SaaS環境】
        </text>

        <line
          x1={186}
          y1={LAYOUT.dividerY}
          x2={548}
          y2={LAYOUT.dividerY}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        <SaasHostingFlow
          row={LAYOUT.row1}
          host={{ ...LAYOUT.hostDom, label: 'ホスティング（国内）' }}
          accent={LAW_ACCENT}
          delayBase={0.42}
        />
        <SaasHostingFlow
          row={LAYOUT.row2}
          host={{ ...LAYOUT.hostOver, label: 'ホスティング（海外）' }}
          accent={OVERSEAS_ACCENT}
          delayBase={0.62}
        />
      </svg>
      </div>
    </div>
  );
}

function RegulationsColumn() {
  return (
    <motion.div
      className="flex w-full h-full min-h-0 items-center justify-center"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <p
          className="font-bold text-white border-b border-white/10 px-3 py-2.5 leading-snug"
          style={{
            fontSize: 'clamp(14px, 1.12vw, 17px)',
            background: `${LAW_ACCENT}08`,
          }}
        >
          【個人情報保護法における個人データ規制】
        </p>

        {REGULATIONS.map((section, si) => (
          <motion.div
            key={section.num}
            className="border-b border-white/[0.06] last:border-b-0 bg-black/10"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + si * 0.06 }}
          >
            <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
              <span
                className="shrink-0 flex items-center justify-center rounded font-bold"
                style={{
                  width: 22,
                  height: 22,
                  fontSize: 12,
                  background: `${LAW_ACCENT}30`,
                  color: LAW_ACCENT,
                }}
              >
                {section.num}
              </span>
              <p
                className="font-bold text-white/92 leading-snug"
                style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
              >
                {section.title}
              </p>
            </div>

            <ul className="flex flex-col gap-1 px-3 pb-2.5 pl-9 leading-snug">
              {section.items.map((item) => {
                const highlighted = 'highlight' in item && item.highlight;
                return (
                <li
                  key={item.text}
                  style={{
                    fontSize: 'clamp(12px, 0.98vw, 14px)',
                    color: highlighted ? OVERSEAS_ACCENT : 'rgba(255,255,255,0.62)',
                    fontWeight: highlighted ? 700 : 400,
                    lineHeight: 1.45,
                  }}
                >
                  {item.text}
                </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Slide58DataResidencyPatterns() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}
          >
            データレジデンシー
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              パターンの概要
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-center">
          <ResidencyDiagram />
          <RegulationsColumn />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
