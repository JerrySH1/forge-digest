export interface Project {
  id: string;
  name: string;
  description: string;
  stars: string;
  tags: string[];
  url?: string;
  isFeatured?: boolean;
}

export interface Tag {
  name: string;
  count?: number;
}

export type Category = 'trending' | 'agents' | 'llm' | 'skills';

export type Channel = 'email' | 'wechat' | 'dingtalk' | 'feishu';
