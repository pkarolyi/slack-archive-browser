#!/bin/sh
docker run --name "slack-archive-postgres" --rm -d -p "5432:5432" -e POSTGRES_PASSWORD=postgres -v ./.postgres-data:/var/lib/postgresql/data postgres
