'use client';

type FeedType = 'top' | 'new' | 'best';

export default function FeedTabs({ active, onChange }: { active: FeedType; onChange: (t: FeedType) => void }) {
  const tabs: { label: string; value: FeedType }[] = [
    { label: '🔥 Top', value: 'top' },
    { label: '✨ New', value: 'new' },
    { label: '⭐ Best', value: 'best' },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            active === tab.value
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}