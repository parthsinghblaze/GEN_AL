import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';

import NumpyHero from '@/components/numpy/NumpyHero';
import Module1Architecture from '@/components/numpy/Module1Architecture';
import Module2Creation from '@/components/numpy/Module2Creation';
import Module3Attributes from '@/components/numpy/Module3Attributes';
import Module4Indexing from '@/components/numpy/Module4Indexing';
import Module5Operations from '@/components/numpy/Module5Operations';
import Module6Labs from '@/components/numpy/Module6Labs';

export default function NumpyPage() {
  const navGroups: NavGroup[] = [
    {
      title: '01 // Architecture & Origin',
      items: [
        { id: 'sec-origin', num: '01', label: 'Origin & History' },
        { id: 'sec-why', num: '02', label: 'Why NumPy in ML' },
        { id: 'sec-vs', num: '03', label: 'List vs ndarray' },
        { id: 'sec-memory', num: '04', label: 'Memory & Strides' },
      ],
    },
    {
      title: '02 // Creation & Generators',
      items: [
        { id: 'sec-creation', num: '05', label: 'Creation & Dtypes' },
        { id: 'sec-gen-funcs', num: '06', label: 'Generation Functions' },
        { id: 'sec-random', num: '07', label: 'Random Number Gen' },
      ],
    },
    {
      title: '03 // Attributes & Shape',
      items: [
        { id: 'sec-attributes', num: '08', label: 'Array Attributes' },
        { id: 'sec-methods', num: '09', label: 'Methods & Axis Ops' },
        { id: 'sec-reshaping', num: '10', label: 'Reshaping & Resizing' },
      ],
    },
    {
      title: '04 // Indexing & Slicing',
      items: [
        { id: 'sec-slicing', num: '11', label: '1D & 2D Slicing' },
        { id: 'sec-boolean-fancy', num: '12', label: 'Boolean & Fancy Indexing' },
        { id: 'sec-slicing-lab', num: '13', label: 'Slicing Lab & Practice' },
      ],
    },
    {
      title: '05 // Array Operations & LinAlg',
      items: [
        { id: 'sec-arithmetic', num: '14', label: 'Arithmetic & ufuncs' },
        { id: 'sec-broadcasting', num: '15', label: 'Broadcasting & Math' },
        { id: 'sec-linalg', num: '16', label: 'LinAlg & Matrix Math' },
        { id: 'sec-ops-lab', num: '17', label: 'Operations Lab & Q&A' },
      ],
    },
    {
      title: '06 // Labs & Exercises',
      items: [
        { id: 'sec-playground', num: '18', label: 'Speed Benchmark' },
        { id: 'sec-quiz', num: '19', label: 'Knowledge Quiz' },
        { id: 'sec-exercises', num: '20', label: 'Problem Bank & Q&A' },
        { id: 'sec-roadmap', num: '21', label: 'Topic Roadmap' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Sidebar with exact 6 modules & 21 subtopics */}
        <Sidebar
          title="NumPy"
          version="v2.1"
          subtitle="Vectorized C-Buffer Foundations"
          groups={navGroups}
        />

        {/* Main Content Area - Full width */}
        <main className="flex-1 min-w-0 lg:ml-[280px] px-4 sm:px-8 lg:px-12 py-8 w-full">
          <div className="max-w-6xl mx-auto space-y-12">
            <NumpyHero />
            <Module1Architecture />
            <Module2Creation />
            <Module3Attributes />
            <Module4Indexing />
            <Module5Operations />
            <Module6Labs />
          </div>
        </main>
      </div>
    </div>
  );
}
