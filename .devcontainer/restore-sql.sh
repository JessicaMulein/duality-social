#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
USAGE=0
for i in "$@"
do
case $i in
    --dbname=*)
    DBNAME="${i#*=}"
    shift # past argument=value
    ;;
    --help)
    USAGE=1
    ;;
esac
done

if [ -z "${DBNAME}" -o ${USAGE} -eq 1 ]; then
    echo "Usage: restore-sql.sh --dbname=<dbname>"
    exit 1
fi

PGPASSWORD="${KEYCLOAK_DB_PASSWORD}" pg_restore -h postgres -U "${KEYCLOAK_DB_USER}" -d "${DBNAME}" -1 "${SCRIPT_DIR}/${DBNAME}.tar"