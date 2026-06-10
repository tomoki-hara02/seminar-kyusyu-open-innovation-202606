'use client';

import { createContext, useContext } from 'react';

/**
 * Presentation 全体で共有されるコンテキスト。
 * スライドコンポーネントから goTo を呼ぶために使う。
 * （スライドは props を受け取れないため Context 経由で提供する）
 */
export interface PresentationContextValue {
  currentSlide: number;
  goTo: (index: number) => void;
  /** スライド id を指定してジャンプ（関連規程リンク等で使用） */
  goToId: (id: string) => void;
}

export const PresentationContext = createContext<PresentationContextValue>({
  currentSlide: 0,
  goTo: () => {},
  goToId: () => {},
});

export const usePresentationContext = () => useContext(PresentationContext);
