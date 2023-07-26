const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize('davids_mvc_tech_blog', 'root', 'Password1', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3006,
  });
}

module.exports = sequelize;


