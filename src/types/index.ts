export interface Story {
  id: number;
  title: string;
  url?: string;
  by: string;
  score: number;
  descendants: number;  // comment count
  time: number;         // unix timestamp
  kids?: number[];
  commentTree?: Comment[];
}

export interface Comment {
  id: number;
  by?: string;
  text?: string;
  time: number;
  deleted?: boolean;
  dead?: boolean;
  children: Comment[];
}

export interface Bookmark {
  id: number;
  storyId: number;
  title: string;
  url?: string;
  author: string;
  points: number;
  commentCount: number;
  createdAt: string;
}

export interface Summary {
  id: number;
  storyId: number;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  summary: string;
  createdAt: string;
}

export interface StoriesResponse {
  stories: Story[];
  total: number;
  page: number;
  hasMore: boolean;
}