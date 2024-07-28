const controller = require("../controllers/user.controller");
const examController = require("../controllers/exam.controller");
const authJwt = require('../middleware/authJwt');

module.exports = function (app) {

    

    app.get('/getUserExamDetail',
        [
            [authJwt.verifyToken]
        ],
        controller.getUserExamDetail);

    app.get('/get_questions/:id',
        [
            [authJwt.verifyToken]
        ],
        examController.getQuestions);
    app.post('/attemptquiz/:id',
        [
            [authJwt.verifyToken]
        ],
        examController.attemptquiz);
    

};