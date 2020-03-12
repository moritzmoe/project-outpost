const Sequelize = require('sequelize');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('postgres', 'postgres', 'my_pass', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const { Model } = Sequelize;

class Account extends Model {}
Account.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
},
{
  sequelize,
  modelName: 'account'
});

sequelize.sync();

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/api/auth', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  if (username && password) {
    Account.findAll({
      where: {
        username,
        password
      }
    }).then((results) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.send('success');
      } else {
        res.send('incorrect');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

Account.findAll({
  where: {
    username: 'mortz',
    password: 'pass'
  }
}).then(accounts => console.log(JSON.stringify(accounts, null, 4)));


app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
