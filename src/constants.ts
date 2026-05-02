import { Project, Tag } from './types';

function formatDate(date: Date, lang: 'zh' | 'en'): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return lang === 'zh'
    ? `${y}年${m}月${d}日`
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getTodayStr(lang: 'zh' | 'en'): string {
  return formatDate(new Date(), lang);
}

export function getYesterdayStr(lang: 'zh' | 'en'): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDate(d, lang);
}

export const YESTERDAY_RECAP: Project[] = [
  {
    id: 'r1',
    name: 'Google/Gemma',
    description:
      'A family of lightweight, state-of-the-art open models built from the same research and technology used to create the Gemini models.',
    stars: '15.2k',
    tags: ['LLM', 'Open Source'],
  },
  {
    id: 'r2',
    name: 'Anthropic/Claude-3-Ops',
    description:
      'Official documentation and prompt engineering recipes for maximizing Claude 3 model performance in operational environments.',
    stars: '8.4k',
    tags: ['Prompts', 'Claude'],
  },
  {
    id: 'r3',
    name: 'OpenAI/Whisper',
    description:
      'Robust Speech Recognition via Large-Scale Weak Supervision. General-purpose speech recognition model.',
    stars: '98.2k',
    tags: ['Speech', 'Audio'],
  },
];

export const TRENDING_TAGS: Tag[] = [
  { name: 'Agent' },
  { name: 'LLM' },
  { name: 'Llama 3' },
  { name: 'PyTorch' },
  { name: 'RAG' },
  { name: 'Fine-tuning' },
  { name: 'LangChain' },
  { name: 'Multi-modal' },
  { name: 'Stable Diffusion' },
  { name: 'Transformer' },
];

export type Category = 'trending' | 'agents' | 'llm' | 'skills';

export const CATEGORY_QUERIES: Record<Category, string> = {
  trending: 'topic:artificial-intelligence+language:python+language:typescript+pushed:>2024-01-01',
  agents: 'topic:ai-agent+topic:llm+pushed:>2024-01-01',
  llm: 'topic:large-language-model+topic:llm+pushed:>2024-01-01',
  skills: 'topic:machine-learning+topic:deep-learning+pushed:>2024-01-01',
};

export const CATEGORY_LABELS: Record<Category, { zh: string; en: string }> = {
  trending: { zh: '趋势', en: 'Trending' },
  agents: { zh: '智能体', en: 'Agents' },
  llm: { zh: '大模型', en: 'LLM' },
  skills: { zh: '技能', en: 'Skills' },
};
