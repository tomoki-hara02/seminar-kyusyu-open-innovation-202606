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
import Slide13LivePlan         from '@/components/slides/seminar/13-live-plan';
import Slide14FictionalProfile from '@/components/slides/seminar/14-fictional-profile';
import Slide15FictionalKpi     from '@/components/slides/seminar/15-fictional-kpi';
import Slide16FictionalGapPlan from '@/components/slides/seminar/16-fictional-gap-plan';
import Slide17EmployeeVoices   from '@/components/slides/seminar/17-employee-voices';
import Slide18GrowthCycle      from '@/components/slides/seminar/18-growth-cycle';
import Slide19Recap            from '@/components/slides/seminar/19-recap';
import Slide20Chapter02        from '@/components/slides/seminar/20-chapter-02';
import Slide20aAiPrinciples    from '@/components/slides/seminar/20a-ai-principles';
import Slide20bGuidelines      from '@/components/slides/seminar/20b-guidelines-text';
import Slide21RiskBased        from '@/components/slides/seminar/21-risk-based';
import Slide22RiskExamples     from '@/components/slides/seminar/22-risk-examples';
import Slide23DataFlow         from '@/components/slides/seminar/23-data-flow';
import Slide24Chapter02Back    from '@/components/slides/seminar/24-chapter-02-back';

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
    id: '14-fictional-profile',
    Component: Slide14FictionalProfile,
    chapter: 'chapter-01',
    title: 'ワークショップ 1/3 — カンパニープロファイル',
    note: 'p14: ワークショップ 1/3 — カンパニープロファイル',
    textSelectable: true,
  },
  {
    id: '15-fictional-kpi',
    Component: Slide15FictionalKpi,
    chapter: 'chapter-01',
    title: 'ワークショップ 2/3 — 前期vs今期 KPI比較',
    note: 'p15: ワークショップ 2/3 — 前期vs今期目標 KPI比較',
    textSelectable: true,
  },
  {
    id: '16-fictional-gap-plan',
    Component: Slide16FictionalGapPlan,
    chapter: 'chapter-01',
    title: 'ワークショップ 3/3 — ギャップを埋める社長の考え',
    note: 'p16: ワークショップ 3/3 — ギャップを埋める社長の考え',
    textSelectable: true,
  },
  {
    id: '17-employee-voices',
    Component: Slide17EmployeeVoices,
    chapter: 'chapter-01',
    title: '経営目標に対する従業員の声',
    note: 'p17: 経営目標に対する従業員の声',
    textSelectable: true,
  },
  {
    id: '18-growth-cycle',
    Component: Slide18GrowthCycle,
    chapter: 'chapter-01',
    title: '業務効率化 → 再投資 → 事業拡大',
    note: 'p18: How It Works — 業務効率化 → 再投資 → 事業拡大',
  },
  {
    id: '19-recap',
    Component: Slide19Recap,
    chapter: 'chapter-01',
    title: 'Recap — ここまでの3つのポイント',
    note: 'p19: Recap — ここまでの 3 つのポイント',
  },

  // ── Chapter 02: 生成AI社内規程の作成 ────────────────────
  {
    id: '20-chapter-02',
    Component: Slide20Chapter02,
    chapter: 'chapter-02',
    title: 'Chapter 02 表紙（前編）— 社内規程の全体像',
    note: 'p20: Chapter 02 前編 — 生成AI社内規程の作成（全体像解説）',
  },
  {
    id: '20a-ai-principles',
    Component: Slide20aAiPrinciples,
    chapter: 'chapter-02',
    title: 'AI事業者ガイドライン基本理念',
    note: 'p20a: AI事業者ガイドライン基本理念 — Dignity / Diversity & Inclusion / Sustainability',
  },
  {
    id: '20b-guidelines-text',
    Component: Slide20bGuidelines,
    chapter: 'chapter-02',
    title: '経産省AIガイドライン1.2版 — リスクベース引用',
    note: 'p20b: 経産省AIガイドライン1.2版 — リスクベースアプローチ引用',
    textSelectable: true,
  },
  {
    id: '21-risk-based',
    Component: Slide21RiskBased,
    chapter: 'chapter-02',
    title: 'リスクベースアプローチとは（マトリックス）',
    note: 'p21: リスクベースアプローチとは？（リスクマトリックス）',
  },
  {
    id: '22-risk-examples',
    Component: Slide22RiskExamples,
    chapter: 'chapter-02',
    title: 'リスクベースアプローチ — 具体例',
    note: 'p22: リスクベースアプローチ具体例（チャット形式）',
  },
  {
    id: '23-data-flow',
    Component: Slide23DataFlow,
    chapter: 'chapter-02',
    title: '入力情報の権利処理 × モデル側の利用規約',
    note: 'p23: 入力情報の権利処理 × モデル側の利用規約（PC↔AI 双方向フロー）',
  },
  {
    id: '24-chapter-02-back',
    Component: Slide24Chapter02Back,
    chapter: 'chapter-02',
    title: 'Chapter 02 後編 — 社内規程の各論へ',
    note: 'p24: Chapter 02 後編 — 生成AI社内規程の作成（各論）',
  },
];
