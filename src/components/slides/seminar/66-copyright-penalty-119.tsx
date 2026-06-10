'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p66: 4-6 著作物 — 侵害に対する請求類型と故意・過失の効果
 *
 * 出典: 06_侵害に対する措置 · 01_著作権法
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';
const PENALTY_ACCENT = '#f87171';

const GRID_COLS = '1.05fr 1.15fr 0.75fr 1.05fr 1.05fr';

type CellMark = 'yes' | 'no' | 'yes-note' | 'yes-penalty';

type TableRow = {
  type: string;
  basis: string;
  intentRequired: string;
  recognized: CellMark;
  recognizedNote?: string;
  unrecognized: CellMark;
  unrecognizedNote?: string;
  accent?: string;
};

const ROWS: TableRow[] = [
  {
    type: '差止請求',
    basis: '著作権法112条',
    intentRequired: '不要',
    recognized: 'yes',
    unrecognized: 'yes-note',
    unrecognizedNote: '免れない',
  },
  {
    type: '損害賠償',
    basis: '民法709条＋著114条',
    intentRequired: '必要',
    recognized: 'yes',
    unrecognized: 'no',
  },
  {
    type: '不当利得返還',
    basis: '民法703・704条',
    intentRequired: '不要',
    recognized: 'yes',
    unrecognized: 'yes-note',
    unrecognizedNote: '免れない',
  },
  {
    type: '刑事罰',
    basis: '著作権法119条',
    intentRequired: '故意必要',
    recognized: 'yes-penalty',
    recognizedNote: '親告罪・123条',
    unrecognized: 'no',
    accent: PENALTY_ACCENT,
  },
];

function MarkCell({
  mark,
  note,
  accent = CHAPTER_ACCENT,
}: {
  mark: CellMark;
  note?: string;
  accent?: string;
}) {
  const isYes = mark !== 'no';
  const color = isYes
    ? mark === 'yes-penalty'
      ? accent
      : CHAPTER_ACCENT
    : 'rgba(255,255,255,0.35)';

  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <span
        className="font-bold leading-none"
        style={{ color, fontSize: 'clamp(14px, 1.2vw, 18px)' }}
      >
        {isYes ? '○' : '×'}
      </span>
      {note ? (
        <span
          className="text-white/50 leading-tight"
          style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
        >
          （{note}）
        </span>
      ) : null}
    </div>
  );
}

function TableHeader() {
  return (
    <>
      <div
        className="grid items-end gap-x-2 gap-y-1 px-3 md:px-4 py-2.5 border-b border-white/10 bg-white/[0.03]"
        style={{ gridTemplateColumns: GRID_COLS }}
      >
        <span
          className="font-semibold text-white/55"
          style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          請求類型
        </span>
        <span
          className="font-semibold text-white/55"
          style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          根拠条文
        </span>
        <span
          className="font-semibold text-white/55 text-center"
          style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
        >
          故意・過失
        </span>
        <span
          className="font-semibold text-center leading-snug"
          style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(10px, 0.82vw, 11px)' }}
        >
          AI利用者が
          <br />
          著作物を認識していた場合
        </span>
        <span
          className="font-semibold text-center leading-snug"
          style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(10px, 0.82vw, 11px)' }}
        >
          認識なし・
          <br />
          過失もない場合
        </span>
      </div>
    </>
  );
}

function TableRowItem({ row, index }: { row: TableRow; index: number }) {
  const accent = row.accent ?? LAW_ACCENT;

  return (
    <motion.div
      className="grid items-center gap-x-2 gap-y-1 px-3 md:px-4 py-2.5 md:py-3 border-b border-white/5 last:border-b-0"
      style={{ gridTemplateColumns: GRID_COLS }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.07 }}
    >
      <span
        className="font-bold text-white leading-snug"
        style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
      >
        {row.type}
      </span>
      <span
        className="font-mono text-white/80 leading-snug"
        style={{ color: accent, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
      >
        {row.basis}
      </span>
      <span
        className="text-center text-white/70 leading-snug"
        style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
      >
        {row.intentRequired}
      </span>
      <div className="flex justify-center">
        <MarkCell
          mark={row.recognized}
          note={row.recognizedNote}
          accent={accent}
        />
      </div>
      <div className="flex justify-center">
        <MarkCell
          mark={row.unrecognized}
          note={row.unrecognizedNote}
          accent={accent}
        />
      </div>
    </motion.div>
  );
}

export default function Slide66CopyrightPenalty119() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl h-full justify-center py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
          >
            4-6 · 著作物 · 侵害に対する措置
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-snug"
            style={{ fontSize: 'clamp(18px, 1.9vw, 28px)' }}
          >
            <span className="text-white/55 mr-2">Ⅲ</span>
            侵害に対する請求類型と故意・過失の効果
          </h2>
          <span
            className="text-white/35 tracking-wide"
            style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}
          >
            06_侵害に対する措置 · 01_著作権法
          </span>
        </div>

        <motion.div
          className="rounded-xl overflow-hidden border"
          style={{
            borderColor: `${LAW_ACCENT}55`,
            background: `linear-gradient(160deg, ${LAW_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <TableHeader />
          {ROWS.map((row, i) => (
            <TableRowItem key={row.type} row={row} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
