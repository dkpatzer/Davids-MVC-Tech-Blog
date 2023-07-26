const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize('mysql://smftij9ftnaxth8t:w96blpklbxpafzf5@acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/eyip5gvm17ijvpah', {
    host: 'localhost',
    dialect: 'mysql', // Specify the dialect here as a string
    port: ''
  });
}

module.exports = sequelize;


