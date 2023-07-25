const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const Sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// Assuming Heroku provides a DATABASE_URL environment variable
const { DATABASE_URL } = process.env;

// Update the Sequelize constructor with the correct database URL
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'mysql', // or any other supported database dialect
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // If using SSL, set this to false
    }
  }
});

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
