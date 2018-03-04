const Sequelize = require('sequelize');
const Redirect = require('./models/Redirect');
const Hit = require('./models/Hit');
const {DB} = require('../config');

const {Op: operatorsAliases} = Sequelize;

class DBConnection {

  constructor () {
    const options =  {
      host: DB.HOST,
      port: DB.PORT,
      dialect: DB.DIALECT,
      username: DB.USER,
      password: DB.PASS,
      database: DB.DATABASE,
      operatorsAliases,
      logging: false
    };
    const connection = new Sequelize(options);
    const R = connection.define(Redirect.name, Redirect.schema, Redirect.options);
    const H = connection.define(Hit.name, Hit.schema, Hit.options);
    H.belongsTo(R, { foreignKey: 'redirectHash', target: 'hash' });
    R.sync();
    H.sync();
    this.connection = connection;
  }

}
module.exports = DBConnection;
