const {
  STRING,
  INTEGER,
} = require('sequelize');
const { URL_LENGTH_LIMIT } = require('../../config');

module.exports = {
  name: 'redirect',
  options: {
    // Don't update timestamps
    silent: true,
    indexes: [
      { fields: ['hash'] },
      { fields: ['url'] },
    ],
  },
  schema: {
    hash: {
      type: STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: STRING(URL_LENGTH_LIMIT),
      allowNull: false,
    },
    timesGenerated: {
      type: INTEGER,
      defaultValue: 1,
    },
  },
};
