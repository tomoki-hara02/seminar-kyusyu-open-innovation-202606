import type { SlideEntry } from '@/config/slides';

import Slide01Title       from '@/components/slides/seminar/01-title';
import Slide02OfficeIntro from '@/components/slides/seminar/02-office-intro';
import Slide03Speaker     from '@/components/slides/seminar/03-speaker';
import Slide04HotTopics      from '@/components/slides/seminar/04-hot-topics';
import Slide05CrmPipeline    from '@/components/slides/seminar/05-crm-pipeline';
import Slide06WebPipeline    from '@/components/slides/seminar/06-web-pipeline';
import Slide07DemoGallery    from '@/components/slides/seminar/07-demo-gallery';
import Slide08AICapability   from '@/components/slides/seminar/08-ai-capability';
import Slide09Agenda         from '@/components/slides/seminar/09-agenda';
import Slide10Start          from '@/components/slides/seminar/10-start';
import Slide11Chapter01      from '@/components/slides/seminar/11-chapter-01';
import Slide12AIRoi          from '@/components/slides/seminar/12-ai-roi';
import Slide13LivePlan           from '@/components/slides/seminar/13-live-plan';
import Slide14WorkshopIntro    from '@/components/slides/seminar/14-workshop-intro';
import Slide15EmployeeVoices   from '@/components/slides/seminar/15-employee-voices';
import Slide16Recap            from '@/components/slides/seminar/16-recap';
import Slide17Chapter02        from '@/components/slides/seminar/17-chapter-02';
import Slide18AiPrinciples    from '@/components/slides/seminar/18-ai-principles';
import Slide19CognitiveTraps from '@/components/slides/seminar/19-cognitive-traps';
import Slide20BiasDivide     from '@/components/slides/seminar/20-bias-divide';
import Slide21RightsNetwork  from '@/components/slides/seminar/21-rights-network';
import Slide22Guidelines      from '@/components/slides/seminar/22-guidelines-text';
import Slide23RiskBased        from '@/components/slides/seminar/23-risk-based';
import Slide24RiskExamples     from '@/components/slides/seminar/24-risk-examples';
import Slide25RiskPractice     from '@/components/slides/seminar/25-risk-practice';
import Slide25DataFlow         from '@/components/slides/seminar/25-data-flow';
import Slide26Chapter02Recap  from '@/components/slides/seminar/26-chapter-02-recap';
import Slide27Chapter02Back    from '@/components/slides/seminar/27-chapter-02-back';
import Slide28RulesFunnel      from '@/components/slides/seminar/28-rules-funnel';
import Slide29InternalRulesToc from '@/components/slides/seminar/29-internal-rules-toc';
import Slide30BasicPolicyKeywords from '@/components/slides/seminar/30-basic-policy-keywords';
import Slide31UsagePurposeRestrictions from '@/components/slides/seminar/31-usage-purpose-restrictions';
import Slide32ChiefResponsibleRecap from '@/components/slides/seminar/32-chief-responsible-recap';
import Slide33UserScopePatterns from '@/components/slides/seminar/33-user-scope-patterns';
import Slide34AccountManagement from '@/components/slides/seminar/34-account-management';
import Slide35ToolAnalysisPerspectives from '@/components/slides/seminar/35-tool-analysis-perspectives';
import Slide36AccessibleDevices from '@/components/slides/seminar/36-accessible-devices';
import Slide37AiToolPlanSpec from '@/components/slides/seminar/37-ai-tool-plan-spec';
import Slide38McpAgentHandling from '@/components/slides/seminar/38-mcp-agent-handling';
import Slide39InputDataLegalRights from '@/components/slides/seminar/39-input-data-legal-rights';
import Slide40ProhibitedInputExamples from '@/components/slides/seminar/40-prohibited-input-examples';
import Slide41RiskBasedInputRelationship from '@/components/slides/seminar/41-risk-based-input-relationship';
import Slide42TradeSecretAct from '@/components/slides/seminar/42-trade-secret-act';
import Slide43PipActGenaiCheckpoints from '@/components/slides/seminar/43-pip-act-genai-checkpoints';
import Slide44PipActGenaiArticles from '@/components/slides/seminar/44-pip-act-genai-articles';
import Slide45DataResidencyPatterns from '@/components/slides/seminar/45-data-residency-patterns';
import Slide46Article28ForeignThirdParty from '@/components/slides/seminar/46-article-28-foreign-third-party';
import Slide47PipRecap from '@/components/slides/seminar/47-pip-recap';

/**
 * 本番セミナー「生成AIを"安心して使い倒す"ためのルールづくり入門」用のスライド一覧。
 *
 * - 並び順 = 投影順
 * - 各エントリの `id` はファイル名のページ番号と揃える（`01-title` など）
 * - `background` を指定するとそのスライド表示中だけ背景を切り替えられる
 *
 * スライドを追加するときは:
 *   1. `src/components/slides/seminar/NN-xxx.tsx` を作成
 *   2. 本ファイル冒頭で import
 *   3. `seminarSlideRegistry` 末尾に push
 */
export const seminarSlideRegistry: SlideEntry[] = [
  // ── Opening ─────────────────────────────────────────────
  {
    id: '01-title',
    Component: Slide01Title,
    background: 'morph',
    chapter: 'opening',
    title: 'タイトル',
    note: 'p1: タイトル',
  },
  {
    id: '02-office-intro',
    Component: Slide02OfficeIntro,
    background: 'logoParticles',
    chapter: 'opening',
    title: '事務所紹介',
    note: 'p2: 事務所紹介',
  },
  {
    id: '03-speaker',
    Component: Slide03Speaker,
    background: 'logoParticles',
    chapter: 'opening',
    title: '講師紹介',
    note: 'p3: 講師紹介',
  },
  {
    id: '04-hot-topics',
    Component: Slide04HotTopics,
    chapter: 'opening',
    title: '近時の生成AIホットトピック',
    note: 'p4: 近時の生成AIのホットトピック',
  },
  {
    id: '05-crm-pipeline',
    Component: Slide05CrmPipeline,
    chapter: 'opening',
    title: '活用事例 — CRMパイプライン',
    note: 'p5: 活用事例 CRM パイプライン',
  },
  {
    id: '06-web-pipeline',
    Component: Slide06WebPipeline,
    chapter: 'opening',
    title: '活用事例 — Webマーケティング',
    note: 'p6: 活用事例 Webマーケティング パイプライン',
  },
  {
    id: '07-demo-gallery',
    Component: Slide07DemoGallery,
    chapter: 'opening',
    title: 'デモギャラリー',
    note: 'p7: デモギャラリー',
  },
  {
    id: '08-ai-capability',
    Component: Slide08AICapability,
    chapter: 'opening',
    title: '生成AIは異次元の成果を出す',
    note: 'p8: 生成AIは異次元の成果を出す',
  },
  {
    id: '09-agenda',
    Component: Slide09Agenda,
    background: 'logoParticles',
    chapter: 'opening',
    title: '本日のテーマ（アジェンダ）',
    note: 'p9: 本日のテーマ（アジェンダ）',
  },
  {
    id: '10-start',
    Component: Slide10Start,
    background: 'logoParticles',
    chapter: 'opening',
    title: 'では、始めましょう',
    note: 'p10: では、始めましょう！',
  },

  // ── Chapter 01: 生成AI活用プランの作成 ──────────────────
  {
    id: '11-chapter-01',
    Component: Slide11Chapter01,
    chapter: 'chapter-01',
    title: 'Chapter 01 表紙 — 生成AI活用プラン',
    note: 'p11: Chapter 01 生成AI活用プランの作成',
  },
  {
    id: '12-ai-roi',
    Component: Slide12AIRoi,
    chapter: 'chapter-01',
    title: 'MIT GenAI Divide — 95%とROI',
    note: 'p12: MIT GenAI Divide — 95%とROI',
  },
  {
    id: '13-live-plan',
    Component: Slide13LivePlan,
    chapter: 'chapter-01',
    title: 'Live Demo — 架空企業AI活用プラン',
    note: 'p13: Live Demo — 架空企業 AI活用プラン作成',
  },
  {
    id: '14-workshop-intro',
    Component: Slide14WorkshopIntro,
    chapter: 'chapter-01',
    title: 'ワークショップ — 生成AI活用プラン作成',
    note: 'p14: ワークショップ開始アナウンス',
  },
  {
    id: '15-employee-voices',
    Component: Slide15EmployeeVoices,
    chapter: 'chapter-01',
    title: '従業員の声 — ワークショップ素材',
    note: 'p15: 従業員の声をもとに生成AI活用プランを考える',
    textSelectable: true,
  },
  {
    id: '16-recap',
    Component: Slide16Recap,
    chapter: 'chapter-01',
    title: 'Recap — ここまでの3つのポイント',
    note: 'p16: Recap — ここまでの 3 つのポイント',
  },

  // ── Chapter 02: 生成AI社内規程の作成 ────────────────────
  // ── Chapter 02 前編: 生成AI社内規程の作成（全体像） ──────────────────────────
  {
    id: '17-chapter-02',
    Component: Slide17Chapter02,
    chapter: 'chapter-02-front',
    title: 'Chapter 02 表紙（前編）— 社内規程の全体像',
    note: 'p17: Chapter 02 前編 — 生成AI社内規程の作成（全体像解説）',
  },
  {
    id: '18-ai-principles',
    Component: Slide18AiPrinciples,
    chapter: 'chapter-02-front',
    title: 'AI事業者ガイドライン基本理念',
    note: 'p18: AI事業者ガイドライン基本理念 — Dignity / Diversity & Inclusion / Sustainability',
  },
  {
    id: '19-cognitive-traps',
    Component: Slide19CognitiveTraps,
    chapter: 'chapter-02-front',
    title: '人間の尊厳 — 思考の放棄 × サイコファンシー',
    note: 'p19: 人間の尊厳に背く2つの落とし穴（思考の放棄/サイコファンシー）',
  },
  {
    id: '20-bias-divide',
    Component: Slide20BiasDivide,
    chapter: 'chapter-02-front',
    title: '多様性・包摂 — バイアス × AIディバイド',
    note: 'p20: 多様性・包摂を損なう2つの構造（バイアス/AIディバイド）',
  },
  {
    id: '21-rights-network',
    Component: Slide21RightsNetwork,
    chapter: 'chapter-02-front',
    title: '持続可能性 — 崩壊の具体例 × 果実分配の設計',
    note: 'p21: インフルエンサー生成動画（崩壊）× 生成AIの果実分配（仕組み設計）',
  },
  {
    id: '22-guidelines-text',
    Component: Slide22Guidelines,
    chapter: 'chapter-02-front',
    title: '経産省AIガイドライン1.2版 — リスクベース引用',
    note: 'p22: 経産省AIガイドライン1.2版 — リスクベースアプローチ引用',
    textSelectable: true,
  },
  {
    id: '23-risk-based',
    Component: Slide23RiskBased,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチとは（マトリックス）',
    note: 'p23: リスクベースアプローチとは？（リスクマトリックス）',
  },
  {
    id: '24-risk-examples',
    Component: Slide24RiskExamples,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチ — 具体例',
    note: 'p24: リスクベースアプローチ具体例（チャット形式）',
  },
  {
    id: '25-risk-practice',
    Component: Slide25RiskPractice,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチ — 実践例（名刺管理MCP）',
    note: 'p25: リスクベースアプローチ実践例 — 名刺管理MCP → zod → 重複登録リスク → HITL/続行 → 判断',
  },
  {
    id: '25-data-flow',
    Component: Slide25DataFlow,
    chapter: 'chapter-02-front',
    title: '生成AI社内規程に関する４つの分析セグメント',
    note: 'p26: 生成AI社内規程に関する４つの分析セグメント（PC↔AI 双方向フロー）',
  },
  {
    id: '26-chapter-02-recap',
    Component: Slide26Chapter02Recap,
    chapter: 'chapter-02-front',
    title: 'Recap — Chapter 02 前編の3つのポイント',
    note: 'p27: Chapter 02 前編まとめ Recap',
  },

  // ── Chapter 02 後編: 生成AI社内規程の作成（各論） ────────────────────────────
  {
    id: '27-chapter-02-back',
    Component: Slide27Chapter02Back,
    chapter: 'chapter-02-back',
    title: 'Chapter 02 後編 — 社内規程の各論へ',
    note: 'p28: Chapter 02 後編 — 生成AI社内規程の作成（各論）',
  },
  {
    id: '28-rules-funnel',
    Component: Slide28RulesFunnel,
    chapter: 'chapter-02-back',
    title: '社内規程の射程 — 各AI利用規約の範囲内',
    note: 'p29: 生成AI利用規約 → 社内生成AI利用規約 ファネル図',
  },
  {
    id: '29-internal-rules-toc',
    Component: Slide29InternalRulesToc,
    chapter: 'chapter-02-back',
    title: '社内生成AI利用規程 — 全条項の目次（CardWheel）',
    note: 'p30: 社内規程の目次 — 全18条項 CardWheel + サイドバー',
  },
  {
    id: '30-basic-policy-keywords',
    Component: Slide30BasicPolicyKeywords,
    chapter: 'chapter-02-back',
    title: '1-1 基本方針 — 考えるべき項目',
    note: 'p31: 1-1 基本方針 — KeywordCloud（10項目）',
  },
  {
    id: '31-usage-purpose-restrictions',
    Component: Slide31UsagePurposeRestrictions,
    chapter: 'chapter-02-back',
    title: '1-2 利用目的 — 生成AI利用規約による制限',
    note: 'p32: 1-2 利用目的 — 禁止ユースケース（FurtherReading）',
    textSelectable: true,
  },
  {
    id: '32-chief-responsible-recap',
    Component: Slide32ChiefResponsibleRecap,
    chapter: 'chapter-02-back',
    title: '1-3 統括責任者 — 求められるもの',
    note: 'p33: 1-3 統括責任者 — Recap（4項目）',
  },
  {
    id: '33-user-scope-patterns',
    Component: Slide33UserScopePatterns,
    chapter: 'chapter-02-back',
    title: '2-1 使用者の範囲 — 活用者選定のパターン例',
    note: 'p34: 2-1 使用者の範囲 — FeatureCards（3パターン）',
  },
  {
    id: '34-account-management',
    Component: Slide34AccountManagement,
    chapter: 'chapter-02-back',
    title: '2-2 アカウントの管理 — 2つの要点',
    note: 'p35: 2-2 アカウントの管理 — 共有禁止 / アカウント別アクセス',
  },
  {
    id: '35-tool-analysis-perspectives',
    Component: Slide35ToolAnalysisPerspectives,
    chapter: 'chapter-02-back',
    title: '3-1 ツール総論 — 生成AIツール分析の視点',
    note: 'p36: 3-1 ツール総論 — 4つの分析視点（LayeredArch + ギミック）',
  },
  {
    id: '36-accessible-devices',
    Component: Slide36AccessibleDevices,
    chapter: 'chapter-02-back',
    title: '3-2 アクセス可能な端末 — 企業が注意すべきこと',
    note: 'p37: 3-2 アクセス可能な端末 — 私用端末禁止 / 法的・技術的対策',
  },
  {
    id: '37-ai-tool-plan-spec',
    Component: Slide37AiToolPlanSpec,
    chapter: 'chapter-02-back',
    title: '3-3 使用可能なAIツール・プランの指定',
    note: 'p38: 3-3 ツール・プラン指定 — 無料/個人禁止 / シャドーAI対策',
  },
  {
    id: '38-mcp-agent-handling',
    Component: Slide38McpAgentHandling,
    chapter: 'chapter-02-back',
    title: '3-4 エージェント・MCPの取扱い — 外部アプリへの送信',
    note: 'p39: 3-4 MCP・エージェント — WorldMap風データフロー図',
  },
  {
    id: '39-input-data-legal-rights',
    Component: Slide39InputDataLegalRights,
    chapter: 'chapter-02-back',
    title: '4-1 入力情報 総論 — データの法的権利関係',
    note: 'p40: 4-1 入力情報 総論 — DATAハブ + 5法令（KnowledgeGraph風）',
  },
  {
    id: '40-prohibited-input-examples',
    Component: Slide40ProhibitedInputExamples,
    chapter: 'chapter-02-back',
    title: '4-2 入力禁止情報 — 規程に盛り込む具体例',
    note: 'p41: 4-2 入力禁止情報 — 6カテゴリ具体例（FurtherReading風）',
    textSelectable: true,
  },
  {
    id: '41-risk-based-input-relationship',
    Component: Slide41RiskBasedInputRelationship,
    chapter: 'chapter-02-back',
    title: '4-2 入力禁止情報 — リスクベースアプローチとの関係',
    note: 'p42: 4-2 入力禁止 — 原則禁止 → RBA → 例外解除（Pipeline風）',
  },
  {
    id: '42-trade-secret-act',
    Component: Slide42TradeSecretAct,
    chapter: 'chapter-02-back',
    title: '4-3 社内秘密情報・営業秘密 — 不正競争防止法',
    note: 'p43: 4-3 営業秘密 — 法第2条6項 + 秘密管理フロー + 経産省指針リンク',
    textSelectable: true,
  },
  {
    id: '43-pip-act-genai-checkpoints',
    Component: Slide43PipActGenaiCheckpoints,
    chapter: 'chapter-02-back',
    title: '4-4 個人情報 — 個人情報保護法と生成AIの論点',
    note: 'p44: 4-4 個情法×生成AI — 3点チェックリスト（NextSteps風）',
  },
  {
    id: '44-pip-act-genai-articles',
    Component: Slide44PipActGenaiArticles,
    chapter: 'chapter-02-back',
    title: '4-4 個人情報 — 第16条・第17条',
    note: 'p45: 4-4 条文リファレンス — 第17条（利用目的）/ 第16条（定義）TextHighlight風',
    textSelectable: true,
  },
  {
    id: '45-data-residency-patterns',
    Component: Slide45DataResidencyPatterns,
    chapter: 'chapter-02-back',
    title: '4-4 個人情報 — データレジデンシーパターンの概要',
    note: 'p46: 4-4 データレジデンシー — オンプレ/SaaSフロー + 個情法28条ハイライト',
    textSelectable: true,
  },
  {
    id: '46-article-28-foreign-third-party',
    Component: Slide46Article28ForeignThirdParty,
    chapter: 'chapter-02-back',
    title: '4-4 個人情報 — 第28条（外国第三者提供）',
    note: 'p47: 4-4 第28条 — 条文 + 要件/効果/例外フロー',
    textSelectable: true,
  },
  {
    id: '47-pip-recap',
    Component: Slide47PipRecap,
    chapter: 'chapter-02-back',
    title: '4-4 個人情報 — まとめ',
    note: 'p48: 4-4 個人情報 Recap — プライバシーポリシー / 個人版 / DPA',
  },
];
