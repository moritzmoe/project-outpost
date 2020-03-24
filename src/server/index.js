const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/database');


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

// Item routes
app.use('/api/items', require('./routes/items'));

// Authentication/Registration routes
app.use('/api/auth', require('./routes/auth'));


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join('dist')));// Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join('dist', 'index.html'));
  });
}

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
