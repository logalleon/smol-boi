const {env: ENV} = process;

module.exports = {
  HOST: 'http://smol-boi.com',
  PORT: ENV.PORT || 1337,
  ROOT: __dirname,
  DB: {
    HOST: ENV.DB_HOST || 'localhost',
    PORT: ENV.DB_PORT || 3306,
    USER: ENV.DB_USER || 'root',
    PASS: ENV.DB_PASS || 'admin',
    DATABASE: ENV.DB_DATABASE || 'smol_boi',
    DIALECT: ENV.DB_DIALECT || 'mysql'
  },
  URL_LENGTH_LIMIT: 500,
  HASH_SIZE: 8,
  FOUR_OH_FOUR: '/not-found'
};
