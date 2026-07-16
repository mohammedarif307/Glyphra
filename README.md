# Glyphra

Glyphra converts research PDFs into clean, editable LaTeX with a fast React frontend and a Node.js backend powered by Grok AI.

## What it does

- Upload a PDF and track live processing progress.
- Extract the paper structure, equations, figures, tables, and references.
- Generate compilable LaTeX output ready for editing.
- Present the full flow in a polished workspace UI.

## Project Status

Glyphra is about 80% complete. The main user flow is already in place: upload, live progress updates, PDF analysis, LaTeX generation, and deployment wiring.

### Done

- Landing page and workspace UI.
- PDF upload flow with live progress updates.
- Backend conversion pipeline and health endpoint.
- Netlify and Render deployment config.
- Environment-based API key handling.

### Left

- Production hardening and edge-case cleanup.
- Better test coverage and CI automation.
- Redis-backed scaling for multi-instance deployment.
- Final UX polish.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS |
| Backend | Node.js, Express |
| Parsing | pdf-parse |
| AI | Grok API (xAI) |
| Deployment | Netlify + Render |

## Repository Layout

```text
glyphra/
├── client/   # React app
├── server/   # Express API
├── netlify.toml
├── render.yaml
└── README.md
```

## Local Setup

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure the backend

Copy the example env file and fill in your own values:

```bash
cd server
copy .env.example .env
```

Recommended values:

```env
GROK_API_KEY=your_grok_api_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 3. Run the app

Open two terminals:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

The frontend runs on the Vite dev server and calls the backend API through `VITE_API_URL` when set.

## Environment Variables

### Server

| Variable | Purpose | Required |
|---|---|---|
| `GROK_API_KEY` | xAI API key used for LaTeX generation | Yes |
| `PORT` | Express port | No |
| `CLIENT_URL` | Allowed frontend origin for CORS | Yes |

### Client

| Variable | Purpose | Required |
|---|---|---|
| `VITE_API_URL` | Public backend URL | Yes for production |

## API

### `POST /api/convert`

Upload a PDF as `multipart/form-data` with the field name `pdf`. The response includes analysis metadata and generated LaTeX.

### `GET /api/health`

Returns a simple health status payload for uptime checks.

## Deployment

Simple deployment setup:

- Frontend: Netlify
- Backend: Render

Deployment flow:

1. Push the repo to GitHub.
2. Deploy the backend on Render.
3. Set `VITE_API_URL` on Netlify to the Render backend URL.
4. Set `CLIENT_URL` on Render to the final Netlify URL.
5. Redeploy the backend after updating `CLIENT_URL`.

## Notes

- Do not commit `.env` files.
- `server/.env.example` contains the backend variables you need.
- The temporary upload folder is kept in the repo with `.gitkeep` so the server has a writable path after clone.
