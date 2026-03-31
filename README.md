# GitBurn

GitBurn is a web app that estimates burnout risk from public GitHub activity.
You enter a GitHub username, the backend fetches recent events from GitHub, and the app returns a score plus short insights.

## Current Scope

- React frontend (`client`)
- Express backend (`server`)
- One API endpoint: `POST /api/analyze`
- No database
- No CLI in this repo

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Express + TypeScript
- GitHub API: `GET /users/{username}/events`

## Local Development

### Prerequisites

- Node.js 18+
- pnpm

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start backend (terminal 1)

```bash
pnpm exec tsx server/index.ts
```

The backend runs on `http://127.0.0.1:3000`.

### 3) Start frontend (terminal 2)

```bash
pnpm run dev
```

The frontend runs on `http://127.0.0.1:5173` and proxies `/api` to `http://127.0.0.1:3000`.

## Production

```bash
pnpm run build
pnpm run start
```

## Environment Variables

Optional:

```env
GITHUB_TOKEN=your_github_token
```

Without a token, GitHub rate limits are lower.

For custom local backend proxy target in frontend dev:

```env
VITE_API_PROXY_TARGET=http://127.0.0.1:3000
```

## API

### `POST /api/analyze`

Request:

```json
{ "username": "octocat" }
```

Success response:

```json
{
  "score": 45,
  "signals": ["Occasional late-night activity"],
  "summary": "Moderate risk...",
  "personality": "Steady Contributor",
  "insight": "Your burnout score is 45%...",
  "roast": "You're doing okay..."
}
```

Error behavior:

- `400`: missing/invalid username
- `404`: GitHub user not found
- `429`: GitHub API rate limit exceeded
- `5xx`: upstream/network/internal failure

## Limitations

- Uses GitHub public events API, not full commit history.
- Public activity only.
- Score is heuristic and for informational/entertainment use, not medical guidance.

## License

MIT. See `LICENSE`.
