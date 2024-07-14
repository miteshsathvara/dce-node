const db = require("../models");
const User = db.user;

exports.getUserExamDetail = async (req, res) => {
  User.findByPk(req.userId)
    .then(data => {
      res.status(200).send({
        message: "Success",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + req.userId
      });
    });
}
exports.getQuestions= async (req, res) => {
  console.log(req.params.id);
  // User.findByPk(req.userId)
  //   .then(data => {
  //     res.status(200).send({
  //       message: "Success",
  //       data: data
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving User with id=" + req.userId
  //     });
  //   });
}