
const { Activity, ActivityPostTest, ActivityPostTestResult, User } = require('../models');
exports.getUserExamDetail = async (req, res) => {
  const option = {
    limit: 1,
    offset: 0,
    where: { id: req.userId },
    include: [{
      model: Activity,
      required: true, // Use `false` to perform a LEFT OUTER JOIN instead of INNER JOIN
    }],
  };
  const users = await User.findOne(option);
  res.status(200).send({
    message: "Success",
    data: users
  });

}
