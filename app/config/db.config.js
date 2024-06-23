// const dotenv = require('dotenv');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: "127.0.0.1",
//     port: 8889,
//     database: "dce-exam",
//     user: "root",
//     password: "root"
// });

// connection.connect(err => {
//     if (err) throw err
//     return connection;
// });

module.exports = {
    HOST: "127.0.0.1",
    port:'3306',
    USER: "root",
    PASSWORD: "root",
    DB: "dce-exam",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };