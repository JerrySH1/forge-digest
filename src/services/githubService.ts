import { Project } from '../types';

const formatStars = (stars: number): string => {
  if (stars >= 1000) return (stars / 1000).toFixed(1) + 'k';
  return stars.toString();
};

export async function fetchTrendingAiProjects(query: string): Promise<{ projects: Project[]; error?: string }> {
  try {
    const token = localStorage.getItem('GITHUB_TOKEN');
    const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`;

    const res = await fetch(url, { headers });

    if (res.status === 403 || res.status === 429) {
      return {
        projects: [],
        error: 'GitHub API 限流。请在 Settings 中配置 Personal Access Token 以提高限额。',
      };
    }

    if (!res.ok) {
      return { projects: [], error: `GitHub API 返回错误 (${res.status})，请稍后重试。` };
    }

    const data = await res.json();

    if (!data.items?.length) {
      return { projects: [], error: undefined };
    }

    const projects: Project[] = data.items.map((item: any) => ({
      id: item.id.toString(),
      name: item.full_name,
      description: item.description || 'No description available.',
      stars: formatStars(item.stargazers_count),
      tags: [item.language, item.topics?.[0]].filter(Boolean),
      url: item.html_url,
    }));

    return { projects, error: undefined };
  } catch (err: any) {
    return { projects: [], error: `网络错误: ${err.message}` };
  }
}
