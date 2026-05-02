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
  notificationOn,
  onToggleNotification,
}: {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenSettings: () => void;
  language: 'zh' | 'en';
  onToggleLanguage: () => void;
  category: Category;
  onCategoryChange: (c: Category) => void;
  notificationOn: boolean;
  onToggleNotification: () => void;
}) => {
  const t = {
    zh: { placeholder: '搜索项目...', subscribe: '订阅' },
    en: { placeholder: 'Search projects...', subscribe: 'Subscribe' },
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
            onClick={onToggleNotification}
            className={`transition-colors p-1.5 rounded-md hover:bg-surface-container flex items-center justify-center ${
              notificationOn ? 'text-primary-container' : 'text-outline hover:text-on-surface'
            }`}
            title={notificationOn ? '通知已开启' : '通知已关闭'}
          >
            {notificationOn ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="text-outline hover:text-on-surface transition-colors p-1.5 rounded-md hover:bg-surface-container flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              document.getElementById('subscribe-section')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary transition-colors ml-2 hidden md:block"
          >
            {t.subscribe}
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
      className="mt-12 bg-surface-container-high border border-outline-variant rounded-xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="max-w-md w-full">
        <h3 className="text-2xl font-semibold text-on-surface mb-2">{t.title}</h3>
        <p className="text-sm text-on-surface-variant">{t.desc}</p>
      </div>

      <div className="flex flex-col w-full md:w-auto gap-4">
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-1 w-full md:w-fit self-end overflow-hidden">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isActive = channel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary-container/10 text-primary-container border border-primary-container/20'
                    : 'hover:bg-surface-bright text-outline hover:text-on-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{ch.label[language]}</span>
              </button>
            );
          })}
        </div>

        <form className="flex w-full md:w-auto gap-2" onSubmit={handleSubmit}>
          <div className="relative flex-grow md:w-80">
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface placeholder:text-outline transition-all disabled:opacity-50"
              placeholder={status === 'success' ? t.success : t.placeholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== 'idle'}
            />
          </div>
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="bg-primary-container text-on-primary-container px-8 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all shadow-lg shadow-primary-container/20 active:scale-95 disabled:opacity-50 flex items-center gap-2 justify-center min-w-[120px]"
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
}: {
  tags: Tag[];
  language: 'zh' | 'en';
  onTagClick: (tag: string) => void;
}) => {
  return (
    <section className="mt-12">
      <div className="mb-6 border-b border-outline-variant pb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-on-surface">
          {language === 'zh' ? '热门标签' : 'Hot Tags'}
        </h2>
        <button
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
  githubToken,
  onSaveToken,
  darkMode,
  onToggleDarkMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  githubToken: string;
  onSaveToken: (token: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) => {
  const [token, setToken] = useState(githubToken);

  const handleSave = () => {
    onSaveToken(token);
  };

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
            className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden relative z-10"
          >
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-high">
              <h2 className="text-xl font-bold text-on-surface">Settings</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-bright rounded-md text-outline hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  API Configuration
                </h3>
                <div className="space-y-2">
                  <label className="text-xs text-outline font-bold uppercase">
                    GitHub Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-all"
                  />
                  <p className="text-[10px] text-outline">
                    Optional. Adds higher rate limits (5000 req/h vs 60 req/h).{' '}
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-container hover:underline"
                    >
                      Create one here &rarr;
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-label-caps text-primary-container">
                  Appearance
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface font-medium">Dark Mode</span>
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
            </div>

            <div className="p-6 bg-surface-container-high border-t border-outline-variant flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all"
              >
                Save
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
