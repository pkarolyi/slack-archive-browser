#!/bin/sh
docker run --name "cppftw-archive-postgres" --rm -d -p "5432:5432" -e POSTGRES_PASSWORD=postgres -v ./.postgres-data:/var/lib/postgresql/data postgres