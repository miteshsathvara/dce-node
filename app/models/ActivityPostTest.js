const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const ActivityPostTest = sequelize.define('activity_post_tests', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question: DataTypes.STRING,
    activity_id: DataTypes.INTEGER,
    order_no: DataTypes.INTEGER,
    answer: DataTypes.JSON,
    // Other fields
},{
    timestamps: false,
    tableName: 'activity_post_tests'
});

module.exports = ActivityPostTest;