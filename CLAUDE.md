# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Slack Archive Browser - imports Slack workspace exports and provides a web interface to browse channels, messages, threads, and search through the archive. Built with Next.js (App Router), Prisma ORM, PostgreSQL, and NextAuth.

## Repository Layout (pnpm monorepo)

```
.
├── apps/
│   ├── web/              # @sab/web — Next.js app (UI, auth, API routes)
│   │   ├── app/          # Next.js App Router
│   │   ├── components/
│   │   ├── lib/          # data queries, auth, utils
│   │   ├── .env          # web's env (Slack OAuth, NextAuth, POSTGRES_URL, ...)
│   │   └── .env.template
│   └── importer/         # @sab/importer — service that processes Slack export uploads
│       ├── src/          # service code (currently a stub)
│       ├── scripts/
│       │   └── archive_to_db.ts  # legacy CLI import — to be folded into the service
│       └── .env.template
├── packages/
│   └── db/               # @sab/db — Prisma schema, migrations, generated client + type helpers
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── prisma.config.ts
│       └── src/          # exports prisma client singleton + Prisma namespace + types
├── scripts/              # workspace-level Docker postgres helpers
├── pnpm-workspace.yaml
├── package.json          # root — orchestrates filtered workspace scripts
└── Dockerfile            # builds the web app for deployment
```

Workspace package names use the `@sab/*` scope (slack-archive-browser abbreviated).

### Env ownership

Each app owns its own `.env`. `packages/db` does **not** load env — it just reads `process.env` whenever its consumer instantiates the client. Duplicating vars between `apps/web/.env` and `apps/importer/.env` is fine.

Prisma migration commands live in `apps/web` (run from there so `apps/web/.env` is loaded via `dotenv-cli` before invoking prisma against `../../packages/db/prisma.config.ts`).

## Development Commands

All commands below are run from the repo root.

### Environment Setup
- `pnpm install` - Install dependencies (Node.js 24 required, runs `prisma generate` via postinstall)
- Create `apps/web/.env` from `apps/web/.env.template` and populate all required variables
- Create `apps/importer/.env` from `apps/importer/.env.template` when running the import script

### Database Management
- `pnpm db:local:start` - Start local PostgreSQL via Docker (port 5432)
- `pnpm db:local:stop` - Stop local PostgreSQL container
- `pnpm db:generate` - Regenerate the Prisma client
- `pnpm db:migrate:dev` - Run Prisma migrations in development
- `pnpm db:reset` - Reset database (drops all data, re-runs migrations)

### Data Import
- `pnpm archive:import` - Import Slack export from `.archive` directory into database
- `pnpm archive:import:test <channel-name>` - Import only a specific channel for testing
- `pnpm archive:reset` - Reset DB and re-import in one step

### Development & Build
- `pnpm dev` - Start local Postgres and the Next.js dev server (stops postgres on exit)
- `pnpm build` - Production build of the web app
- `pnpm start` - Run the production build
- `pnpm lint` - Run ESLint and TypeScript checks across all workspaces

Per-package execution: `pnpm --filter @sab/web <script>`, `pnpm --filter @sab/db <script>`, etc.

## Architecture

### Database Schema (Prisma)

Defined in `packages/db/prisma/schema.prisma`. Models:

- **User**: Slack users with display name and avatar
  - Special users: `USLACKBOT`, `NO_ID` (bots without IDs), `UNKNOWN_ID` (external users)
- **Channel**: Slack channels with `isGeneral` flag
- **Message**: four types via `MessageType` enum:
  - `NORMAL`: Regular channel messages
  - `THREAD_PARENT`: Messages that started a thread
  - `THREAD_CHILD`: Replies within a thread
  - `THREAD_CHILD_BROADCAST`: Thread replies also sent to channel
- **Reaction**: Emoji reactions to messages

Messages use `ts` (timestamp) as the primary ordering field. Thread relationships are modeled via `parentId` self-reference.

The `@sab/db` package re-exports the prisma client singleton, the `Prisma` namespace, the `MessageType` enum, and type helpers (`MessageWithUserReactionThread`, `MessageWithUserAndChannel`, `Channel`, `Reaction`). Consumers import from `@sab/db` directly.

### Web App Structure (`apps/web/`)

Next.js App Router:
- `app/page.tsx` - Landing page (redirects to general channel)
- `app/(main)/` - Main application layout with sidebar
  - `channels/page.tsx` - Channel list view
  - `channels/[channelId]/page.tsx` - Channel message view with pagination
  - `channels/[channelId]/[ts]/page.tsx` - Deep link to specific message
  - `search/page.tsx` - Search interface
- `app/api/auth/` - NextAuth endpoints

### Key Web Libraries

- `lib/data.ts` - Server-only database queries (uses `prisma` from `@sab/db`)
  - Pagination logic for channel messages
  - Search across messages, users, and dates
  - Thread-aware queries (filters out thread children from main views)
- `lib/auth.ts` - NextAuth configuration with Slack OAuth provider
  - Access restricted to specific Slack team via `SLACK_TEAM_ID`
- `lib/emoji_convertor.ts` - Converts Slack emoji format to displayable emojis

`next.config.js` sets `outputFileTracingRoot` to the repo root and `transpilePackages: ["@sab/db"]` so the workspace TypeScript source is compiled into the build.

### Importer (`apps/importer/`)

Will be a service that accepts uploaded Slack export zips and ingests them into the database, replacing the legacy CLI flow (slack download zip → extract in repo → reset prod db → run import script).

Currently a stub. The legacy import logic lives at `apps/importer/scripts/archive_to_db.ts`.

### Import Process (`apps/importer/scripts/archive_to_db.ts`)

The script processes Slack export JSON files:
1. Creates users from `users.json` (plus special system users)
2. Iterates through channels from `channels.json`
3. For each channel, reads all daily JSON files
4. Processes messages to determine types (thread parent/child)
5. Builds parent-child relationships using `thread_ts` and `parent_user_id`
6. Creates reactions linked to messages and users
7. Generates UUIDs for all entities (Slack doesn't provide stable IDs for messages)

The script expects a clean database — run `pnpm db:reset` before re-importing.

### Authentication

NextAuth with Slack OAuth. The `signIn` callback enforces that only users from the configured Slack team (via `SLACK_TEAM_ID`) can access the application.

### Local Development Database

Docker container running PostgreSQL:
- Container name: `slack-archive-postgres`
- Port: 5432
- Password: `postgres`
- Data persisted in `./.postgres-data/`
- Runs with `--rm` flag (removes container on stop)

Set `POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/slack_archive` (and matching `POSTGRES_URL_NON_POOLING`) for local development.

### Deployment

Deploy via the root `Dockerfile`. It performs a multi-stage build: installs all workspace deps, runs `pnpm --filter @sab/db generate && pnpm --filter @sab/web build`, then ships a slim runner image based on the Next.js standalone output. Entry point is `node apps/web/server.js`.

## Important Notes

- Message pagination is complex: uses `ts` for ordering but counts only top-level messages (`NORMAL` and `THREAD_PARENT`) when calculating pages
- `getMessagePageFromTs` in `apps/web/lib/data.ts` calculates which page a specific timestamp appears on — used for deep linking
- Thread replies are loaded eagerly with their parent message (see `threadReplies` include in queries)
- Search is limited to 100 results and uses case-sensitive `contains` queries (no full-text search)
- The import script requires consistent Slack export format — deviations may cause import failures
- Don't list contents of `.archive` or read files from there without explicit instructions — the JSONs are very large
