Redis integration

Optional Redis pub/sub support is available to scale progress events across multiple server instances.

Setup

1. Install ioredis in the server folder:

```bash
# from repo root
cd server
npm install ioredis
```

2. Set `REDIS_URL` in your environment (e.g., `redis://localhost:6379`):

```bash
# Windows (PowerShell)
$env:REDIS_URL = 'redis://127.0.0.1:6379'

# Linux / macOS
export REDIS_URL=redis://127.0.0.1:6379
```

Behavior

- When `REDIS_URL` is present and `ioredis` is installed, the server will publish progress events to `glyphra:progress:{sessionId}` channels and subscribe to them. This allows multiple server instances to forward progress events to connected SSE clients.
- If Redis or `ioredis` is not available, the server falls back to an in-memory EventEmitter bus for development.

Notes

- In production, provide a managed Redis instance and ensure `REDIS_URL` is set in your deployment environment.
- The server code attempts to load `ioredis` dynamically; no hard dependency is required for local dev unless you enable Redis.
