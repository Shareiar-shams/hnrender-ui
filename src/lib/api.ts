import axios from 'axios';
import { StoriesResponse, Story, Bookmark, Summary } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
});

// HN
export const getStories = (type: string, page: number): Promise<StoriesResponse> =>
  api.get(`/api/hn/stories?type=${type}&page=${page}&limit=30`).then(r => r.data);

export const getStory = (id: number): Promise<Story> =>
  api.get(`/api/hn/story/${id}`).then(r => r.data);

// Bookmarks
export const getBookmarks = (search?: string): Promise<Bookmark[]> =>
  api.get(`/api/bookmarks${search ? `?search=${search}` : ''}`).then(r => r.data);

export const addBookmark = (story: Story): Promise<Bookmark> =>
  api.post('/api/bookmarks', {
    storyId: story.id,
    title: story.title,
    url: story.url,
    author: story.by,
    points: story.score,
    commentCount: story.descendants || 0
  }).then(r => r.data);

export const removeBookmark = (storyId: number): Promise<void> =>
  api.delete(`/api/bookmarks/${storyId}`).then(r => r.data);

export const checkBookmark = (storyId: number): Promise<{ bookmarked: boolean }> =>
  api.get(`/api/bookmarks/check/${storyId}`).then(r => r.data);

// AI Summary
export const getSummary = (storyId: number): Promise<Summary> =>
  api.get(`/api/summary/${storyId}`).then(r => r.data);

export const generateSummary = (storyId: number): Promise<Summary> =>
  api.post(`/api/summary/${storyId}`).then(r => r.data);