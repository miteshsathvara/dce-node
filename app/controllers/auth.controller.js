// SignUp 
const config = require("../config/auth.config");
const { User } = require('../models');
const session = require('express-session')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Activity } = require('../models');
const dayjs = require('dayjs');


exports.register = async (req, res) => {
    // Save User to database
    try {

        const { first_name, last_name, password, mobile_number, banch_time, exam_type, middle_name } = req.body.formData;
        if (!first_name || !last_name || !middle_name || !password || !mobile_number || !banch_time || !exam_type) {
            res.status(400)
                .json({ error: "fields cannot be empty!" });
            return;
        }
        // User Create
        const currentDate = dayjs().format('YYYY-MM-DD');
        const user = await User.create({
            first_name: req.body.formData.first_name,
            last_name: req.body.formData.last_name,
            middle_name: req.body.formData.middle_name,
            mobile_number: req.body.formData.mobile_number,
            banch_time: req.body.formData.banch_time,
            exam_type: req.body.formData.exam_type,
            exam_date: currentDate,
            password: bcrypt.hashSync(req.body.formData.password, 8),
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });
        if (user) {
            return res.status(200).send({
                status: 'Success',
                message: 'Registration Successfully.',
            })
        };
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        });
    }

}
exports.login = async (req, res) => {

    // Save User to database
    try {
        const user = await User.findOne({
            where: {
                mobile_number: req.body.username,

            },
            order: [
                ['id', 'DESC']
            ]
        });

        if (!user) {
            return res.status(404).send({
                status: 'Failed',
                message: "User Not Found."
            })
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                status: 'Failed',
                message: "Username or Password Invalid."
            });
        }

        const token = jwt.sign(
            { id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            }
        );
        // Set Token In cookies
        const jsontoken = jwt.sign({ id: user.id }, config.secret, { expiresIn: '300m' });
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) }); //we add secure: true, when using https.
        return res.status(200).send({
            status: 'Success',
            message: 'Logged in Successfully.',
            id: user.id,
            mobile_number: user.mobile_number,
            token: jsontoken
        })

    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        });
    }

}

exports.logout = async (req, res) => {

    try {
        res.clearCookie("token");
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
}
exports.activitytype = async (req, res) => {

    try {
        var option = {
            limit: 50,
            offset: 0,
        };
        Activity.findAndCountAll(option).then(async function (results) {
            console.log(results.rows);
            res.status(200).send({
                message: "Success",
                data: results.rows
            });
        });
    } catch (err) {
        this.next(err);
    }
}