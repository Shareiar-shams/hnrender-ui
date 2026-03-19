'use client';
import Link from 'next/link';
import { Story } from '@/types';

function timeAgo(unix: number): string {
  const diff = Math.floor((Date.now() / 1000) - unix);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function StoryCard({ story, rank }: { story: Story; rank: number }) {
  const domain = story.url ? new URL(story.url).hostname.replace('www.', '') : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <span className="text-gray-400 text-sm font-mono w-6 flex-shrink-0 pt-0.5">{rank}.</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <Link href={`/story/${story.id}`} className="font-medium text-gray-900 hover:text-orange-600 leading-snug">
              {story.title}
            </Link>
            {domain && (
              <a href={story.url} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5">
                ({domain}) ↗
              </a>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500 flex-wrap">
            <span>▲ {story.score} pts</span>
            <span>by {story.by}</span>
            <span>{timeAgo(story.time)}</span>
            <Link href={`/story/${story.id}`} className="hover:text-orange-600 font-medium">
              💬 {story.descendants || 0} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}