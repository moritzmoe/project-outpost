const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = '/app/dist';

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/items', require('./routes/items'));
app.use('/api/origins', require('./routes/origins'));
app.use('/api/packaging', require('./routes/packaging'));
app.use('/api/purchases', require('./routes/purchases'));
app.use('/api/users', require('./routes/users'));

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
