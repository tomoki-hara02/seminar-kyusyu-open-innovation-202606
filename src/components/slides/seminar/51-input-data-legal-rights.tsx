'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import {
  LEGAL_RIGHTS_CHAPTER_ACCENT,
  RightsHubDiagram,
} from './shared/legal-rights-hub';

/**
 * p51: 4-1 入力情報 総論 — データに付着する法的権利関係
 *
 * ベーステンプレート: `templates/KnowledgeGraph.tsx`
 */

export default function Slide51InputDataLegalRights() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            4-1 · 入力情報 総論
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            データに付着しやすい
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LEGAL_RIGHTS_CHAPTER_ACCENT} 0%, #88bbff 100%)`,
              }}
            >
              主な法的権利関係
            </span>
          </h2>
        </div>

        <RightsHubDiagram />
      </motion.div>
    </SlideWrapper>
  );
}
