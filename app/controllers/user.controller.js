
const { Activity, ActivityPostTest, ActivityPostTestResult, User } = require('../models');
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
