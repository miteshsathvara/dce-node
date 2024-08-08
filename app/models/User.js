const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middle_name: {
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
  exam_date: {
    type: DataTypes.DATEONLY, // Use DATEONLY if you only care about the date without time
    allowNull: true, // Change to false if the date is required
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
  created_at: {
    type: DataTypes.DATE, // Stores both date and time
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically sets the current date and time
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically sets the current date and time
  }
},
  {
    tableName: 'users',
    timestamps: false,
  });

module.exports = User;