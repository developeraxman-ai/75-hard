# 75 Command

A single-user-first 75 Hard discipline PWA built with Next.js App Router, JavaScript, Tailwind CSS, MongoDB Atlas, Cloudinary, JWT cookie auth, and Vercel-friendly API routes.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment

Fill `.env.local`:

```bash
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
VAPID_PUBLIC_KEY=
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=mailto:you@example.com
```

Generate VAPID keys with:

```bash
npx web-push generate-vapid-keys
```

## MongoDB Atlas

Create an Atlas cluster, add a database user, allow your IP/Vercel egress, and paste the connection string into `MONGODB_URI`.

## Cloudinary

Create a Cloudinary project and copy cloud name, API key, and API secret. Progress photos upload to `progress-photos/{userId}/{attemptId}/day-###` and only metadata is stored in MongoDB.

## Vercel

Import the repo, set all environment variables in Project Settings, and deploy. API routes are serverless-compatible. The repository includes `vercel.json` so Vercel treats the project as a Next.js app from the repository root.

## Troubleshooting deployment

If the Vercel URL shows **404 Not Found**, the request is usually not reaching a successfully deployed Next.js app. Check these in order:

1. The Vercel project is connected to this repository and branch.
2. The Vercel project root directory is the repository root, not a subfolder.
3. The latest deployment build succeeded.
4. The production domain points to the latest successful deployment.

After the app deploys, open:

```bash
https://your-app.vercel.app/api/health
```

A `503` response means one or more required environment variables are missing in Vercel. Add the missing values in **Vercel → Project → Settings → Environment Variables**, then redeploy.

If a local `curl` returns `CONNECT tunnel failed, response 403`, that is a network/proxy restriction from the current environment, not necessarily an application response from Vercel.
