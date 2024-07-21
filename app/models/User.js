const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const User = sequelize.define('users', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  banch_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exam_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exam_type: DataTypes.INTEGER,
},
  {
    timestamps: false,
    tableName: 'users'
  });

module.exports = User;