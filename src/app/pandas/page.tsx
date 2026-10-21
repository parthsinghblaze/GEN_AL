import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';

import PandasHero from '@/components/pandas/PandasHero';
import Module1Foundation from '@/components/pandas/Module1Foundation';
import Module2Series from '@/components/pandas/Module2Series';
import Module3DataFrames from '@/components/pandas/Module3DataFrames';
import Module4VisualLabs from '@/components/pandas/Module4VisualLabs';
import Module5Checkpoints from '@/components/pandas/Module5Checkpoints';

export default function PandasPage() {
  const navGroups: NavGroup[] = [
    {
      title: '01 // Foundation & Origin',
      items: [
        { id: 'sec-origin', num: '01', label: 'Origin & Wes McKinney' },
        { id: 'sec-anatomy', num: '02', label: 'Visual DataFrame Anatomy' },
        { id: 'sec-alignment', num: '03', label: 'Visual Label Alignment' },
        { id: 'sec-architecture', num: '04', label: 'Memory & PyArrow Block' },
      ],
    },
    {
      title: '02 // Pandas Series in Depth',
      items: [
        { id: 'sec-what-is-series', num: '05', label: 'What is a Series?' },
        { id: 'sec-create-series', num: '06', label: 'How to Create a Series' },
        { id: 'sec-series-attributes', num: '07', label: 'Series Attributes & Inspection' },
        { id: 'sec-series-builder-lab', num: '08', label: 'Interactive Series Builder' },
      ],
    },
    {
      title: '03 // DataFrames Deep Dive',
      items: [
        { id: 'sec-df-creation', num: '09', label: 'Creating a DataFrame' },
        { id: 'sec-col-selection', num: '10', label: 'Column Selection & Indexing' },
        { id: 'sec-col-create', num: '11', label: 'Creating New Columns' },
        { id: 'sec-col-drop', num: '12', label: 'Dropping & Removing Columns' },
        { id: 'sec-row-selection', num: '13', label: 'Selecting Rows (loc vs iloc)' },
        { id: 'sec-2d-subsets', num: '14', label: 'Subsets of Rows & Columns' },
        { id: 'sec-conditional-filter', num: '15', label: 'Conditional Selection & Masks' },
        { id: 'sec-df-workbench', num: '16', label: 'Interactive DF Workbench' },
        { id: 'sec-bool-flow-lab', num: '17', label: 'Boolean Mask Visual Flow' },
      ],
    },
    {
      title: '04 // Visual Labs & ML Pipeline',
      items: [
        { id: 'sec-why-pandas', num: '18', label: 'Visual Data Cleaning Lab' },
        { id: 'sec-usecases-industry', num: '19', label: '5 Industry Visual Use Cases' },
        { id: 'sec-comparison', num: '20', label: 'Stack Comparison Matrix' },
        { id: 'sec-slicer-lab', num: '21', label: 'Interactive DataFrame Slicer' },
        { id: 'sec-pipeline-lab', num: '22', label: 'End-to-End ML Pipeline' },
      ],
    },
    {
      title: '05 // Checkpoints & Syllabus',
      items: [
        { id: 'sec-quiz', num: '23', label: 'Knowledge Flashcards' },
        { id: 'sec-roadmap', num: '24', label: 'Complete Pandas Roadmap' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Sidebar with exact 5 modules & 24 subtopics */}
        <Sidebar
          title="Pandas"
          version="v2.2"
          subtitle="Tabular Relational Engine"
          groups={navGroups}
        />

        {/* Main Content Area - Full width */}
        <main className="flex-1 min-w-0 lg:ml-[280px] px-4 sm:px-8 lg:px-12 py-8 w-full">
          <div className="max-w-6xl mx-auto space-y-12">
            <PandasHero />
            <Module1Foundation />
            <Module2Series />
            <Module3DataFrames />
            <Module4VisualLabs />
            <Module5Checkpoints />
          </div>
        </main>
      </div>
    </div>
  );
}
