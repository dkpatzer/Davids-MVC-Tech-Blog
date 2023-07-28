require('dotenv').config();
const Sequelize = require('sequelize');


let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql', // Specify the dialect here as a string
    port: 3306 // Set the port to 3306 for MySQL
  });
}

module.exports = sequelize;



