#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Creating Duality and Keycloak users"
echo "--------------------------------------------------"
echo "DUALITY_DB_NAME: ${DUALITY_DB_NAME}"
echo "DUALITY_DB_USER: ${DUALITY_DB_USER}"
echo "DUALITY_DB_PASSWORD: ${DUALITY_DB_PASSWORD}"
echo "KEYCLOAK_DB_NAME: ${KEYCLOAK_DB_NAME}"
echo "KEYCLOAK_DB_USER: ${KEYCLOAK_DB_USER}"
echo "KEYCLOAK_DB_PASSWORD: ${KEYCLOAK_DB_PASSWORD}"
echo ""

set -e

# Run the script as superuser
PGPASSWORD="${KEYCLOAK_DB_PASSWORD}" psql -h postgres -v ON_ERROR_STOP=1 --username "$KEYCLOAK_DB_USER" --dbname "$KEYCLOAK_DB_NAME" <<-EOSQL
  \set ON_ERROR_STOP off
  -- Try to create the duality database
  CREATE DATABASE ${DUALITY_DB_NAME};
  -- Try to create the duality user
  CREATE ROLE ${DUALITY_DB_USER} WITH LOGIN PASSWORD '${DUALITY_DB_PASSWORD}';
  \set ON_ERROR_STOP on
  -- Grant all privileges on the duality database to the duality user
  GRANT ALL PRIVILEGES ON DATABASE ${DUALITY_DB_NAME} TO ${DUALITY_DB_USER};
EOSQL