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
  {
    id: '01-title',
    Component: Slide01Title,
    background: 'morph',
    note: 'p1: タイトル',
  },
  {
    id: '02-office-intro',
    Component: Slide02OfficeIntro,
    background: 'logoParticles',
    note: 'p2: 事務所紹介',
  },
  {
    id: '03-speaker',
    Component: Slide03Speaker,
    background: 'logoParticles',
    note: 'p3: 講師紹介',
  },
  {
    id: '04-hot-topics',
    Component: Slide04HotTopics,
    note: 'p4: 近時の生成AIのホットトピック',
  },
  {
    id: '05-crm-pipeline',
    Component: Slide05CrmPipeline,
    note: 'p5: 活用事例 CRM パイプライン',
  },
  {
    id: '06-web-pipeline',
    Component: Slide06WebPipeline,
    note: 'p6: 活用事例 Webマーケティング パイプライン',
  },
  {
    id: '07-demo-gallery',
    Component: Slide07DemoGallery,
    note: 'p7: デモギャラリー',
  },
  {
    id: '08-ai-capability',
    Component: Slide08AICapability,
    note: 'p8: 生成AIは異次元の成果を出す',
  },
  {
    id: '09-agenda',
    Component: Slide09Agenda,
    background: 'logoParticles',
    note: 'p9: 本日のテーマ（アジェンダ）',
  },
  {
    id: '10-start',
    Component: Slide10Start,
    background: 'logoParticles',
    note: 'p10: では、始めましょう！',
  },
  {
    id: '11-chapter-01',
    Component: Slide11Chapter01,
    note: 'p11: Chapter 01 生成AI活用プランの作成',
  },
  {
    id: '12-ai-roi',
    Component: Slide12AIRoi,
    note: 'p12: MIT GenAI Divide — 95%とROI',
  },
  {
    id: '13-live-plan',
    Component: Slide13LivePlan,
    note: 'p13: Live Demo — 架空企業 AI活用プラン作成',
  },
  {
    id: '14-fictional-profile',
    Component: Slide14FictionalProfile,
    note: 'p14: ワークショップ 1/3 — カンパニープロファイル',
    textSelectable: true,
  },
  {
    id: '15-fictional-kpi',
    Component: Slide15FictionalKpi,
    note: 'p15: ワークショップ 2/3 — 前期vs今期目標 KPI比較',
    textSelectable: true,
  },
  {
    id: '16-fictional-gap-plan',
    Component: Slide16FictionalGapPlan,
    note: 'p16: ワークショップ 3/3 — ギャップを埋める社長の考え',
    textSelectable: true,
  },
  {
    id: '17-employee-voices',
    Component: Slide17EmployeeVoices,
    note: 'p17: 経営目標に対する従業員の声',
    textSelectable: true,
  },
];
