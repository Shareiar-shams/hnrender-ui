import { getStory } from '@/lib/api';
import CommentTree from '@/components/CommentTree';
import SummaryPanel from '@/components/SummaryPanel';
import BookmarkButton from '@/components/BookmarkButton';
import Link from 'next/link';

function timeAgo(unix: number): string {
  const diff = Math.floor((Date.now() / 1000) - unix);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const story = await getStory(parseInt(id))

  return (
    <div>
      <Link href="/" className="text-sm text-gray-500 hover:text-orange-600 mb-4 inline-block">← Back to feed</Link>

      {/* Story header */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-snug">{story.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 flex-wrap">
              <span>▲ {story.score} pts</span>
              <span>by {story.by}</span>
              <span>{timeAgo(story.time)}</span>
              <span>💬 {story.descendants || 0} comments</span>
            </div>
            {story.url && (
              <a href={story.url} target="_blank" rel="noopener noreferrer"
                className="mt-2 text-sm text-orange-600 hover:underline inline-block truncate max-w-sm">
                {story.url} ↗
              </a>
            )}
          </div>
          <BookmarkButton story={story} />
        </div>
      </div>

      {/* AI Summary */}
      {(story.descendants || 0) > 0 && <SummaryPanel storyId={story.id} />}

      {/* Comments */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-800 mb-4">
          Comments ({story.descendants || 0})
        </h2>
        <CommentTree comments={story.commentTree || []} />
      </div>
    </div>
  );
}