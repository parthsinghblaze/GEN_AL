import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';

import GenAiHero from '@/components/genai/GenAiHero';
import Section14UnderstandingLLMs from '@/components/genai/Section14UnderstandingLLMs';
import Section14GptArchitecture from '@/components/genai/Section14GptArchitecture';
import Section14HowLLMsWork from '@/components/genai/Section14HowLLMsWork';
import Section14TokenizationFundamentals from '@/components/genai/Section14TokenizationFundamentals';
import Section14CustomTokenizerLab from '@/components/genai/Section14CustomTokenizerLab';
import Section14TransformerBreakthrough from '@/components/genai/Section14TransformerBreakthrough';
import Section14VectorEmbeddings from '@/components/genai/Section14VectorEmbeddings';
import Section14PositionalEncoding from '@/components/genai/Section14PositionalEncoding';
import Section14MultiHeadAttention from '@/components/genai/Section14MultiHeadAttention';
import Section14CheckpointsQuiz from '@/components/genai/Section14CheckpointsQuiz';

export default function Section14Page() {
  const navGroups: NavGroup[] = [
    {
      title: '14.1 // Architecture & Models',
      badge: '3 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-llm-understanding', num: '01', label: 'Understanding LLMs' },
        { id: 'sec-gpt-architecture', num: '02', label: 'GPT Architecture Deep Dive' },
        { id: 'sec-how-llms-work', num: '03', label: 'How LLMs Work Under the Hood' },
      ],
    },
    {
      title: '14.2 // Tokenization & Python Lab',
      badge: '2 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-tokenization-fundamentals', num: '04', label: 'Fundamentals of Tokenization' },
        { id: 'sec-custom-tokenizer', num: '05', label: 'Custom Tokenizer in Python' },
      ],
    },
    {
      title: '14.3 // Attention Breakthrough & Vectors',
      badge: '2 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-transformer-breakthrough', num: '06', label: 'The Transformer Breakthrough' },
        { id: 'sec-vector-embeddings', num: '07', label: 'Deep Diving Vector Embeddings' },
      ],
    },
    {
      title: '14.4 // Positional Dynamics & Attention',
      badge: '2 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-positional-encoding', num: '08', label: 'Role of Positional Encoding' },
        { id: 'sec-multihead-attention', num: '09', label: 'Multi-Head Attention' },
      ],
    },
    {
      title: '14.5 // Verification & Checkpoints',
      badge: 'Quiz',
      defaultOpen: true,
      items: [
        { id: 'sec-genai-quiz', num: '10', label: 'Checkpoints & Flashcards' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Accordion Sidebar strictly for Section 14 Subtopics */}
        <Sidebar
          title="Section 14"
          version="Foundation"
          subtitle="Core Foundation of Generative AI"
          groups={navGroups}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
            <GenAiHero />

            {/* 1. Understanding Large Language Models */}
            <Section14UnderstandingLLMs />

            {/* 2. Deep Dive into the GPT Architecture */}
            <Section14GptArchitecture />

            {/* 3. How LLMs Work Under the Hood */}
            <Section14HowLLMsWork />

            {/* 4. Fundamentals of Tokenization in NLP */}
            <Section14TokenizationFundamentals />

            {/* 5. Implementing a Custom Tokenizer in Python */}
            <Section14CustomTokenizerLab />

            {/* 6. The Transformer Breakthrough: Google Paper on Attention */}
            <Section14TransformerBreakthrough />

            {/* 7. Deep Diving into Vector Embeddings */}
            <Section14VectorEmbeddings />

            {/* 8. Role of Positional Encoding in Transformers */}
            <Section14PositionalEncoding />

            {/* 9. Understanding Multi-Head Attention for Rich Content */}
            <Section14MultiHeadAttention />

            {/* 10. Checkpoints & Flashcards */}
            <Section14CheckpointsQuiz />

            {/* Next Section Banner Card */}
            <div className="card-paper rounded-2xl p-6 sm:p-8 border-2 border-purple-300 bg-gradient-to-r from-purple-50 via-white to-amber-50 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                  Up Next // Section 15
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-zinc-900">
                  Ready to Build? Proceed to Section 15: API Setup & Integration
                </h3>
                <p className="text-xs text-zinc-600 max-w-xl">
                  Transition from theoretical transformer architecture to production API engineering. Configure your OpenAI developer account, manage spend limits, and initialize official SDKs.
                </p>
              </div>

              <Link
                href="/genai/section-15"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold hover:bg-purple-800 shadow-md transition-all self-start sm:self-auto shrink-0"
              >
                <span>Explore Section 15 →</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
