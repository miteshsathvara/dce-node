const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const model_has_roles = sequelize.define('model_has_roles', {
    role_id: {
        type: DataTypes.INTEGER,
    },
    model_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'model_has_roles',
        timestamps: false,
    });

module.exports = model_has_roles;