const db = require("../models");
const User = db.user;
const Questions = db.questions;

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
exports.getQuestions = async (req, res) => {
  console.log(req.params.id);
  var option = {
    limit: 50,
    offset: 0,
    where: { activity_id: req.params.id }
  };
  Questions.findAndCountAll(option).then(function (results) {
    console.log(results.rows.length);
    const q = [];
    for (let i = 0; i < results.rows.length; i++) {
      const obj = JSON.parse(results.rows[i].dataValues.answer);
      results.rows[i].dataValues.answer = obj;
      q.push(results.rows[i].dataValues);
    }
    res.status(200).send({
      message: "Success",
      data: q
    });
  });
}