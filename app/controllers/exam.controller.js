const { Activity, ActivityPostTest, ActivityPostTestResult } = require('../models');

exports.getQuestions = async (req, res) => {
    console.log(req.params.id);
    var option = {
        limit: 50,
        offset: 0,
        where: { activity_id: req.params.id }
    };
    ActivityPostTest.findAndCountAll(option).then(async function (results) {
        console.log(results.rows.length);
        const q = [];
        for (let i = 0; i < results.rows.length; i++) {
            const obj = JSON.parse(results.rows[i].dataValues.answer);
            results.rows[i].dataValues.answer = obj;
            q.push(results.rows[i].dataValues);

            // get attempted answer
            attemptedanswerExist = await ActivityPostTestResult.findOne({
                where: {
                    user_id: req.userId,
                    activity_id: results.rows[i].dataValues.activity_id,
                    question_id: results.rows[i].dataValues.id
                }
            });

            if (!attemptedanswerExist?.dataValues?.raw_data) {
                results.rows[i].dataValues.attempted = false;
                results.rows[i].dataValues.attempted_answer = "";
            } else {
                results.rows[i].dataValues.attempted = true;
                results.rows[i].dataValues.attempted_answer = attemptedanswerExist?.dataValues?.raw_data;
            }
        }
        res.status(200).send({
            message: "Success",
            data: q
        });
    });
}
exports.attemptquiz = async (req, res) => {
    console.log('user_id', req.userId);
    const data = await Activity.findByPk(req.params.id);

    if (!data) {
        return res.status(404).send({ msg: "'Activity not found' " });
    }

    let postTest = await ActivityPostTest.findAll({ where: { activity_id: req.params.id, id: req.body.question_id }, order: [['order_no', 'ASC']] });
    const result_for_question = [];
    postTest.forEach(function (question) {

        const keysArray = JSON.parse(question.answer);
        let attemptedanswer = req.body.answer;

        const right_side = keysArray.filter(value => value.answer && value.answer[0] === '1').map(value => value.options);
        const right_option = right_side.length > 0 ? right_side[0] : '';
        if (attemptedanswer !== right_option) {
            result_for_question.push({
                question_id: question.id,
                activity_id: question.activity_id,
                answer: attemptedanswer,
                is_correct: 0,
                correct_answers: 0
            });
        } else {
            result_for_question.push({
                question_id: question.id,
                activity_id: question.activity_id,
                answer: attemptedanswer,
                is_correct: 1,
                correct_answers: 1
            });
        }
    });

    for (let answer of result_for_question) {

        attemptedanswerExist = await ActivityPostTestResult.findOne({
            where: {
                user_id: req.userId,
                activity_id: answer.activity_id,
                question_id: answer.question_id
            }
        });
        if (!attemptedanswerExist) {
            await ActivityPostTestResult.create({
                user_id: req.userId,
                activity_id: answer.activity_id,
                question_id: answer.question_id,
                score: answer.correct_answers,
                date_completed: new Date(),
                is_active: true,
                is_completed: true,
                raw_data: answer.answer
            });
        } else {
            // update record
            await ActivityPostTestResult.update(
                {
                    user_id: req.userId,
                    activity_id: answer.activity_id,
                    question_id: answer.question_id,
                    score: answer.correct_answers,
                    date_completed: new Date(),
                    is_active: true,
                    is_completed: true,
                    raw_data: answer.answer
                },
                {
                    where: {
                        user_id: req.userId,
                        activity_id: answer.activity_id,
                        question_id: answer.question_id,
                    },
                },
            );
        }
    }
    return res.status(200).send({ status: "Success", data: "Answer Save Successfully." });
}