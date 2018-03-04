const Express = require('express');
const DBConnection = require('./server/DBConnection');
const router = require('./server/router');
const {
  PORT
} = require('./config');

const app = new Express();

const db = new DBConnection();
const {connection} = db;
app.locals.connection = connection;

app.use(Express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} . . .`);
});