# Slack Archive Browser

![deployment status badge](https://img.shields.io/github/deployments/pkarolyi/slack-archive-browser/production?logo=vercel&label=deployment)

A Slack archive export browser for our friend group.

Built on NextJS with Prisma and a Postgres db.

## Usage

1. Create a Postgresql database
2. Create an `.env` based on `.env.template` and populate the variables
3. Download your slack export zip and extract it
4. Move the directory to the root of the project and rename it to `.archive`
5. Run `pnpm archive:import` to populate the database from the export jsons
6. Run the app with `pnpm dev`

## Deployment

Just deploy as you would any nextjs app. The application requires logging in by default, I currently configured NextAuth with the Slack provider so you can use Slack to log in.
