const Express = require('express');
const { join } = require('path');
const DBConnection = require('./server/DBConnection');
const router = require('./server/router');
const {
  PORT,
  ROOT,
} = require('./config');

const app = new Express();

const db = new DBConnection();
const { connection } = db;
app.locals.connection = connection;

app.use(Express.static(join(ROOT, 'public'), { extensions: ['html'] }));
app.use(Express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} . . .`);
});
