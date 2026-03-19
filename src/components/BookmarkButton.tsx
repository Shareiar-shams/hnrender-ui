'use client';
import { useState, useEffect } from 'react';
import { checkBookmark, addBookmark, removeBookmark } from '@/lib/api';
import { Story } from '@/types';

export default function BookmarkButton({ story }: { story: Story }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBookmark(story.id)
      .then(res => setBookmarked(res.bookmarked))
      .finally(() => setLoading(false));
  }, [story.id]);

  const toggle = async () => {
    setLoading(true);
    try {
      if (bookmarked) {
        await removeBookmark(story.id);
        setBookmarked(false);
      } else {
        await addBookmark(story);
        setBookmarked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        bookmarked
          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {bookmarked ? '🔖 Bookmarked' : '+ Bookmark'}
    </button>
  );
}