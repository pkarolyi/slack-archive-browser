# CPPFTW Archive
![deployment status badge](https://img.shields.io/github/deployments/pkarolyi/cppftw-archive/production?logo=vercel&label=deployment)

A Slack archive export browser for our friend group.

Built on NextJS with Prisma and a Postgres db.

## Usage

1. Create a Postgresql database
2. Create an `.env` based on `.env.template` and populate the variables
3. Download your slack export zip and extract it 
4. Move the directory to the root of the project and rename it to `.archive`
5. Run `npm run archive:import` to populate the database from the export jsons
6. Run the app with `npm run dev`

## Deployment

Just deploy as you would any nextjs app
