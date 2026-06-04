'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p59: 4-4 個人情報 — 第28条（外国にある第三者への提供の制限）
 *
 * 上: 第28条1項（色分けハイライト）
 * 下: 要件 → 効果 / 例外フロー（参考資料レイアウト準拠）
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const FOREIGN_ACCENT = '#f87171';
const EMPHASIS_RED = '#fca5a5';

/** 条文ハイライト — 要件3項目＋効果（本人の同意）で色を分離 */
const HIGHLIGHT_OPERATOR = '#f7c46c';
const HIGHLIGHT_FOREIGN = FOREIGN_ACCENT;
const HIGHLIGHT_THIRD_PARTY = CHAPTER_ACCENT;
const HIGHLIGHT_CONSENT = LAW_ACCENT;

function HighlightForeignThirdParty() {
  return (
    <>
      <span style={{ color: HIGHLIGHT_FOREIGN, fontWeight: 700 }}>外国にある</span>
      <span style={{ color: HIGHLIGHT_THIRD_PARTY, fontWeight: 700 }}>第三者</span>
    </>
  );
}

function FlowPillButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border text-center font-semibold text-white px-2 py-1.5 leading-tight ${className}`}
      style={{
        borderColor: `${LAW_ACCENT}88`,
        background: `${LAW_ACCENT}28`,
        fontSize: 'clamp(13px, 1.02vw, 15px)',
      }}
    >
      {label}
    </div>
  );
}

function RequirementPill({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-md border text-center font-semibold text-white px-2.5 w-full min-h-[2.75rem]"
      style={{
        borderColor: `${LAW_ACCENT}88`,
        background: `${LAW_ACCENT}28`,
        fontSize: 'clamp(13px, 1.02vw, 15px)',
        lineHeight: 1.35,
      }}
    >
      {label}
    </div>
  );
}

function BracketTag({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center pl-3 border-l-2 rounded-l-md shrink-0 self-stretch ${className}`}
      style={{
        borderColor: `${LAW_ACCENT}88`,
        fontSize: 'clamp(13px, 1.02vw, 15px)',
        color: LAW_ACCENT,
        fontWeight: 700,
        minWidth: '4.5rem',
      }}
    >
      {label}
    </div>
  );
}

function ExceptionGroup({
  tag,
  label,
}: {
  tag: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-lg border px-2.5 py-2 shrink-0"
      style={{
        borderColor: `${LAW_ACCENT}33`,
        background: `${LAW_ACCENT}08`,
      }}
    >
      <span
        className="font-bold whitespace-nowrap"
        style={{ fontSize: 'clamp(11px, 0.95vw, 13px)', color: LAW_ACCENT }}
      >
        {tag}
      </span>
      <FlowPillButton label={label} className="w-full min-w-[7.5rem]" />
    </div>
  );
}

function FlowArrowIcon({ dashed = false }: { dashed?: boolean }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      className="shrink-0 opacity-45"
      aria-hidden
    >
      <path
        d="M0 6 H12 M8 2 L12 6 L8 10"
        stroke="white"
        strokeWidth="1.4"
        fill="none"
        strokeDasharray={dashed ? '3 2' : undefined}
      />
    </svg>
  );
}

function FlowArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      className={`shrink-0 opacity-50 ${className}`}
      aria-hidden
    >
      <path
        d="M0 6 H20 M16 2 L20 6 L16 10"
        stroke={LAW_ACCENT}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function FlowArrowDown({ className = '' }: { className?: string }) {
  return (
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      className={`shrink-0 opacity-50 ${className}`}
      aria-hidden
    >
      <path
        d="M6 0 V14 M2 10 L6 14 L10 10"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

function RequirementToExceptionArrow({
  containerRef,
  fromRef,
  toRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [path, setPath] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const update = () => {
      const c = container.getBoundingClientRect();
      const f = from.getBoundingClientRect();
      const t = to.getBoundingClientRect();

      setSize({ w: c.width, h: c.height });

      const x1 = f.right - c.left;
      const y1 = f.bottom - c.top;
      const x2 = t.left - c.left;
      const y2 = t.top - c.top + t.height / 2;
      const cx = x1 + (x2 - x1) * 0.45;
      const cy = y1 + (y2 - y1) * 0.08;

      setPath(`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(from);
    observer.observe(to);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, fromRef, toRef]);

  if (!path || size.w === 0) return null;

  return (
    <svg
      className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible z-10"
      width={size.w}
      height={size.h}
      aria-hidden
    >
      <defs>
        <marker
          id="req-exc-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.45)" />
        </marker>
      </defs>
      <path
        d={path}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1.4}
        fill="none"
        strokeDasharray="5 4"
        markerEnd="url(#req-exc-arrow)"
      />
    </svg>
  );
}

function ForeignNoteBox() {
  return (
    <div
      className="rounded-lg border px-3 py-2 leading-snug"
      style={{
        borderColor: 'rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.04)',
        fontSize: 'clamp(13px, 1.02vw, 15px)',
        color: 'rgba(255,255,255,0.78)',
      }}
    >
      <p>令和３年９月時点でEU及び英国が該当</p>
      <p style={{ color: FOREIGN_ACCENT, fontSize: 'clamp(11px, 0.95vw, 13px)', marginTop: 2 }}>
        *米国は含まれていない
      </p>
    </div>
  );
}

function RulesNoteBox() {
  return (
    <div
      className="rounded-lg border px-3 py-2 leading-snug"
      style={{
        borderColor: 'rgba(255,255,255,0.14)',
        background: 'rgba(255,255,255,0.04)',
        fontSize: 'clamp(11.5px, 1vw, 13.5px)',
        color: 'rgba(255,255,255,0.72)',
      }}
    >
      <p className="font-bold text-white/90 mb-1" style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}>
        【個人情報保護規則16条】
      </p>
      <ul className="list-disc pl-4 space-y-0.5">
        <li>
          個人情報取扱事業者と提供先との間で、法の趣旨に沿った第4章2節の規定の実施に関する措置が、適切かつ合理的な方法により
          <span style={{ color: EMPHASIS_RED, fontWeight: 700 }}>確保されていること</span>
        </li>
        <li>
          提供先が
          <span style={{ color: EMPHASIS_RED, fontWeight: 700 }}>国際的な枠組みに基づく認定</span>
          を有すること
        </li>
      </ul>
      <p className="text-white/45 mt-1" style={{ fontSize: 'clamp(11px, 0.92vw, 12.5px)' }}>
        *例としてAPECの越境プライバシールール：CBPR
      </p>
    </div>
  );
}

const REQUIREMENT_ITEMS = [
  '個人情報取扱事業者',
  '外国にある',
  '第三者',
] as const;

function RequirementsGroup({
  boxRef,
}: {
  boxRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex items-stretch shrink-0 lg:self-stretch">
      <BracketTag label="【要件】" />
      <div
        ref={boxRef}
        className="flex flex-col justify-center gap-2 rounded-xl border px-3 py-3 min-w-[11.5rem] md:min-w-[12.5rem] self-stretch"
        style={{
          borderColor: `${LAW_ACCENT}55`,
          background: `${LAW_ACCENT}0a`,
        }}
      >
        {REQUIREMENT_ITEMS.map((label) => (
          <RequirementPill key={label} label={label} />
        ))}
      </div>
    </div>
  );
}

function EffectGroup() {
  return (
    <div className="flex items-stretch shrink-0">
      <BracketTag label="【効果】" />
      <div
        className="flex items-center rounded-xl border px-3 py-3 min-w-[11.5rem] md:min-w-[12.5rem]"
        style={{
          borderColor: `${LAW_ACCENT}55`,
          background: `${LAW_ACCENT}0a`,
        }}
      >
        <FlowPillButton label="本人の同意" className="w-full" />
      </div>
    </div>
  );
}

function FlowDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const requirementBoxRef = useRef<HTMLDivElement>(null);
  const exceptionStartRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={diagramRef}
      className="relative w-full flex flex-col gap-4 md:gap-5 shrink-0"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.22 }}
    >
      <RequirementToExceptionArrow
        containerRef={diagramRef}
        fromRef={requirementBoxRef}
        toRef={exceptionStartRef}
      />

      {/* 要件：3項目のまとまり → 矢印 → 補足 */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 lg:items-stretch">
        <RequirementsGroup boxRef={requirementBoxRef} />

        <div className="hidden lg:flex flex-1 min-w-0 flex-col justify-center gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <FlowArrowRight />
            <ForeignNoteBox />
          </div>
          <div className="flex items-start gap-2.5 min-w-0">
            <FlowArrowRight className="mt-2 shrink-0" />
            <RulesNoteBox />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-white/35 shrink-0" style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}>
              外国にある →
            </span>
            <ForeignNoteBox />
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white/35 shrink-0 pt-2" style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}>
              第三者 →
            </span>
            <RulesNoteBox />
          </div>
        </div>
      </div>

      {/* 要件 → 効果（下向き）＋ 例外フロー（右） */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 lg:items-start">
        <div className="flex flex-col items-center lg:items-start shrink-0">
          <FlowArrowDown className="hidden lg:block ml-[5.5rem] -mb-0.5" />
          <EffectGroup />
        </div>

        <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1 lg:pt-5">
          <div ref={exceptionStartRef} className="shrink-0">
            <ExceptionGroup tag="【例外該当時】" label="27条の適用（第三者提供）" />
          </div>
          <FlowArrowIcon />
          <ExceptionGroup tag="【例外規定】" label="第三者委託の例外" />
          <FlowArrowIcon />
          <ExceptionGroup tag="【25条】" label="第三者監督義務" />
        </div>
      </div>
    </motion.div>
  );
}

function Article28Text() {
  return (
    <motion.div
      className="w-full rounded-xl border shrink-0"
      style={{
        borderColor: `${LAW_ACCENT}44`,
        background: `linear-gradient(160deg, ${LAW_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <div className="px-4 py-3 md:px-5 md:py-3.5 flex flex-col gap-2">
        <h3
          className="font-bold text-white tracking-tight"
          style={{ fontSize: 'clamp(16px, 1.35vw, 20px)' }}
        >
          第28条（外国にある第三者への提供の制限）
        </h3>
        <p
          className="text-white/88 leading-[1.72]"
          style={{ fontSize: 'clamp(12.5px, 1.08vw, 14.5px)' }}
        >
          <span className="text-white/55">1. </span>
          <span style={{ color: HIGHLIGHT_OPERATOR, fontWeight: 700 }}>個人情報取扱事業者</span>
          は、個人データを
          <HighlightForeignThirdParty />
          （外国の規制により個人の権利利益を保護する措置が我が国の個人の権利利益を保護するために通常講ずられるべき措置と同一の水準にあるものとして個人情報保護委員会規則で定める要件に該当するものに限る。以下同じ。）に提供しようとする場合には、あらかじめ前条第一項各号に掲げる場合を除くほか、本人から本人が識別される個人情報についての当該
          <HighlightForeignThirdParty />
          による提供に係る個人データの取扱いに関する情報（個人データの取扱いの内容を含むものに限る。）についての
          <span style={{ color: HIGHLIGHT_CONSENT, fontWeight: 700 }}>本人の同意</span>
          を得なければならない。
        </p>
        <p
          className="text-white/40"
          style={{ fontSize: 'clamp(13px, 1.02vw, 15px)' }}
        >
          2. （略）
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide59Article28ForeignThirdParty() {
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
            style={{ fontSize: 'clamp(11px, 1.1vw, 14px)' }}
          >
            4-4 · 個人情報
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
          >
            外国にある第三者への
            <span
              className="bg-clip-text text-transparent ml-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${FOREIGN_ACCENT} 0%, ${LAW_ACCENT} 100%)`,
              }}
            >
              提供の制限
            </span>
          </h2>
        </div>

        <Article28Text />
        <FlowDiagram />
      </motion.div>
    </SlideWrapper>
  );
}
