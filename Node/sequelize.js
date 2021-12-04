require('dotenv').config();
const process = require('process');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASEE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    omitNull: true,
});

module.exports = sequelize;

