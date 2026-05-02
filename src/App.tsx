import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Header,
  ProjectCard,
  RecapCard,
  SubscriptionSection,
  TagCloud,
  Footer,
  SettingsModal,
} from './components/ForgeUi';
import { YESTERDAY_RECAP, TRENDING_TAGS, CATEGORY_QUERIES, getTodayStr, getYesterdayStr } from './constants';
import { fetchTrendingAiProjects } from './services/githubService';
import { Project, Category } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [category, setCategory] = useState<Category>('trending');
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationOn, setNotificationOn] = useState(false);
  const [githubToken, setGithubToken] = useState(
    () => localStorage.getItem('GITHUB_TOKEN') || ''
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadProjects = useCallback(async (cat: Category) => {
    setIsLoading(true);
    setError(null);
    const query = CATEGORY_QUERIES[cat];
    const result = await fetchTrendingAiProjects(query);
    setProjects(result.projects);
    setError(result.error || null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects(category);
  }, [category, loadProjects]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    const lowerQuery = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }, [projects, searchQuery]);

  const handleTagClick = useCallback((tag: string) => {
    setSearchQuery(tag);
  }, []);

  const handleSaveToken = useCallback((token: string) => {
    localStorage.setItem('GITHUB_TOKEN', token);
    setGithubToken(token);
    setIsSettingsOpen(false);
    loadProjects(category);
  }, [category, loadProjects]);

  const t = {
    zh: {
      subtitle: `${getTodayStr('zh')} - 每日热门 GitHub AI、智能体及技能项目。`,
      empty: '未找到关于 "{query}" 的结果',
      clear: '清除搜索过滤',
      yesterday: '昨日回顾',
      yesterday_desc: `${getYesterdayStr('zh')} 热门项目回顾`,
    },
    en: {
      subtitle: `${getTodayStr('en')} - Daily trending GitHub AI, Agent, and Skill projects.`,
      empty: 'No results found for "{query}"',
      clear: 'Clear search filters',
      yesterday: 'Yesterday Recap',
      yesterday_desc: `Popular projects from ${getYesterdayStr('en')}`,
    },
  }[language];

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-container/30">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSettings={() => setIsSettingsOpen(true)}
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'))}
        category={category}
        onCategoryChange={setCategory}
        notificationOn={notificationOn}
        onToggleNotification={() => setNotificationOn((v) => !v)}
      />

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-12 border-b border-outline-variant pb-4">
              <h1 className="text-4xl font-bold text-on-surface mb-1 tracking-tight">
                Daily Top 10
              </h1>
              <p className="text-base text-on-surface-variant">{t.subtitle}</p>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 py-20"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full shadow-lg shadow-primary-container/20"
                    />
                    <p className="text-sm font-medium text-outline animate-pulse">
                      Syncing with GitHub Intelligence...
                    </p>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                  >
                    <div className="text-4xl">&#9888;</div>
                    <p className="text-on-surface-variant font-medium max-w-md">{error}</p>
                    <button
                      onClick={() => loadProjects(category)}
                      className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all"
                    >
                      {language === 'zh' ? '重试' : 'Retry'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} language={language} />
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center space-y-4">
                        <div className="text-4xl">&#128269;</div>
                        <p className="text-on-surface-variant font-medium">
                          {t.empty.replace('{query}', searchQuery)}
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-primary-container hover:underline text-sm"
                        >
                          {t.clear}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <SubscriptionSection language={language} />
          </div>

          <aside className="lg:col-span-1">
            <section>
              <div className="mb-6 border-b border-outline-variant pb-4">
                <h2 className="text-2xl font-bold text-on-surface mb-1">{t.yesterday}</h2>
                <p className="text-sm text-on-surface-variant">{t.yesterday_desc}</p>
              </div>
              <div className="flex flex-col gap-4">
                {YESTERDAY_RECAP.map((project) => (
                  <RecapCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <TagCloud tags={TRENDING_TAGS} language={language} onTagClick={handleTagClick} />
          </aside>
        </div>
      </main>

      <Footer />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        githubToken={githubToken}
        onSaveToken={handleSaveToken}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((v) => !v)}
      />
    </div>
  );
}
