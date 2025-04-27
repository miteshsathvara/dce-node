const { Activity, ActivityPostTest, ActivityPostTestResult } = require('../models');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

exports.getQuestions = async (req, res) => {
    const activityId = req.params.id;
    const userId = req.userId;
    const option = {
        limit: 50,
        offset: 0,
        where: { activity_id: activityId }
    };

    try {
        const results = await ActivityPostTest.findAndCountAll(option);
        const questions = results.rows.map((row, index) => ({
            ...row.dataValues,
            answer: JSON.parse(row.dataValues.answer),
            index: index,
        }));

        // Fetch all attempted answers for the current user and activity
        const attemptedAnswers = await ActivityPostTestResult.findAll({
            where: {
                user_id: userId,
                activity_id: activityId,
                question_id: questions.map(q => q.id), // Get an array of question IDs
            },
        });

        const attemptedAnswersMap = new Map(
            attemptedAnswers.map(attempt => [attempt.question_id, attempt.raw_data])
        );

        const enhancedQuestions = questions.map(question => {
            const attemptedAnswer = attemptedAnswersMap.get(question.id);
            return {
                ...question,
                attempted: !!attemptedAnswer,
                attempted_answer: attemptedAnswer || "",
            };
        });

        const shuffledQuestions = shuffleArray(enhancedQuestions);
        res.status(200).send({
            message: "Success",
            data: shuffledQuestions
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send({ message: "Failed to fetch questions" });
    }
};
exports.attemptquiz = async (req, res) => {
   
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
