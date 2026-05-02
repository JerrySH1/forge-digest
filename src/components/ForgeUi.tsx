import React, { useState } from 'react';
import {
  Search,
  Bell,
  BellRing,
  Settings,
  ExternalLink,
  Star,
  Book,
  Mail,
  MessageSquare,
  Users,
  Building2,
  Edit3,
  X,
  CheckCircle2,
  Languages,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Tag, Category, Channel } from '../types';
import { CATEGORY_LABELS } from '../constants';

/* ───────── Header ───────── */

export const Header = ({
  searchQuery,
  onSearchChange,
  onOpenSettings,
  language,
  onToggleLanguage,
  category,
  onCategoryChange,
}: {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenSettings: () => void;
  language: 'zh' | 'en';
  onToggleLanguage: () => void;
  category: Category;
  onCategoryChange: (c: Category) => void;
}) => {
  const t = {
    zh: { placeholder: '搜索项目...' },
    en: { placeholder: 'Search projects...' },
  }[language];

  const categories: Category[] = ['trending', 'agents', 'llm', 'skills'];

  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <div
            className="text-xl font-bold text-slate-50 tracking-tighter cursor-pointer"
            onClick={() => {
              onCategoryChange('trending');
              onSearchChange('');
            }}
          >
            Forge Digest
          </div>
          <nav className="hidden md:flex gap-6">
            {categories.map((cat) => {
              const label = CATEGORY_LABELS[cat][language];
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    onSearchChange('');
                  }}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
                    isActive
                      ? 'text-primary-container border-b-2 border-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              className="bg-surface-container-lowest border border-outline-variant rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface placeholder:text-outline transition-all w-64"
              placeholder={t.placeholder}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button
            onClick={onToggleLanguage}
            className="text-outline hover:text-on-surface transition-colors p-1.5 rounded-md hover:bg-surface-container flex items-center gap-1 text-xs font-bold"
            title={language === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Languages className="w-5 h-5" />
            <span>{language === 'zh' ? 'EN' : '中'}</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="text-outline hover:text-on-surface transition-colors p-1.5 rounded-md hover:bg-surface-container flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

/* ───────── ProjectCard ───────── */

export const ProjectCard = ({
  project,
  language,
}: {
  project: Project;
  language: 'zh' | 'en';
}) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="bg-surface-container border border-outline-variant rounded-xl p-6 hover:border-primary-container/50 hover:shadow-[0_0_15px_rgba(88,166,255,0.1)] transition-all flex flex-col group relative overflow-hidden h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h2 className="text-lg font-semibold text-primary-container flex items-center gap-2">
          <Book className="w-4 h-4 text-outline" />
          {project.name}
        </h2>
        <div className="flex items-center gap-1 text-on-surface-variant group-hover:text-tertiary transition-colors">
          <Star className="w-4 h-4" />
          <span className="font-mono text-xs">{project.stars}</span>
        </div>
      </div>
      <p className="text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow relative z-10">
        {project.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-2 relative z-10">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded text-xs font-mono border ${
                idx === 0
                  ? 'bg-secondary-container/20 border-secondary-container/30 text-secondary'
                  : 'bg-surface-bright border-outline-variant text-on-surface-variant'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          className="text-xs font-bold font-label-caps text-on-surface border border-outline-variant rounded-lg px-4 py-2 hover:bg-surface-bright hover:border-outline transition-colors flex items-center gap-1"
          href={project.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === 'zh' ? '查看代码' : 'View Code'}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.article>
  );
};

/* ───────── RecapCard ───────── */

export const RecapCard = ({ project }: { project: Project }) => {
  return (
    <article className="bg-surface-container-low border border-outline-variant rounded-lg p-4 hover:border-primary-container/30 transition-all flex flex-col group">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-sm font-semibold text-primary-container flex items-center gap-2">
          <Book className="w-4 h-4 text-outline" />
          {project.name}
        </h3>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <Star className="w-3 h-3" />
          <span className="font-mono text-[11px]">{project.stars}</span>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant mb-2 line-clamp-2">{project.description}</p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-surface-bright border border-outline-variant rounded text-[10px] font-mono text-on-surface-variant"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

/* ───────── SubscriptionSection ───────── */

const CHANNELS: { id: Channel; icon: React.FC<{ className?: string }>; label: Record<'zh' | 'en', string> }[] = [
  { id: 'email', icon: Mail, label: { zh: '邮件', en: 'Email' } },
  { id: 'wechat', icon: MessageSquare, label: { zh: '微信', en: 'WeChat' } },
  { id: 'dingtalk', icon: Users, label: { zh: '钉钉', en: 'DingTalk' } },
  { id: 'feishu', icon: Building2, label: { zh: '飞书', en: 'Feishu' } },
];

export const SubscriptionSection = ({ language }: { language: 'zh' | 'en' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [channel, setChannel] = useState<Channel>('email');

  const t = {
    zh: {
      title: '订阅 Forge 日报',
      desc: '获取每日精选的 AI 趋势、智能体开发工具和最佳实践。选择您偏好的接收渠道。',
      placeholder: '输入您的邮箱地址',
      btn: '订阅',
      success: '订阅成功！',
    },
    en: {
      title: 'Subscribe to Forge Digest',
      desc: 'Get daily curated AI trends, agent tools, and best practices. Choose your preferred channel.',
      placeholder: 'Enter your email address',
      btn: 'Subscribe',
      success: 'Subscribed!',
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section
      id="subscribe-section"
      className="mt-6 border-t border-outline-variant pt-6 flex flex-col gap-4"
    >
      <div className="w-full">
        <h3 className="text-sm font-bold font-label-caps text-primary-container mb-1">{t.title}</h3>
        <p className="text-[10px] text-outline leading-snug">{t.desc}</p>
      </div>

      <div className="flex flex-col w-full md:w-auto gap-4">
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-1 w-full overflow-hidden">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isActive = channel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={(e) => {
                  e.preventDefault();
                  setChannel(ch.id);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-primary-container/10 text-primary-container border border-primary-container/20'
                    : 'hover:bg-surface-bright text-outline hover:text-on-surface'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ch.label[language]}</span>
              </button>
            );
          })}
        </div>

        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <div className="relative flex-grow">
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary-container text-on-surface placeholder:text-outline transition-all disabled:opacity-50"
              placeholder={status === 'success' ? t.success : t.placeholder}
              type={channel === 'email' ? 'email' : 'text'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== 'idle'}
            />
          </div>
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="bg-primary-container text-on-primary-container px-4 py-2 rounded-md font-bold text-[11px] uppercase tracking-wider hover:bg-primary transition-all shadow-lg shadow-primary-container/20 active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
          >
            {status === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-on-primary-container border-t-transparent rounded-full"
              />
            ) : status === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              t.btn
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

/* ───────── TagCloud ───────── */

export const TagCloud = ({
  tags,
  language,
  onTagClick,
  onEditClick,
}: {
  tags: Tag[];
  language: 'zh' | 'en';
  onTagClick: (tag: string) => void;
  onEditClick?: () => void;
}) => {
  return (
    <section className="mt-12">
      <div className="mb-6 border-b border-outline-variant pb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-on-surface">
          {language === 'zh' ? '热门标签' : 'Hot Tags'}
        </h2>
        <button
          onClick={onEditClick}
          className="text-outline hover:text-primary-container transition-colors p-1"
          title={language === 'zh' ? '管理标签' : 'Manage tags'}
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface-variant hover:bg-surface-container hover:text-primary-container hover:border-primary-container/30 transition-all cursor-pointer"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </section>
  );
};

/* ───────── SettingsModal ───────── */

export const SettingsModal = ({
  isOpen,
  onClose,
  initialSettings,
  onSaveSettings,
  darkMode,
  onToggleDarkMode,
  language,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialSettings: any;
  onSaveSettings: (settings: any) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  language: 'zh' | 'en';
}) => {
  const [settings, setSettings] = React.useState(initialSettings);

  React.useEffect(() => {
    if (isOpen) setSettings(initialSettings);
  }, [isOpen, initialSettings]);

  const handleSave = () => {
    onSaveSettings(settings);
  };

  const t = {
    zh: {
      title: '设置',
      apiConfig: 'API 配置',
      ghToken: 'GitHub 个人访问令牌',
      ghTokenDesc: '可选。提升请求限额 (5000 次/小时 vs 60 次/小时)。',
      searchFilters: '搜索与过滤',
      dateRange: '趋势时间范围',
      dateOptAll: '所有时间 (默认)',
      dateOptWeek: '近期爆款 (最近一周创建)',
      dateOptMonth: '近期爆款 (最近一月创建)',
      dateOptActive: '近期活跃 (最近一月更新)',
      customTags: '自定义热门标签 (逗号分隔)',
      customQueries: '自定义搜索查询',
      agentsTab: '智能体 (Agents) 标签',
      llmTab: '大模型 (LLM) 标签',
      skillsTab: '技能 (Skills) 标签',
      appearance: '外观',
      darkMode: '深色模式',
      cancel: '取消',
      save: '保存',
    },
    en: {
      title: 'Settings',
      apiConfig: 'API Configuration',
      ghToken: 'GitHub Personal Access Token',
      ghTokenDesc: 'Optional. Adds higher rate limits (5000 req/h vs 60 req/h).',
      searchFilters: 'Search & Filters',
      dateRange: 'Trending Date Range',
      dateOptAll: 'All Time (Default)',
      dateOptWeek: 'Top New (Created Last Week)',
      dateOptMonth: 'Top New (Created Last Month)',
      dateOptActive: 'Recently Active (Pushed Last Month)',
      customTags: 'Custom Tags (Comma Separated)',
      customQueries: 'Custom Queries',
      agentsTab: 'Agents Tab',
      llmTab: 'LLM Tab',
      skillsTab: 'Skills Tab',
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      cancel: 'Cancel',
      save: 'Save',
    },
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-high shrink-0">
              <h2 className="text-xl font-bold text-on-surface">{t.title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-bright rounded-md text-outline hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  {t.apiConfig}
                </h3>
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">
                    {t.ghToken}
                  </label>
                  <input
                    type="password"
                    value={settings.token}
                    onChange={(e) => setSettings({ ...settings, token: e.target.value })}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
                  />
                  <p className="text-[10px] text-outline">
                    {t.ghTokenDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  {t.searchFilters}
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">{t.dateRange}</label>
                  <select
                    value={settings.dateFilter}
                    onChange={(e) => setSettings({ ...settings, dateFilter: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
                  >
                    <option value="default">{t.dateOptAll}</option>
                    <option value="created_last_week">{t.dateOptWeek}</option>
                    <option value="created_last_month">{t.dateOptMonth}</option>
                    <option value="pushed_last_month">{t.dateOptActive}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">{t.customTags}</label>
                  <input
                    type="text"
                    value={settings.customTagsStr}
                    onChange={(e) => setSettings({ ...settings, customTagsStr: e.target.value })}
                    placeholder="Agent, LLM, ..."
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  {t.customQueries}
                </h3>
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">{t.agentsTab}</label>
                  <input
                    type="text"
                    value={settings.queryAgents}
                    onChange={(e) => setSettings({ ...settings, queryAgents: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">{t.llmTab}</label>
                  <input
                    type="text"
                    value={settings.queryLLM}
                    onChange={(e) => setSettings({ ...settings, queryLLM: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">{t.skillsTab}</label>
                  <input
                    type="text"
                    value={settings.querySkills}
                    onChange={(e) => setSettings({ ...settings, querySkills: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  {t.appearance}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface font-medium">{t.darkMode}</span>
                  <button
                    onClick={onToggleDarkMode}
                    className={`w-12 h-7 rounded-full relative transition-colors ${
                      darkMode ? 'bg-primary-container' : 'bg-outline-variant'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow ${
                        darkMode ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <SubscriptionSection language={language} />
            </div>

            <div className="p-6 bg-surface-container-high border-t border-outline-variant flex justify-end gap-3 shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all"
              >
                {t.save}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Footer ───────── */

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-12 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1280px] mx-auto gap-4">
        <div className="text-sm font-semibold text-on-surface-variant">Forge AI Research</div>
        <nav className="flex gap-6">
          {[
            { label: 'Documentation', href: 'https://docs.github.com/en/rest' },
            { label: 'API', href: 'https://api.github.com' },
          ].map((item) => (
            <a
              key={item.label}
              className="text-xs text-outline hover:text-primary-container transition-colors"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="text-xs text-outline">
          &copy; {new Date().getFullYear()} Forge AI Research. Engineered for precision.
        </div>
      </div>
    </footer>
  );
};
