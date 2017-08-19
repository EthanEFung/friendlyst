const Sequelize = require('sequelize')
const path = require('path')
const envPath = path.resolve(__dirname, './../../.env')
console.log(envPath, 'this is the path')
console.log(typeof envPath)

// require('dotenv').config({
//   path: envPath
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    idle: 1000
  }
});

db.authenticate()
  .then(() => console.log('Successfully connected to database!'))
  .catch(err => console.log(`Error connecting to database! ${err}`))

module.exports = db;