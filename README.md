Vercel deployment

1. Ensure you have the Vercel CLI installed and are logged in:

```bash
npm i -g vercel
vercel login
```

2. From the project root, deploy:

```bash
vercel --prod
```

The static site is served from `index.html` and `static/`. The API endpoint is at `/api/status`.
