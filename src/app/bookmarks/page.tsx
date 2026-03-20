'use client';
import { useState, useEffect } from 'react';
import { getBookmarks, removeBookmark } from '@/lib/api';
import { Bookmark } from '@/types';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetch = async (q?: string) => {
    setLoading(true);
    try {
      const data = await getBookmarks(q);
      setBookmarks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    fetch(val || undefined);
  };

  const handleRemove = async (storyId: number) => {
    await removeBookmark(storyId);
    setBookmarks(prev => prev.filter(b => b.storyId !== storyId));
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-4">🔖 Bookmarks</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search bookmarks..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-4 outline-none focus:ring-2 focus:ring-orange-300"
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse h-16 border border-gray-200" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">📭</p>
          <p>{search ? 'No bookmarks match your search.' : 'No bookmarks yet. Start reading!'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map(b => (
            <div key={b.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-start justify-between gap-3">
              <div>
                <Link href={`/story/${b.storyId}`} className="font-medium text-gray-900 hover:text-orange-600 text-sm">
                  {b.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1 flex gap-3">
                  <span>▲ {b.points} pts</span>
                  <span>by {b.author}</span>
                  <span>💬 {b.commentCount}</span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(b.storyId)}
                className="text-xs text-red-400 hover:text-red-600 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}