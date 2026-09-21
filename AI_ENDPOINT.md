# Secure AI endpoint

Vlot supports either a locally stored Gemini key for private testing or a server-side endpoint for production. The production approach keeps the model-provider key out of the browser.

The included Cloudflare Worker accepts:

```json
{"prompt":"...","app":"vlot","version":6}
```

and returns:

```json
{"text":"model response"}
```

## Deploy

1. Create a Cloudflare Worker and paste `worker/vlot-ai.js`.
2. Add the secret `GEMINI_API_KEY`.
3. Add `ALLOWED_ORIGIN`, for example `https://sejyta-main.github.io`.
4. Bind a KV namespace as `VLOT_RATE` for per-IP hourly limits.
5. Put the Worker URL in Vlot → Settings → Safe AI endpoint.

For a multi-user release, add authenticated user sessions, abuse monitoring, deletion controls and a privacy notice. CORS and a rate limit reduce accidental exposure but are not user authentication.
