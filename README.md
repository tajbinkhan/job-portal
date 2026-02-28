# Interview Frontend

A modern job board and recruitment platform frontend built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org) | Static typing |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Accessible UI components |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form management and validation |
| [Axios](https://axios-http.com) | HTTP client with CSRF token handling |
| [Lucide React](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons) | Icon libraries |
| [pnpm](https://pnpm.io) | Package manager |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page (/)
│   ├── jobs/                   # Public job listing & detail
│   │   ├── page.tsx            # /jobs
│   │   └── [id]/page.tsx       # /jobs/:id
│   ├── login/page.tsx          # /login
│   └── dashboard/              # Protected admin area
│       ├── page.tsx            # /dashboard
│       └── jobs/               # Job management
│           ├── page.tsx        # /dashboard/jobs
│           ├── create/         # /dashboard/jobs/create
│           └── [id]/edit/      # /dashboard/jobs/:id/edit
├── components/ui/              # Reusable shadcn/ui components
├── core/                       # App constants, env validation, messages
├── layout/                     # Shared layout components (Navbar, Footer, Sidebar)
├── lib/
│   ├── axios-config.ts         # Axios instance with CSRF & auth interceptors
│   └── api/                    # API service modules (auth, jobs)
├── routes/                     # Centralized route constants & middleware config
├── templates/                  # Page-level template components
│   ├── Authentication/         # Login template
│   ├── Dashboard/              # Dashboard & job management templates
│   ├── Home/                   # Home page sections (Hero, FeaturedJobs, etc.)
│   ├── JobDetail/              # Job detail & apply form
│   └── Jobs/                   # Public jobs listing, filter, sidebar
├── validators/                 # Shared Zod validation rules
└── middleware.ts               # Auth-based route protection
```

---

## Features

- **Public pages** — Home with hero, featured jobs, categories, and companies sections; job listings; job detail with apply form
- **Authentication** — Cookie-based auth (`access-token`), login/logout flow with CSRF protection
- **Protected dashboard** — Middleware guards all `/dashboard/*` routes; unauthenticated users are redirected to `/login`
- **Job management** — Create, edit, and list jobs from the admin dashboard
- **Form validation** — React Hook Form + Zod schemas with field-level error messages
- **Responsive UI** — Built with Tailwind CSS and accessible Radix UI primitives

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |
| `NEXT_PUBLIC_FRONTEND_URL` | Base URL of this frontend app |

> The app validates these variables at startup using Zod and will exit with an error if any are missing.

---

## Running Locally

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8 — install globally with `npm install -g pnpm`
- A running backend API (set `NEXT_PUBLIC_API_URL` accordingly)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd interview-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root and add the required variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Build the app for production |
| `pnpm start` | Start the production server (requires `pnpm build` first) |
| `pnpm lint` | Run ESLint across the codebase |

---

## Authentication Flow

- Users log in via `POST /auth/login` — the server sets an `access-token` cookie on success
- `POST /auth/logout` clears the cookie and ends the session
- The Next.js middleware (`src/middleware.ts`) checks for the `access-token` cookie on every `/dashboard/*` request and redirects unauthenticated users to `/login`
- Already-authenticated users visiting `/login` are automatically redirected to `/dashboard`

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)
