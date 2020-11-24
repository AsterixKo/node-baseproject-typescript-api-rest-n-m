import data from './config/config.json';
import * as Sequelize from 'sequelize';

const username = data.development.username;
const password = data.development.password;
const db = data.development.database;

export const database = new Sequelize.Sequelize(db, username, password, {
    dialect: 'mysql',
    port: 3306
})

