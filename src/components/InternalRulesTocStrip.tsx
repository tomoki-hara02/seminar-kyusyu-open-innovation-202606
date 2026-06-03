'use client';

import { useMemo } from 'react';
import {
  groupRuleCards,
  isRuleCardActive,
  INTERNAL_RULE_CARDS,
} from '@/data/internal-rules-cards';

interface InternalRulesTocStripProps {
  currentRulesToc?: string;
  slideIndexByRuleId: Map<string, number>;
  onNavigate: (slideIndex: number) => void;
  /** 独立パネル内では区切り線・外枠を省略 */
  embedded?: boolean;
}

export default function InternalRulesTocStrip({
  currentRulesToc,
  slideIndexByRuleId,
  onNavigate,
  embedded = true,
}: InternalRulesTocStripProps) {
  const grouped = useMemo(() => groupRuleCards(), []);

  return (
    <div className={embedded ? 'mt-3 pt-3 border-t border-white/10' : ''}>
      {embedded && (
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <span className="text-[10px] tracking-[0.24em] uppercase text-white/50 font-semibold">
            社内規程目次
          </span>
          <span className="text-[9px] font-mono tabular-nums text-white/30">
            {INTERNAL_RULE_CARDS.length} 条項
          </span>
        </div>
      )}

      <div
        className={`flex flex-col gap-2 overflow-y-auto scrollbar-thin pr-1 ${
          embedded ? 'max-h-[min(42vh,320px)]' : 'max-h-none gap-3'
        }`}
      >
        {grouped.map((g) => (
          <div key={g.group}>
            <span
              className="text-[9px] tracking-[0.2em] uppercase font-bold px-1"
              style={{ color: g.accent }}
            >
              {g.group}
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {g.items.map(({ card }) => {
                const targetIdx = slideIndexByRuleId.get(card.id);
                const isActive = isRuleCardActive(card, currentRulesToc);
                const isDisabled = targetIdx === undefined;

                return (
                  <button
                    key={card.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (targetIdx !== undefined) onNavigate(targetIdx);
                    }}
                    title={card.title}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-left transition-all duration-150 ${
                      isDisabled
                        ? 'opacity-35 cursor-not-allowed border-white/5 text-white/35'
                        : isActive
                          ? 'border-white/35 bg-white/12 text-white'
                          : 'border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.08] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums font-bold"
                      style={{ color: isActive ? card.accent : 'rgba(255,255,255,0.4)' }}
                    >
                      {card.number}
                    </span>
                    <span className="text-[10px] leading-none max-w-[8rem] truncate">
                      {card.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
