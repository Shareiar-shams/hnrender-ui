import { Comment } from '@/types';

function stripHtml(html: string): string {
  return html
    .replace(/<p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .trim();
}

function SingleComment({ comment, depth }: { comment: Comment; depth: number }) {
  if (!comment.text || comment.deleted) return null;

  const borderColors = ['border-orange-300', 'border-blue-300', 'border-green-300', 'border-purple-300'];
  const color = borderColors[depth % borderColors.length];

  return (
    <div className={`border-l-2 ${color} pl-3 my-2`}>
      <div className="text-xs text-gray-500 mb-1">
        <span className="font-medium text-gray-700">{comment.by || 'deleted'}</span>
      </div>
      <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
        {stripHtml(comment.text)}
      </div>
      {comment.children?.length > 0 && (
        <div className="mt-2">
          {comment.children.map(child => (
            <SingleComment key={child.id} comment={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentTree({ comments }: { comments: Comment[] }) {
  if (!comments.length) return <p className="text-gray-500 text-sm">No comments yet.</p>;

  return (
    <div className="space-y-3">
      {comments.map(comment => (
        <SingleComment key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}