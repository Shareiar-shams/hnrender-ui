import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HN Reader',
  description: 'Hacker News Reader with AI summaries',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} bg-gray-50 min-h-screen`}
        suppressHydrationWarning 
      >
        <nav className="bg-orange-500 text-white px-4 py-3 flex items-center gap-6 shadow">
          <Link href="/" className="font-bold text-lg tracking-tight">📰 HN Reader</Link>
          <Link href="/bookmarks" className="text-sm hover:underline">🔖 Bookmarks</Link>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}