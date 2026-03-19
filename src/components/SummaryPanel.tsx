'use client';
import { useState, useEffect } from 'react';
import { getSummary, generateSummary } from '@/lib/api';
import { Summary } from '@/types';

const sentimentColors = {
  positive: 'bg-green-100 text-green-800',
  negative: 'bg-red-100 text-red-800',
  mixed: 'bg-yellow-100 text-yellow-800',
  neutral: 'bg-gray-100 text-gray-800'
};

export default function SummaryPanel({ storyId }: { storyId: number }) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Check if cached summary exists on load
  useEffect(() => {
    getSummary(storyId)
      .then(setSummary)
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [storyId]);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSummary(storyId);
      setSummary(result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  if (!checked) return null;

  if (summary) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900">🤖 AI Discussion Summary</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${sentimentColors[summary.sentiment]}`}>
            {summary.sentiment}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{summary.summary}</p>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Points</p>
          <ul className="space-y-1">
            {summary.keyPoints.map((point, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="text-amber-500 flex-shrink-0">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Analyzing discussion... (may take 10-20s)
          </>
        ) : (
          '🤖 Summarize Discussion'
        )}
      </button>
    </div>
  );
}