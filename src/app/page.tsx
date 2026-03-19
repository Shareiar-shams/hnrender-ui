'use client';
import { useState, useEffect, useCallback } from 'react';
import { getStories } from '@/lib/api';
import { Story, StoriesResponse } from '@/types';
import StoryCard from '@/components/StoryCard';
import FeedTabs from '@/components/FeedTabs';

type FeedType = 'top' | 'new' | 'best';

export default function HomePage() {
  const [feedType, setFeedType] = useState<FeedType>('top');
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchStories = useCallback(async (type: FeedType, pageNum: number, reset = false) => {
    setLoading(true);
    try {
      const data: StoriesResponse = await getStories(type, pageNum);
      setStories(prev => reset ? data.stories : [...prev, ...data.stories]);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setStories([]);
    setPage(1);
    setHasMore(true);
    fetchStories(feedType, 1, true);
  }, [feedType, fetchStories]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStories(feedType, nextPage);
  };

  return (
    <div>
      <FeedTabs active={feedType} onChange={(t) => setFeedType(t)} />

      {loading && stories.length === 0 ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse h-16 border border-gray-200" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} rank={(page - 1) * 30 + i + 1} />
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Load more
          </button>
        </div>
      )}
      {loading && stories.length > 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">Loading...</p>
      )}
    </div>
  );
}