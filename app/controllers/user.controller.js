const db = require("../models");
const User = db.user;

exports.getUserExamDetail = async (req, res) => {
    console.log(req.userId);
    // User.findById(req.userId, function(err, user) {
    //     res.send(user);
    //  });
    return res.status(200).send({ message: req.userId});
}