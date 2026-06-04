'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import {
  LEGAL_RIGHTS_CHAPTER_ACCENT,
  RightsHubDiagram,
} from './shared/legal-rights-hub';

/** p89: クリエイティブ編 — 業務委託時の法的関係（著作権・不正競争防止法・人格的利益をハイライト） */

const HIGHLIGHT_IDS = ['copyright', 'trade-secret', 'civil'] as const;

const CREATIVE_ACCENT = '#c8a8ff';

export default function Slide86CreativeLegalRights() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            クリエイティブ編 · 法的論点
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.8vw, 38px)' }}
          >
            業務委託時に気を付けるべき
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${CREATIVE_ACCENT} 0%, ${LEGAL_RIGHTS_CHAPTER_ACCENT} 100%)`,
              }}
            >
              法律関係
            </span>
          </h2>
          <p
            className="text-white/45 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            委託成果・素材の取扱い — 特に
            <span className="text-white/80 font-medium"> 著作権 </span>
            ・
            <span className="text-white/80 font-medium"> 不正競争防止法 </span>
            ・
            <span className="text-white/80 font-medium"> 人格的利益 </span>
            を意識する
          </p>
        </div>

        <RightsHubDiagram highlightIds={HIGHLIGHT_IDS} />
      </motion.div>
    </SlideWrapper>
  );
}
