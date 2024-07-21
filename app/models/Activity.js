const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Activity = sequelize.define('activities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    // Other fields
},{
    timestamps: false,
    tableName: 'activities'
});

module.exports = Activity;