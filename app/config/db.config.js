const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dce-exam', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;
// module.exports = {
//     HOST: "127.0.0.1",
//     port:'8889',
//     USER: "root",
//     PASSWORD: "root",
//     DB: "dce-exam",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };