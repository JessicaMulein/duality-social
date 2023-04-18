#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if [ -d "${SCRIPT_DIR}/../.vscode" -a -f "${SCRIPT_DIR}/../.vscode/settings.json" ]; then
    echo "settings.json already exists"
    exit 0
elif [ ! -d "${SCRIPT_DIR}/../.vscode" ]; then
    mkdir "${SCRIPT_DIR}/../.vscode"
fi
echo "Creating settings.json"
cat << EOF > "${SCRIPT_DIR}/../.vscode/settings.json"
{
    "sqltools.connections": [
        {
            "previewLimit": 50,
            "server": "postgres",
            "port": 5432,
            "driver": "PostgreSQL",
            "name": "duality-dev",
            "database": "${DUALITY_DB_NAME}",
            "username": "${DUALITY_DB_USER}",
            "password": "${DUALITY_DB_PASSWORD}"
        },
        {
            "previewLimit": 50,
            "server": "postgres",
            "port": 5432,
            "driver": "PostgreSQL",
            "name": "duality-keycloak-dev",
            "database": "${KEYCLOAK_DB_NAME}",
            "username": "${KEYCLOAK_DB_USER}",
            "password": "${KEYCLOAK_DB_PASSWORD}"
        }
    ]
}
EOF