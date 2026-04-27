# David More-Ekele Portfolio

A modern portfolio built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, GSAP, and EmailJS.

## Local setup

```bash
git clone <your-repo-url>
cd davidmore
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

Create a `.env.local` file with:

```bash
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project notes

- The contact form uses EmailJS and will show a friendly configuration message until the env values are added.
- The site is structured for cloning, editing, and deployment without Lovable-specific setup.
- Images, copy, and profile data live in `src/data` and `src/components`.

## Deployment

Build with `npm run build`, then deploy the generated `dist` folder to your hosting provider.
