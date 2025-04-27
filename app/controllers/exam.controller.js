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
    const activityId = req.params.id;
    const userId = req.userId;
    const questionId = req.body.question_id;
    const attemptedAnswer = req.body.answer;

    try {
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).send({ msg: "Activity not found" });
        }

        const question = await ActivityPostTest.findOne({
            where: { activity_id: activityId, id: questionId },
            order: [['order_no', 'ASC']],
        });

        if (!question) {
            return res.status(404).send({ msg: "Question not found for this activity" });
        }

        const keysArray = JSON.parse(question.answer);
        const rightSide = keysArray
            .filter(value => value.answer && value.answer[0] === '1')
            .map(value => value.options);
        const rightOption = rightSide.length > 0 ? rightSide[0] : '';
        const isCorrect = attemptedAnswer === rightOption ? 1 : 0;

        const resultData = {
            user_id: userId,
            activity_id: activityId,
            question_id: questionId,
            score: isCorrect,
            date_completed: new Date(),
            is_active: true,
            is_completed: true,
            raw_data: attemptedAnswer,
        };

        const [attemptedAnswerExist, created] = await ActivityPostTestResult.upsert(
            resultData,
            {
                where: {
                    user_id: userId,
                    activity_id: activityId,
                    question_id: questionId,
                },
            }
        );

        return res.status(200).send({ status: "Success", data: "Answer Saved Successfully." });

    } catch (error) {
        console.error("Error attempting quiz:", error);
        return res.status(500).send({ msg: "Failed to save answer." });
    }
};
