import { Sequelize } from 'sequelize';
import { environment } from '../environment';

export const sequelize = new Sequelize(environment.postgres.database, environment.postgres.user, environment.postgres.password, {
    host: environment.postgres.host,
    dialect: 'postgres', // Or the appropriate dialect for your database
});