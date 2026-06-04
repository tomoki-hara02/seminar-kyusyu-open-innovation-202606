import type { ComponentType } from 'react';
import type { DeckBackgroundVariant } from '@/components/backgrounds';

/** スライド登録エントリ（`seminarSlides.ts` で使用） */
export interface SlideEntry {
  /** 一意の slug。URL ハッシュやアナリティクス用 */
  id: string;
  /** スライドコンポーネント */
  Component: ComponentType;
  /**
   * 表示する背景。`undefined`/`null` のときは背景なし（黒）。
   * 値はメタデータとして Presentation.tsx の `<DeckBackground />` が読みます。
   */
  background?: DeckBackgroundVariant | null;
  /** 開発者向けのラベル（IDE のホバーで見える） */
  note?: string;
  textSelectable?: boolean;
  /**
   * 目次（TableOfContents）に表示する日本語タイトル。
   * 未指定の場合はコンポーネント名から自動生成された英語名が表示される。
   */
  title?: string;
  /**
   * 目次でグルーピングするための章キー（例: 'opening' / 'chapter-01'）。
   * 章ラベル・サブタイトルは TableOfContents 側の CHAPTER_LABELS で定義する。
   */
  chapter?: string;
  /**
   * Chapter 02 後編（投影 p31 以降）で社内規程目次が指す条項。
   * 条項 ID（"1-2" 等）または章 Recap 用に章番号のみ（"1" 等）。
   */
  rulesToc?: string;
}
