const { DATE } = require('sequelize');

module.exports = {
  name: 'hit',
  options: {
    // Don't update timestamps
    silent: true
  },
  schema: {
    // Foreign Key RedirectHash
    createdAt: {
      type: DATE,
      allowNull: false
    }
  }
}