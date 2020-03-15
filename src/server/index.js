const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');

const User = require('./models/user');

const withAuth = require('./middleware');

const app = express();
const secret = 'mysecret';

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

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.create({
    password,
    email
  });
  res.send('registered');
});

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (user === null) {
      res.status(401).json({ error: 'Invalid username' });
    } else if (!user.validPassword(password)) {
      res.status(401).json({ error: 'Invalid password' });
    } else {
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
});

app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'dist')));// Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.get('/some-route', (req, res) => { res.send('hello'); });

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
