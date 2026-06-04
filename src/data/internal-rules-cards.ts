/**
 * 社内生成AI利用規程 — 全条項（CardWheel / サイドバー / 目次で共有）
 */

export interface RuleCard {
  id: string;
  number: string;
  chapter: string;
  title: string;
  accent: string;
  gradient: [string, string];
  group: string;
}

const G = {
  ideals: { accent: '#60a5fa', grad: ['#3b82f6', '#1d4ed8'] as [string, string], label: '目的・基本理念' },
  user: { accent: '#88bbff', grad: ['#5fa0ef', '#3a6cd1'] as [string, string], label: 'ユーザー' },
  tool: { accent: '#c8a8ff', grad: ['#a98aea', '#6e4ab8'] as [string, string], label: 'ツール' },
  input: { accent: '#9ee0a8', grad: ['#7fc890', '#3f9c5e'] as [string, string], label: '入力情報' },
  output: { accent: '#ff9966', grad: ['#f17a45', '#c64823'] as [string, string], label: '出力' },
  log: { accent: '#f2d160', grad: ['#e0bb3a', '#a98a17'] as [string, string], label: '記録' },
  govern: { accent: '#ff7aa8', grad: ['#e85a8d', '#a73069'] as [string, string], label: 'ガバナンス' },
} as const;

export const INTERNAL_RULE_CARDS: RuleCard[] = [
  { id: '1-1', number: '1-1', chapter: '1', title: '基本方針', accent: G.ideals.accent, gradient: G.ideals.grad, group: G.ideals.label },
  { id: '1-2', number: '1-2', chapter: '1', title: '利用目的', accent: G.ideals.accent, gradient: G.ideals.grad, group: G.ideals.label },
  { id: '1-3', number: '1-3', chapter: '1', title: '統括責任者', accent: G.ideals.accent, gradient: G.ideals.grad, group: G.ideals.label },

  { id: '2-1', number: '2-1', chapter: '2', title: '使用者の範囲', accent: G.user.accent, gradient: G.user.grad, group: G.user.label },
  { id: '2-2', number: '2-2', chapter: '2', title: 'アカウントの管理', accent: G.user.accent, gradient: G.user.grad, group: G.user.label },

  { id: '3-1', number: '3-1', chapter: '3', title: '総論', accent: G.tool.accent, gradient: G.tool.grad, group: G.tool.label },
  { id: '3-2', number: '3-2', chapter: '3', title: 'アクセス可能な端末', accent: G.tool.accent, gradient: G.tool.grad, group: G.tool.label },
  { id: '3-3', number: '3-3', chapter: '3', title: '使用可能なAIツール・プランの指定', accent: G.tool.accent, gradient: G.tool.grad, group: G.tool.label },
  { id: '3-4', number: '3-4', chapter: '3', title: 'エージェント・MCPの取扱い', accent: G.tool.accent, gradient: G.tool.grad, group: G.tool.label },

  { id: '4-1', number: '4-1', chapter: '4', title: '総論', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-2', number: '4-2', chapter: '4', title: '入力禁止情報', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-3', number: '4-3', chapter: '4', title: '社内秘密情報・営業秘密', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-4', number: '4-4', chapter: '4', title: '個人情報', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-5', number: '4-5', chapter: '4', title: '取引先・他社の秘密情報', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-6', number: '4-6', chapter: '4', title: '著作物', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },
  { id: '4-7', number: '4-7', chapter: '4', title: 'その他', accent: G.input.accent, gradient: G.input.grad, group: G.input.label },

  { id: '5-1', number: '5-1', chapter: '5', title: '出力の取扱い（総論）', accent: G.output.accent, gradient: G.output.grad, group: G.output.label },
  { id: '5-2', number: '5-2', chapter: '5', title: 'HITL', accent: G.output.accent, gradient: G.output.grad, group: G.output.label },
  { id: '5-3', number: '5-3', chapter: '5', title: '著作権関連', accent: G.output.accent, gradient: G.output.grad, group: G.output.label },
  { id: '5-4', number: '5-4', chapter: '5', title: '秘密情報入力', accent: G.output.accent, gradient: G.output.grad, group: G.output.label },
  { id: '5-5', number: '5-5', chapter: '5', title: '出力利用時の　社内審査', accent: G.output.accent, gradient: G.output.grad, group: G.output.label },

  { id: '6-1', number: '6-1', chapter: '6', title: '作業ログの取扱い', accent: G.log.accent, gradient: G.log.grad, group: G.log.label },

  { id: '7-1', number: '7-1', chapter: '7', title: '違反時の対応', accent: G.govern.accent, gradient: G.govern.grad, group: G.govern.label },
  { id: '7-2', number: '7-2', chapter: '7', title: '社内リテラシー向上', accent: G.govern.accent, gradient: G.govern.grad, group: G.govern.label },
  { id: '7-3', number: '7-3', chapter: '7', title: '規程の見直し', accent: G.govern.accent, gradient: G.govern.grad, group: G.govern.label },
];

export const INTERNAL_RULES_TOC_SLIDE_ID = '28-internal-rules-toc';
export const CHAPTER_02_BACK_KEY = 'chapter-02-back';

export function groupRuleCards() {
  const out: { group: string; accent: string; items: { card: RuleCard; idx: number }[] }[] = [];
  INTERNAL_RULE_CARDS.forEach((card, idx) => {
    const last = out[out.length - 1];
    if (last && last.group === card.group) {
      last.items.push({ card, idx });
    } else {
      out.push({ group: card.group, accent: card.accent, items: [{ card, idx }] });
    }
  });
  return out;
}

/** 条項ID一致、または章番号のみ（Recap 用）でアクティブ判定 */
export function isRuleCardActive(card: RuleCard, rulesToc?: string): boolean {
  if (!rulesToc) return false;
  if (rulesToc === card.id) return true;
  if (/^\d$/.test(rulesToc) && card.chapter === rulesToc) return true;
  return false;
}

export function getActiveRuleCard(rulesToc?: string): RuleCard | undefined {
  if (!rulesToc) return undefined;
  const exact = INTERNAL_RULE_CARDS.find((c) => c.id === rulesToc);
  if (exact) return exact;
  if (/^\d$/.test(rulesToc)) {
    const inChapter = INTERNAL_RULE_CARDS.filter((c) => c.chapter === rulesToc);
    return inChapter[inChapter.length - 1];
  }
  return undefined;
}
