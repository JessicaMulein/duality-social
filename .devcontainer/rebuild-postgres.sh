#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if [ ! -f "${SCRIPT_DIR}/keycloak.tar" ]; then
    echo "No backup file found. Run backup-sql.sh first."
    exit 1
fi
set -e
docker-compose -f .devcontainer/docker-compose.yml stop postgres
docker-compose -f .devcontainer/docker-compose.yml rm -f postgres
docker volume rm -f duality-social_devcontainer_postgres_data
docker-compose -f .devcontainer/docker-compose.yml build postgres
docker-compose -f .devcontainer/docker-compose.yml up -d postgres

# wait until the database is up
until docker-compose -f .devcontainer/docker-compose.yml exec postgres pg_isready; do
    echo "Waiting for postgres..."
    sleep 1
done