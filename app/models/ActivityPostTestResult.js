const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const ActivityPostTestResult = sequelize.define('activity_post_test_result', {
    user_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    date_completed :DataTypes.DATE,
    is_active :DataTypes.INTEGER,
    is_completed:DataTypes.INTEGER,
    raw_data: DataTypes.STRING,
},{
    timestamps: false,
    tableName: 'activity_post_test_result'
});

module.exports = ActivityPostTestResult;

//     const questions = sequelize.define("activity_post_test_result", {
//         user_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//         },
//         activity_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//         },
//         question_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//         },
//         raw_data: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         }
//     },
//         {
//             timestamps: false
//         });
//     return questions;
// };