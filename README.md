# HN Reader Frontend

A Next.js app for browsing Hacker News stories with bookmarks and AI-powered discussion summaries.

## Highlights

- Top, New, and Best feeds with pagination
- Story detail view with threaded comments
- AI discussion summaries with sentiment tags
- Bookmarks with search and one-click remove
- Clean, responsive UI built with Tailwind CSS

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Axios

## Requirements

- Node.js 20+
- PNPM (recommended, matches the lockfile)
- The backend API running (see `D:\hn-reader\backend\README.md`)

## Getting Started

1. Install dependencies
```bash
pnpm install
```

2. Configure environment variables
```bash
echo NEXT_PUBLIC_API_URL=http://localhost:4000 > .env
```

3. Run the dev server
```bash
pnpm run dev
```

The app runs at `http://localhost:3000` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API | `http://localhost:4000` |

## App Routes

| Route | Description |
|---|---|
| `/` | Feed view (Top/New/Best) |
| `/story/[id]` | Story details, comments, and AI summary |
| `/bookmarks` | Bookmarked stories and search |

## Backend API Expectations

The frontend calls these backend endpoints:

- `GET /api/hn/stories?type=top|new|best&page=1&limit=30`
- `GET /api/hn/story/:id`
- `GET /api/bookmarks?search=...`
- `POST /api/bookmarks`
- `DELETE /api/bookmarks/:storyId`
- `GET /api/bookmarks/check/:storyId`
- `GET /api/summary/:storyId`
- `POST /api/summary/:storyId`

See `D:\hn-reader\backend\README.md` for full API details.

## Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Start the dev server |
| `pnpm run build` | Build for production |
| `pnpm run start` | Start the production server |
| `pnpm run lint` | Run ESLint |

## Docker

Build and run the frontend image:

```bash
docker build -t hn-reader-frontend .
docker run -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://localhost:4000 hn-reader-frontend
```

## Project Structure

| Path | Purpose |
|---|---|
| `src/app` | App Router pages and layout |
| `src/components` | UI components |
| `src/lib/api.ts` | API client wrapper |
| `src/types` | Shared TypeScript types |
