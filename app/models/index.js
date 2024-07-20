const Activity = require('../models/Activity.js');
const ActivityPostTest = require('../models/ActivityPostTest.js');
const ActivityPostTestResult = require('../models/ActivityPostTestResult.js');
const User = require('../models/User.js');


Activity.hasMany(ActivityPostTest, { foreignKey: 'activity_id' });
ActivityPostTest.belongsTo(Activity, { foreignKey: 'activity_id' });

ActivityPostTest.hasMany(ActivityPostTestResult, { foreignKey: 'question_id' });
ActivityPostTestResult.belongsTo(ActivityPostTest, { foreignKey: 'question_id' });

module.exports = {
    Activity,
    ActivityPostTest,
    ActivityPostTestResult,
    User
};
