module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    banch_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    exam_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
    {
      timestamps: false
    });
  return User;
};