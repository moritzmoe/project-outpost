const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./config/database');

require('./config/associations');

const path = '/app/dist';

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Item routes
app.use('/api/items', require('./routes/items'));

// Authentication/Registration routes
app.use('/api/auth', require('./routes/auth'));

// User Management routes
app.use('/api/users', require('./routes/users'));

// Category Routes
app.use('/api/categories', require('./routes/categories'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path));
  app.get('*', (req, res) => {
    res.sendFile(`${path}/index.html`);
  });
}

const server = app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));

process.on('SIGINT', () => {
  server.close();
  console.log('Kill Express Server');
  process.exit(0);
});
