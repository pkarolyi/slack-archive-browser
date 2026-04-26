# Slack Archive Browser

A Slack archive export browser for our friend group.

Built on Next.js with Prisma and Postgres, organised as a pnpm monorepo:

- `apps/web` — Next.js UI
- `apps/importer` — service that ingests Slack export uploads (in progress)
- `packages/db` — shared Prisma schema and client

## Usage

1. Create a Postgresql database
2. Create `apps/web/.env` based on `apps/web/.env.template` and populate the variables
3. Create `apps/importer/.env` based on `apps/importer/.env.template` (only needed to run the import script)
4. Download your Slack export zip and extract it
5. Move the directory to the root of the project and rename it to `.archive`
6. Run `pnpm archive:import` to populate the database from the export jsons
7. Run the app with `pnpm dev`

## Deployment

Build and run the included `Dockerfile` from the repo root — it produces a self-contained image of the web app. The application requires logging in; NextAuth is configured with the Slack provider.
