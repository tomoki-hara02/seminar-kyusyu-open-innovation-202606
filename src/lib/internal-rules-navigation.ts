import type { SlideEntry } from '@/config/slide-entry';
import {
  CHAPTER_02_BACK_KEY,
  INTERNAL_RULES_TOC_SLIDE_ID,
} from '@/data/internal-rules-cards';

/** p31 以降（Chapter 02 後編）で社内規程目次ボタンを表示するか */
export function shouldShowRulesTocButton(
  entries: SlideEntry[],
  currentIndex: number
): boolean {
  const entry = entries[currentIndex];
  if (!entry || entry.chapter !== CHAPTER_02_BACK_KEY) return false;

  const tocIndex = entries.findIndex((e) => e.id === INTERNAL_RULES_TOC_SLIDE_ID);
  if (tocIndex < 0) return false;
  return currentIndex >= tocIndex;
}

/** 条項ID → 最初に該当するスライド index */
export function buildRulesTocSlideIndexMap(entries: SlideEntry[]): Map<string, number> {
  const map = new Map<string, number>();
  entries.forEach((entry, index) => {
    if (!entry.rulesToc) return;
    if (!map.has(entry.rulesToc)) {
      map.set(entry.rulesToc, index);
    }
  });
  return map;
}
