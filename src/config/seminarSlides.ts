import type { SlideEntry } from '@/config/slides';

import Slide01Title from '@/components/slides/seminar/01-title';
import Slide02OfficeIntro from '@/components/slides/seminar/02-office-intro';
import Slide03Speaker from '@/components/slides/seminar/03-speaker';
import Slide04HotTopics from '@/components/slides/seminar/04-hot-topics';
import Slide05CrmPipeline from '@/components/slides/seminar/05-crm-pipeline';
import Slide06WebPipeline from '@/components/slides/seminar/06-web-pipeline';
import Slide07DemoGallery from '@/components/slides/seminar/07-demo-gallery';
import Slide08AiCapability from '@/components/slides/seminar/08-ai-capability';
import Slide09Agenda from '@/components/slides/seminar/09-agenda';
import Slide10Start from '@/components/slides/seminar/10-start';
import Slide11Chapter01 from '@/components/slides/seminar/11-chapter-01';
import Slide12AiRoi from '@/components/slides/seminar/12-ai-roi';
import Slide13LivePlan from '@/components/slides/seminar/13-live-plan';
import Slide14WorkshopIntro from '@/components/slides/seminar/14-workshop-intro';
import Slide15EmployeeVoices from '@/components/slides/seminar/15-employee-voices';
import Slide16Recap from '@/components/slides/seminar/16-recap';
import Slide17Chapter02 from '@/components/slides/seminar/17-chapter-02';
import Slide18AiPrinciples from '@/components/slides/seminar/18-ai-principles';
import Slide19CognitiveTraps from '@/components/slides/seminar/19-cognitive-traps';
import Slide20BiasDivide from '@/components/slides/seminar/20-bias-divide';
import Slide21RightsNetwork from '@/components/slides/seminar/21-rights-network';
import Slide22GuidelinesText from '@/components/slides/seminar/22-guidelines-text';
import Slide23RiskBased from '@/components/slides/seminar/23-risk-based';
import Slide24RiskExamples from '@/components/slides/seminar/24-risk-examples';
import Slide25RiskPractice from '@/components/slides/seminar/25-risk-practice';
import Slide26DataFlow from '@/components/slides/seminar/26-data-flow';
import Slide27Chapter02Recap from '@/components/slides/seminar/27-chapter-02-recap';
import Slide28Chapter02Back from '@/components/slides/seminar/28-chapter-02-back';
import Slide29InternalRulesWorkshop from '@/components/slides/seminar/29-internal-rules-workshop';
import Slide30RulesFunnel from '@/components/slides/seminar/30-rules-funnel';
import Slide31InternalRulesToc from '@/components/slides/seminar/31-internal-rules-toc';
import Slide32Section01Purpose from '@/components/slides/seminar/32-section-01-purpose';
import Slide33BasicPolicyKeywords from '@/components/slides/seminar/33-basic-policy-keywords';
import Slide34UsagePurposeRestrictions from '@/components/slides/seminar/34-usage-purpose-restrictions';
import Slide35UsagePurposeMaturity from '@/components/slides/seminar/35-usage-purpose-maturity';
import Slide36ChiefResponsibleRecap from '@/components/slides/seminar/36-chief-responsible-recap';
import Slide37Chapter01IdealsRecap from '@/components/slides/seminar/37-chapter-01-ideals-recap';
import Slide38Section02User from '@/components/slides/seminar/38-section-02-user';
import Slide39UserScopePatterns from '@/components/slides/seminar/39-user-scope-patterns';
import Slide40UserAccountMaturity from '@/components/slides/seminar/40-user-account-maturity';
import Slide41AccountManagement from '@/components/slides/seminar/41-account-management';
import Slide42Chapter02UserRecap from '@/components/slides/seminar/42-chapter-02-user-recap';
import Slide43Section03Tool from '@/components/slides/seminar/43-section-03-tool';
import Slide44ToolAnalysisPerspectives from '@/components/slides/seminar/44-tool-analysis-perspectives';
import Slide45AccessibleDevices from '@/components/slides/seminar/45-accessible-devices';
import Slide46AiToolPlanSpec from '@/components/slides/seminar/46-ai-tool-plan-spec';
import Slide47McpAgentHandling from '@/components/slides/seminar/47-mcp-agent-handling';
import Slide48McpAgentMaturity from '@/components/slides/seminar/48-mcp-agent-maturity';
import Slide49Chapter03ToolRecap from '@/components/slides/seminar/49-chapter-03-tool-recap';
import Slide50Section04Input from '@/components/slides/seminar/50-section-04-input';
import Slide51InputDataLegalRights from '@/components/slides/seminar/51-input-data-legal-rights';
import Slide52ProhibitedInputExamples from '@/components/slides/seminar/52-prohibited-input-examples';
import Slide53RiskBasedInputRelationship from '@/components/slides/seminar/53-risk-based-input-relationship';
import Slide54TradeSecretAct from '@/components/slides/seminar/54-trade-secret-act';
import Slide55PipActGenaiCheckpoints from '@/components/slides/seminar/55-pip-act-genai-checkpoints';
import Slide56PipActGenaiArticles from '@/components/slides/seminar/56-pip-act-genai-articles';
import Slide57DelegationSupervision from '@/components/slides/seminar/57-delegation-supervision';
import Slide58DataResidencyPatterns from '@/components/slides/seminar/58-data-residency-patterns';
import Slide59Article28ForeignThirdParty from '@/components/slides/seminar/59-article-28-foreign-third-party';
import Slide60PipRecap from '@/components/slides/seminar/60-pip-recap';
import Slide61ThirdPartySecrets from '@/components/slides/seminar/61-third-party-secrets';
import Slide62CopyrightReviewFlow from '@/components/slides/seminar/62-copyright-review-flow';
import Slide63CopyrightWorkDefinition from '@/components/slides/seminar/63-copyright-work-definition';
import Slide64CopyrightLimitations from '@/components/slides/seminar/64-copyright-limitations';
import Slide65CopyrightArticle304 from '@/components/slides/seminar/65-copyright-article-30-4';
import Slide66CopyrightArticle475 from '@/components/slides/seminar/66-copyright-article-47-5';
import Slide67PublicDataLicense from '@/components/slides/seminar/67-public-data-license';
import Slide68CopyrightPenalty119 from '@/components/slides/seminar/68-copyright-penalty-119';
import Slide69Section05Output from '@/components/slides/seminar/69-section-05-output';
import Slide70OutputOverview from '@/components/slides/seminar/70-output-overview';
import Slide71HitlHumanReview from '@/components/slides/seminar/71-hitl-human-review';
import Slide72UnrecognizedCopyrightOutput from '@/components/slides/seminar/72-unrecognized-copyright-output';
import Slide73SecretInfoOutput from '@/components/slides/seminar/73-secret-info-output';
import Slide74OutputReviewCriteria from '@/components/slides/seminar/74-output-review-criteria';
import Slide75Section06Record from '@/components/slides/seminar/75-section-06-record';
import Slide76WorkLogHandling from '@/components/slides/seminar/76-work-log-handling';
import Slide77Section07Governance from '@/components/slides/seminar/77-section-07-governance';
import Slide78IncidentResponse from '@/components/slides/seminar/78-incident-response';
import Slide79RegulationReview from '@/components/slides/seminar/79-regulation-review';
import Slide80InternalLiteracy from '@/components/slides/seminar/80-internal-literacy';
import Slide81Chapter02BackRecap from '@/components/slides/seminar/81-chapter-02-back-recap';
import Slide82Chapter03 from '@/components/slides/seminar/82-chapter-03';

/**
 * 本番セミナー「生成AIを"安心して使い倒す"ためのルールづくり入門」用のスライド一覧。
 *
 * - 並び順 = 投影順
 * - 各エントリの `id` はファイル名と揃える（`01-title` 〜 `82-...`、番号重複なし）
 * - 投影順の連番（p1〜p71）は `note`・目次番号・ファイル先頭2桁が一致（`npm run renumber:seminar-files`）
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
    note: 'p1:タイトル',
  },
  {
    id: '02-office-intro',
    Component: Slide02OfficeIntro,
    background: 'logoParticles',
    chapter: 'opening',
    title: '事務所紹介',
    note: 'p2:事務所紹介',
  },
  {
    id: '03-speaker',
    Component: Slide03Speaker,
    background: 'logoParticles',
    chapter: 'opening',
    title: '講師紹介',
    note: 'p3:講師紹介',
  },
  {
    id: '04-hot-topics',
    Component: Slide04HotTopics,
    chapter: 'opening',
    title: '近時の生成AIホットトピック',
    note: 'p4:近時の生成AIのホットトピック',
  },
  {
    id: '05-crm-pipeline',
    Component: Slide05CrmPipeline,
    chapter: 'opening',
    title: '活用事例 — CRMパイプライン',
    note: 'p5:活用事例 CRM パイプライン',
  },
  {
    id: '06-web-pipeline',
    Component: Slide06WebPipeline,
    chapter: 'opening',
    title: '活用事例 — Webマーケティング',
    note: 'p6:活用事例 Webマーケティング パイプライン',
  },
  {
    id: '07-demo-gallery',
    Component: Slide07DemoGallery,
    chapter: 'opening',
    title: 'デモギャラリー',
    note: 'p7:デモギャラリー',
  },
  {
    id: '08-ai-capability',
    Component: Slide08AiCapability,
    chapter: 'opening',
    title: '生成AIは異次元の成果を出す',
    note: 'p8:生成AIは異次元の成果を出す',
  },
  {
    id: '09-agenda',
    Component: Slide09Agenda,
    background: 'logoParticles',
    chapter: 'opening',
    title: '本日のテーマ（アジェンダ）',
    note: 'p9:本日のテーマ（アジェンダ）',
  },
  {
    id: '10-start',
    Component: Slide10Start,
    background: 'logoParticles',
    chapter: 'opening',
    title: 'では、始めましょう',
    note: 'p10:では、始めましょう！',
  },

  // ── Chapter 01: 生成AI活用プランの作成 ──────────────────
  {
    id: '11-chapter-01',
    Component: Slide11Chapter01,
    chapter: 'chapter-01',
    title: 'Chapter 01 表紙 — 生成AI活用プラン',
    note: 'p11:Chapter 01 生成AI活用プランの作成',
  },
  {
    id: '12-ai-roi',
    Component: Slide12AiRoi,
    chapter: 'chapter-01',
    title: 'MIT GenAI Divide — 95%とROI',
    note: 'p12:MIT GenAI Divide — 95%とROI',
  },
  {
    id: '13-live-plan',
    Component: Slide13LivePlan,
    chapter: 'chapter-01',
    title: 'Live Demo — 架空企業AI活用プラン',
    note: 'p13:Live Demo — 架空企業 AI活用プラン作成',
  },
  {
    id: '14-workshop-intro',
    Component: Slide14WorkshopIntro,
    chapter: 'chapter-01',
    title: 'ワークショップ — 生成AI活用プラン作成',
    note: 'p14:ワークショップ開始アナウンス',
  },
  {
    id: '15-employee-voices',
    Component: Slide15EmployeeVoices,
    chapter: 'chapter-01',
    title: '従業員の声 — ワークショップ素材',
    note: 'p15:従業員の声をもとに生成AI活用プランを考える',
    textSelectable: true,
  },
  {
    id: '16-recap',
    Component: Slide16Recap,
    chapter: 'chapter-01',
    title: 'Recap — ここまでの3つのポイント',
    note: 'p16:Recap — ここまでの 3 つのポイント',
  },

  // ── Chapter 02: 生成AI社内規程の作成 ────────────────────
  // ── Chapter 02 前編: 生成AI社内規程の作成（全体像） ──────────────────────────
  {
    id: '17-chapter-02',
    Component: Slide17Chapter02,
    chapter: 'chapter-02-front',
    title: 'Chapter 02 表紙（前編）— 社内規程の全体像',
    note: 'p17:Chapter 02 前編 — 生成AI社内規程の作成（全体像解説）',
  },
  {
    id: '18-ai-principles',
    Component: Slide18AiPrinciples,
    chapter: 'chapter-02-front',
    title: 'AI事業者ガイドライン基本理念',
    note: 'p18:AI事業者ガイドライン基本理念 — Dignity / Diversity & Inclusion / Sustainability',
  },
  {
    id: '19-cognitive-traps',
    Component: Slide19CognitiveTraps,
    chapter: 'chapter-02-front',
    title: '人間の尊厳 — 思考の放棄 × サイコファンシー',
    note: 'p19:人間の尊厳に背く2つの落とし穴（思考の放棄/サイコファンシー）',
  },
  {
    id: '20-bias-divide',
    Component: Slide20BiasDivide,
    chapter: 'chapter-02-front',
    title: '多様性・包摂 — バイアス × AIディバイド',
    note: 'p20:多様性・包摂を損なう2つの構造（バイアス/AIディバイド）',
  },
  {
    id: '21-rights-network',
    Component: Slide21RightsNetwork,
    chapter: 'chapter-02-front',
    title: '持続可能性 — 崩壊の具体例 × 果実分配の設計',
    note: 'p21:インフルエンサー生成動画（崩壊）× 生成AIの果実分配（仕組み設計）',
  },
  {
    id: '22-guidelines-text',
    Component: Slide22GuidelinesText,
    chapter: 'chapter-02-front',
    title: '経産省AIガイドライン1.2版 — リスクベース引用',
    note: 'p22:経産省AIガイドライン1.2版 — リスクベースアプローチ引用',
    textSelectable: true,
  },
  {
    id: '23-risk-based',
    Component: Slide23RiskBased,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチとは（マトリックス）',
    note: 'p23:リスクベースアプローチとは？（リスクマトリックス）',
  },
  {
    id: '24-risk-examples',
    Component: Slide24RiskExamples,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチ — 具体例',
    note: 'p24:リスクベースアプローチ具体例（チャット形式）',
  },
  {
    id: '25-risk-practice',
    Component: Slide25RiskPractice,
    chapter: 'chapter-02-front',
    title: 'リスクベースアプローチ — 実践例（名刺管理MCP）',
    note: 'p25:リスクベースアプローチ実践例 — 名刺管理MCP → zod → 重複登録リスク → HITL/続行 → 判断',
  },
  {
    id: '26-data-flow',
    Component: Slide26DataFlow,
    chapter: 'chapter-02-front',
    title: '生成AI社内規程に関する４つの分析セグメント',
    note: 'p26:生成AI社内規程に関する４つの分析セグメント（PC↔AI 双方向フロー）',
  },
  {
    id: '27-chapter-02-recap',
    Component: Slide27Chapter02Recap,
    chapter: 'chapter-02-front',
    title: 'Recap — Chapter 02 前編の3つのポイント',
    note: 'p27:Chapter 02 前編まとめ Recap',
  },

  // ── Chapter 02 後編: 生成AI社内規程の作成（各論） ────────────────────────────
  {
    id: '28-chapter-02-back',
    Component: Slide28Chapter02Back,
    chapter: 'chapter-02-back',
    title: 'Chapter 02 後編 — 社内規程の各論へ',
    note: 'p28:Chapter 02 後編 — 生成AI社内規程の作成（各論）',
  },
  {
    id: '29-internal-rules-workshop',
    Component: Slide29InternalRulesWorkshop,
    chapter: 'chapter-02-back',
    title: 'Workshop — 社内生成AI利用規程の作成（Gemini）',
    note: 'p29:Workshop — Geminiで規程作成 → Gemに貼付けてフィードバック',
  },
  {
    id: '30-rules-funnel',
    Component: Slide30RulesFunnel,
    chapter: 'chapter-02-back',
    title: '社内規程の射程 — 各AI利用規約の範囲内',
    note: 'p30:生成AI利用規約 → 社内生成AI利用規約 ファネル図',
  },
  {
    id: '31-internal-rules-toc',
    Component: Slide31InternalRulesToc,
    chapter: 'chapter-02-back',
    title: '社内生成AI利用規程 — 全条項の目次（CardWheel）',
    note: 'p31:社内規程の目次 — 全25条項 CardWheel + サイドバー',
  },
  {
    id: '32-section-01-purpose',
    Component: Slide32Section01Purpose,
    chapter: 'chapter-02-back',
    title: 'Section 01 扉 — 目的・基本理念',
    note: 'p32:Section 01 扉 — 目的・基本理念（1-1〜1-3）',
  },
  {
    id: '33-basic-policy-keywords',
    Component: Slide33BasicPolicyKeywords,
    chapter: 'chapter-02-back',
    rulesToc: '1-1',
    title: '1-1 基本方針 — 考えるべき項目',
    note: 'p33:1-1 基本方針 — KeywordCloud（10項目）',
  },
  {
    id: '34-usage-purpose-restrictions',
    Component: Slide34UsagePurposeRestrictions,
    chapter: 'chapter-02-back',
    rulesToc: '1-2',
    title: '1-2 利用目的 — 使用可能な領域と関連規程',
    note: 'p34:領域縮小ギミック（関連規程クリック適用）',
    textSelectable: false,
  },
  {
    id: '35-usage-purpose-maturity',
    Component: Slide35UsagePurposeMaturity,
    chapter: 'chapter-02-back',
    rulesToc: '1-2',
    title: '1-2 利用目的 — 成熟度モデル',
    note: 'p35:PricingTiers型 — Starter / Standard / PRO',
  },
  {
    id: '36-chief-responsible-recap',
    Component: Slide36ChiefResponsibleRecap,
    chapter: 'chapter-02-back',
    rulesToc: '1-3',
    title: '1-3 統括責任者 — 求められるもの',
    note: 'p36:1-3 統括責任者 — Recap（4項目）',
  },
  {
    id: '37-chapter-01-ideals-recap',
    Component: Slide37Chapter01IdealsRecap,
    chapter: 'chapter-02-back',
    rulesToc: '1',
    title: 'Recap — 目的・基本理念で抑えるべきポイント',
    note: 'p37:Recap — 1 目的・基本理念（3項目）',
  },
  {
    id: '38-section-02-user',
    Component: Slide38Section02User,
    chapter: 'chapter-02-back',
    title: 'Section 02 扉 — ユーザー',
    note: 'p38:Section 02 扉 — ユーザー（2-1〜2-2）',
  },
  {
    id: '39-user-scope-patterns',
    Component: Slide39UserScopePatterns,
    chapter: 'chapter-02-back',
    rulesToc: '2-1',
    title: '2-1 使用者の範囲 — 設定の重要ポイント',
    note: 'p39:2-1 使用者の範囲 — 明確化・間接利用禁止・格差配慮',
  },
  {
    id: '40-user-account-maturity',
    Component: Slide40UserAccountMaturity,
    chapter: 'chapter-02-back',
    rulesToc: '2',
    title: '2 ユーザー — アカウント付与の成熟度',
    note: 'p40:スターター / スタンダード / プロ — アカウント広げ方',
  },
  {
    id: '41-account-management',
    Component: Slide41AccountManagement,
    chapter: 'chapter-02-back',
    rulesToc: '2-2',
    title: '2-2 アカウントの管理 — 2つの要点',
    note: 'p41:2-2 アカウントの管理 — 共有禁止 / アカウント別アクセス',
  },
  {
    id: '42-chapter-02-user-recap',
    Component: Slide42Chapter02UserRecap,
    chapter: 'chapter-02-back',
    rulesToc: '2',
    title: 'Recap — ユーザーで抑えるべきポイント',
    note: 'p42:Recap — 2 ユーザー（3項目）',
  },
  {
    id: '43-section-03-tool',
    Component: Slide43Section03Tool,
    chapter: 'chapter-02-back',
    title: 'Section 03 扉 — ツール',
    note: 'p43:Section 03 扉 — ツール（3-1〜3-4）',
  },
  {
    id: '44-tool-analysis-perspectives',
    Component: Slide44ToolAnalysisPerspectives,
    chapter: 'chapter-02-back',
    rulesToc: '3-1',
    title: '3-1 ツール総論 — 生成AIツール分析の視点',
    note: 'p44:3-1 ツール総論 — 4つの分析視点（LayeredArch + ギミック）',
  },
  {
    id: '45-accessible-devices',
    Component: Slide45AccessibleDevices,
    chapter: 'chapter-02-back',
    rulesToc: '3-2',
    title: '3-2 アクセス可能な端末 — 企業が注意すべきこと',
    note: 'p45:3-2 アクセス可能な端末 — 私用端末禁止 / 法的・技術的対策',
  },
  {
    id: '46-ai-tool-plan-spec',
    Component: Slide46AiToolPlanSpec,
    chapter: 'chapter-02-back',
    rulesToc: '3-3',
    title: '3-3 使用可能なAIツール・プランの指定',
    note: 'p46:3-3 ツール・プラン指定 — 無料/個人禁止 / シャドーAI対策',
  },
  {
    id: '47-mcp-agent-handling',
    Component: Slide47McpAgentHandling,
    chapter: 'chapter-02-back',
    rulesToc: '3-4',
    title: '3-4 エージェント・MCPの取扱い — 外部アプリへの送信',
    note: 'p47:3-4 MCP・エージェント — WorldMap風データフロー図',
  },
  {
    id: '48-mcp-agent-maturity',
    Component: Slide48McpAgentMaturity,
    chapter: 'chapter-02-back',
    rulesToc: '3-4',
    title: '3-4 エージェント・MCP — ツール・接続の成熟度',
    note: 'p48:3-4 MCP成熟度 — スターター／スタンダード／プロ（PricingTiers風）',
  },
  {
    id: '49-chapter-03-tool-recap',
    Component: Slide49Chapter03ToolRecap,
    chapter: 'chapter-02-back',
    rulesToc: '3',
    title: 'Recap — ツールで抑えるべきポイント',
    note: 'p49:Recap — 3 ツール全体（無料・個人プラン／端末／MCP接続）',
  },
  {
    id: '50-section-04-input',
    Component: Slide50Section04Input,
    chapter: 'chapter-02-back',
    title: 'Section 04 扉 — 入力情報',
    note: 'p50:Section 04 扉 — 入力情報（4-1〜4-6）',
  },
  {
    id: '51-input-data-legal-rights',
    Component: Slide51InputDataLegalRights,
    chapter: 'chapter-02-back',
    rulesToc: '4-1',
    title: '4-1 入力情報 総論 — データの法的権利関係',
    note: 'p51:4-1 入力情報 総論 — DATAハブ + 5法令（KnowledgeGraph風）',
  },
  {
    id: '52-prohibited-input-examples',
    Component: Slide52ProhibitedInputExamples,
    chapter: 'chapter-02-back',
    rulesToc: '4-2',
    title: '4-2 入力禁止情報 — 規程に盛り込む具体例',
    note: 'p52:4-2 入力禁止情報 — 6カテゴリ具体例（FurtherReading風）',
    textSelectable: true,
  },
  {
    id: '53-risk-based-input-relationship',
    Component: Slide53RiskBasedInputRelationship,
    chapter: 'chapter-02-back',
    rulesToc: '4-2',
    title: '4-2 入力禁止情報 — リスクベースアプローチとの関係',
    note: 'p53:4-2 入力禁止 — 原則禁止 → RBA → 例外解除（Pipeline風）',
  },
  {
    id: '54-trade-secret-act',
    Component: Slide54TradeSecretAct,
    chapter: 'chapter-02-back',
    rulesToc: '4-3',
    title: '4-3 社内秘密情報・営業秘密 — 不正競争防止法',
    note: 'p54:4-3 営業秘密 — 法第2条6項 + 秘密管理フロー + 経産省指針リンク',
    textSelectable: true,
  },
  {
    id: '55-pip-act-genai-checkpoints',
    Component: Slide55PipActGenaiCheckpoints,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — 個人情報保護法と生成AIの論点',
    note: 'p55:4-4 個情法×生成AI — 3点チェックリスト（NextSteps風）',
  },
  {
    id: '56-pip-act-genai-articles',
    Component: Slide56PipActGenaiArticles,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — 利用目的の考え方 × 生成AIで使うと受ける影響',
    note: 'p56:4-4 利用目的 — 法17条/18条の考え方 × 生成AI入力の影響（プロファイリング含む）',
  },
  {
    id: '57-delegation-supervision',
    Component: Slide57DelegationSupervision,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — 委託先の監督（第三者認証 × PDCA）',
    note: 'p57:4-4 委託先監督 — 主要サービスの第三者認証（SOC 2等）＋ PDCA サイクル',
  },
  {
    id: '58-data-residency-patterns',
    Component: Slide58DataResidencyPatterns,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — データレジデンシーパターンの概要',
    note: 'p58:4-4 データレジデンシー — オンプレ/SaaSフロー + 個情法28条ハイライト',
    textSelectable: true,
  },
  {
    id: '59-article-28-foreign-third-party',
    Component: Slide59Article28ForeignThirdParty,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — 第28条（外国第三者提供）',
    note: 'p59:4-4 第28条 — 条文 + 要件/効果/例外フロー',
    textSelectable: true,
  },
  {
    id: '60-pip-recap',
    Component: Slide60PipRecap,
    chapter: 'chapter-02-back',
    rulesToc: '4-4',
    title: '4-4 個人情報 — 全体判断フロー',
    note: 'p60:4-4 個人データ×生成AI 判断フロー（Step i→vii）',
  },
  {
    id: '61-third-party-secrets',
    Component: Slide61ThirdPartySecrets,
    chapter: 'chapter-02-back',
    rulesToc: '4-5',
    title: '4-5 取引先・他社の秘密情報 — 秘密保持義務',
    note: 'p61:4-5 取引先・他社の秘密情報 — Cube3D（契約書）',
  },
  {
    id: '62-copyright-review-flow',
    Component: Slide62CopyrightReviewFlow,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — プロンプトに他人の制作物を入力する際の検討フロー',
    note: 'p62:4-6 著作物 — Pipeline（4ステップ検討フロー）',
  },
  {
    id: '63-copyright-work-definition',
    Component: Slide63CopyrightWorkDefinition,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — Step 1 著作物該当性（創作性）',
    note: 'p63:4-6 Step 1 — 著作権法第2条 + 原則2件 + 注意点2件（BentoGrid風）',
    textSelectable: true,
  },
  {
    id: '64-copyright-limitations',
    Component: Slide64CopyrightLimitations,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — 著作権法における権利制限',
    note: 'p64:4-6 権利制限 — 第30条〜第47条の7 一覧（FurtherReading風）',
    textSelectable: true,
  },
  {
    id: '65-copyright-article-30-4',
    Component: Slide65CopyrightArticle304,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — 第30条の4 条文解説（生成AI入力）',
    note: 'p65:4-6 第30条の4 + 文化審議会「AIと著作権に関する考え方について」',
    textSelectable: true,
  },
  {
    id: '66-copyright-article-47-5',
    Component: Slide66CopyrightArticle475,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — 第47条の5 条文解説（軽微利用）',
    note: 'p66:4-6 第47条の5 条文 + Web検索/RAGの適用例',
    textSelectable: true,
  },
  {
    id: '67-public-data-license',
    Component: Slide67PublicDataLicense,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — 公共データ利用規約（PDL1.0）',
    note: 'p67:公共データ利用規約（第1.0版）— デジタル庁',
    textSelectable: true,
  },
  {
    id: '68-copyright-penalty-119',
    Component: Slide68CopyrightPenalty119,
    chapter: 'chapter-02-back',
    rulesToc: '4-6',
    title: '4-6 著作物 — 請求類型と故意・過失の効果',
    note: 'p68:侵害に対する請求類型と故意・過失の効果（06_侵害に対する措置）',
    textSelectable: true,
  },
  {
    id: '69-section-05-output',
    Component: Slide69Section05Output,
    chapter: 'chapter-02-back',
    title: 'Section 05 扉 — 出力情報',
    note: 'p69:Section 05 扉 — 出力情報（5-1〜5-5）',
  },
  {
    id: '70-output-overview',
    Component: Slide70OutputOverview,
    chapter: 'chapter-02-back',
    rulesToc: '5-1',
    title: '5-1 出力情報 総論 — 出力利用の構造',
    note: 'p70:5-1 出力総論 — 3論点（正確性・著作権・秘密情報）と対応手段',
  },
  {
    id: '71-hitl-human-review',
    Component: Slide71HitlHumanReview,
    chapter: 'chapter-02-back',
    rulesToc: '5-2',
    title: '5-2 出力情報 — HITL（人間による確認）',
    note: 'p71:5-2 HITL — 出力の責任・注意点3項目 + プロンプト構成図',
    textSelectable: true,
  },
  {
    id: '72-unrecognized-copyright-output',
    Component: Slide72UnrecognizedCopyrightOutput,
    chapter: 'chapter-02-back',
    rulesToc: '5-3',
    title: '5-3 出力情報 — 認識の無い著作物の出力',
    note: 'p72:5-3 著作権関連 — 文化庁「AIと著作権に関する考え方」（依拠性の推認）',
    textSelectable: true,
  },
  {
    id: '73-secret-info-output',
    Component: Slide73SecretInfoOutput,
    chapter: 'chapter-02-back',
    rulesToc: '5-4',
    title: '5-4 出力情報 — 秘密情報入力時の出力の扱い',
    note: 'p73:5-4 秘密情報入力 — 出力も営業秘密・守秘義務対象として管理',
    textSelectable: true,
  },
  {
    id: '74-output-review-criteria',
    Component: Slide74OutputReviewCriteria,
    chapter: 'chapter-02-back',
    rulesToc: '5-5',
    title: '5-5 出力情報 — 社内外利用時の審査基準',
    note: 'p74:5-5 社内審査 — 担当者・資料・方法・利用指定（RBA）',
    textSelectable: true,
  },
  {
    id: '75-section-06-record',
    Component: Slide75Section06Record,
    chapter: 'chapter-02-back',
    title: 'Section 06 扉 — 記録',
    note: 'p75:Section 06 扉 — 記録（6-1）',
  },
  {
    id: '76-work-log-handling',
    Component: Slide76WorkLogHandling,
    chapter: 'chapter-02-back',
    rulesToc: '6-1',
    title: '6-1 記録 — 作業ログの役割',
    note: 'p76:6-1 作業ログ — 証拠・創作性判断・社内改善の3つの役割',
    textSelectable: true,
  },
  {
    id: '77-section-07-governance',
    Component: Slide77Section07Governance,
    chapter: 'chapter-02-back',
    title: 'Section 07 扉 — ガバナンス',
    note: 'p77:Section 07 扉 — ガバナンス（7-1〜7-3）',
  },
  {
    id: '78-incident-response',
    Component: Slide78IncidentResponse,
    chapter: 'chapter-02-back',
    rulesToc: '7-1',
    title: '7-1 違反時の対応 — 種類の見極め＋3アクション',
    note: 'p78:7-1 違反時の対応 — 規程準拠／非準拠 × 保全・関係者特定・専門家支援',
  },
  {
    id: '79-regulation-review',
    Component: Slide79RegulationReview,
    chapter: 'chapter-02-back',
    rulesToc: '7-3',
    title: '7-3 規程の見直し — 事業者改訂頻度と社内見直し',
    note: 'p79:7-3 規程見直し — OpenAI/Anthropic/Google 改訂頻度インフォグラフ + 半年〜1年マスト',
  },
  {
    id: '80-internal-literacy',
    Component: Slide80InternalLiteracy,
    chapter: 'chapter-02-back',
    rulesToc: '7-2',
    title: '7-2 社内リテラシー向上 — 知識・判断・行動の3層',
    note: 'p80:7-2 リテラシー — Know/Judge/Act × AI事業者ガイドライン基本理念',
  },
  {
    id: '81-chapter-02-back-recap',
    Component: Slide81Chapter02BackRecap,
    chapter: 'chapter-02-back',
    rulesToc: '7',
    title: 'Recap — 社内生成AI利用規程（後編まとめ）',
    note: 'p81:Recap 後編 — 既存規程の枠内・4項目・RBA',
    textSelectable: true,
  },

  // ── Chapter 03: その他生成AIに関する法的論点 ───────────────
  {
    id: '82-chapter-03',
    Component: Slide82Chapter03,
    chapter: 'chapter-03',
    title: 'Chapter 03 — その他生成AIに関する法的論点',
    note: 'p82:Chapter 03 — その他生成AIに関する法的論点',
  },
];
