# Real Enterprises Website

Marketing website and content-managed project portfolio for Real Enterprises.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Keystatic CMS
- Cloudinary media delivery
- Resend for contact form email delivery

## Local Development

Requirements:

- Node.js 20+
- npm

Run locally:

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` with the values required for local development and production deployment.

Core variables used by the app:

- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## Production Build

```sh
npm run build
npm run start
```

## Deployment

This project is configured for Next.js deployment on Netlify through [netlify.toml](/Users/afnan/structure-shine-co/netlify.toml).

Deployment notes:

- Keep the Netlify `Publish directory` UI field empty unless a platform-specific override is intentionally required.
- Set all required environment variables in Netlify.
- Clear cache and redeploy after changing build settings.
