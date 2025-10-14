# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Slack Archive Browser - a Next.js application that imports Slack workspace exports and provides a web interface to browse channels, messages, threads, and search through the archive. Built with Next.js 14 (App Router), Prisma ORM, PostgreSQL, and NextAuth for authentication.

## Development Commands

### Environment Setup
- `pnpm install` - Install dependencies (Node.js 22 required)
- Create `.env` file from `.env.template` and populate all required variables

### Database Management
- `pnpm db:local:start` - Start local PostgreSQL via Docker (runs on port 5432)
- `pnpm db:local:stop` - Stop local PostgreSQL container
- `pnpm db:migrate:dev` - Run Prisma migrations in development
- `pnpm db:reset` - Reset database (drops all data and re-runs migrations)

### Data Import
- `pnpm archive:import` - Import Slack export from `.archive` directory into database
- `pnpm archive:import:test <channel-name>` - Import only a specific channel for testing

### Development & Build
- `pnpm dev` - Start development server (starts local DB, then Next.js dev server)
- `pnpm build` - Production build
- `pnpm build:vercel` - Production build for Vercel (runs `prisma generate` first)
- `pnpm lint` - Run ESLint and TypeScript type checking

## Architecture

### Database Schema (Prisma)

The schema models Slack's data structure with four main entities:

- **User**: Slack users with display name and avatar
  - Special users: `USLACKBOT`, `NO_ID` (bots without IDs), `UNKNOWN_ID` (external users)
- **Channel**: Slack channels with `isGeneral` flag
- **Message**: Messages with four types:
  - `NORMAL`: Regular channel messages
  - `THREAD_PARENT`: Messages that started a thread
  - `THREAD_CHILD`: Replies within a thread
  - `THREAD_CHILD_BROADCAST`: Thread replies also sent to channel
- **Reaction**: Emoji reactions to messages

Messages use `ts` (timestamp) as the primary ordering field. Thread relationships are modeled via `parentId` self-reference.

### App Structure

Next.js App Router structure:
- `app/page.tsx` - Landing page (redirects to general channel)
- `app/(main)/` - Main application layout with sidebar
  - `channels/page.tsx` - Channel list view
  - `channels/[channelId]/page.tsx` - Channel message view with pagination
  - `channels/[channelId]/[ts]/page.tsx` - Deep link to specific message
  - `search/page.tsx` - Search interface
- `app/api/auth/` - NextAuth endpoints

### Key Libraries

- `lib/data.ts` - All database queries (server-only)
  - Pagination logic for channel messages
  - Search across messages, users, and dates
  - Thread-aware queries (filters out thread children from main views)
- `lib/auth.ts` - NextAuth configuration with Slack OAuth provider
  - Access restricted to specific Slack team via `SLACK_TEAM_ID`
- `lib/emoji_convertor.ts` - Converts Slack emoji format to displayable emojis
- `lib/prisma.ts` - Prisma client singleton

### Import Process (`scripts/archive_to_db.ts`)

The import script processes Slack export JSON files:
1. Creates users from `users.json` (plus special system users)
2. Iterates through channels from `channels.json`
3. For each channel, reads all daily JSON files
4. Processes messages to determine types (thread parent/child)
5. Builds parent-child relationships using `thread_ts` and `parent_user_id`
6. Creates reactions linked to messages and users
7. Generates UUIDs for all entities (Slack doesn't provide stable IDs for messages)

The script expects a clean database - run `pnpm db:reset` before re-importing.

### Authentication

Uses NextAuth with Slack OAuth provider. The `signIn` callback enforces that only users from the configured Slack team (via `SLACK_TEAM_ID`) can access the application.

### Local Development Database

The local database setup uses a Docker container running PostgreSQL:
- Container name: `slack-archive-postgres`
- Port: 5432
- Password: `postgres`
- Data persisted in `./.postgres-data/`
- Runs with `--rm` flag (removes container on stop)

Set `POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/slack_archive` for local development.

## Important Notes

- Message pagination is complex: uses `ts` for ordering but counts only top-level messages (NORMAL and THREAD_PARENT types) when calculating pages
- The `getMessagePageFromTs` function (lib/data.ts:33) calculates which page a specific timestamp appears on - used for deep linking
- Thread replies are loaded eagerly with their parent message (see `threadReplies` include in queries)
- Search is limited to 100 results and uses case-sensitive `contains` queries (no full-text search)
- The import script requires consistent Slack export format - deviations may cause import failures
- Don't try to list the contents of .archive or reading files from there without explicit instructions as they are very large jsons