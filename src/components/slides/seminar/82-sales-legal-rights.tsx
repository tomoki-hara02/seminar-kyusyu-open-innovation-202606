'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';
import {
  LEGAL_RIGHTS_CHAPTER_ACCENT,
  RightsHubDiagram,
} from './shared/legal-rights-hub';

/** p85: 商談編 — 商談時に気を付けるべき法律関係（営業秘密・秘密保持契約をハイライト） */

const HIGHLIGHT_IDS = ['trade-secret', 'nda'] as const;

const SALES_ACCENT = '#f7c46c';

export default function Slide82SalesLegalRights() {
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
            商談編 · 法的論点
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.8vw, 38px)' }}
          >
            商談時に気を付けるべき
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${SALES_ACCENT} 0%, ${LEGAL_RIGHTS_CHAPTER_ACCENT} 100%)`,
              }}
            >
              法律関係
            </span>
          </h2>
          <p
            className="text-white/45 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            取引先・関係者から受領する情報 — 特に
            <span className="text-white/80 font-medium"> 営業秘密 </span>
            と
            <span className="text-white/80 font-medium"> 秘密保持契約 </span>
            の範囲を意識する
          </p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <RelatedRuleLink
              targetId="58-third-party-secrets"
              label="関連: 4-5 取引先・他社の秘密情報"
              accent={SALES_ACCENT}
            />
          </div>
        </div>

        <RightsHubDiagram highlightIds={HIGHLIGHT_IDS} />
      </motion.div>
    </SlideWrapper>
  );
}
