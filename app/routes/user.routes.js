const controller = require("../controllers/user.controller");
const authJwt = require('../middleware/authJwt');

module.exports = function (app) {

    app.get('/getUserExamDetail',
        [
            [authJwt.verifyToken]
        ],
        controller.getUserExamDetail);

    app.get('/get_questions/:id',
        controller.getQuestions);

    
};