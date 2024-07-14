module.exports = (sequelize, Sequelize) => {
    const questions = sequelize.define("activity_post_tests", {
        activity_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        question: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        order_no: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
        {
            timestamps: false
        });
    return questions;
};