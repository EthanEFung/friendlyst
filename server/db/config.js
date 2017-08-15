const Sequelize = require('sequelize');
const path = require('path');
const envPath = path.resolve(__dirname, './../../.env');

require('dotenv').config({
  path: envPath
});

const db = new Sequelize('postgres://fyqybcwx:EhumIvf0vaVSJpLPpsVBMp0GrgOk2yei@pellefant.db.elephantsql.com:5432/fyqybcwx', {
  dialect: 'postgres',
  pool: {
    max: 3,
    min: 0,
    idle: 1000
  }
});

db.authenticate()
  .then(() => console.log('Successfully connected to database!'))
  .catch(err => console.log(`Error connecting to database! ${err}`))

module.exports = db;