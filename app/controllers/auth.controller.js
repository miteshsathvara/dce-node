// SignUp 
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const session = require('express-session')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    // Save User to database
    try {
        console.log(req.body)
        const { first_name, last_name, password, mobile_number, banch_time, exam_type } = req.body;
        if (!first_name || !last_name || !password || !mobile_number || !banch_time || !exam_type) {
            res.status(400)
                .json({ error: "fields cannot be empty!" });
            return;
        }
        // User Create
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            banch_time: req.body.banch_time,
            exam_type: req.body.exam_type,
            password: bcrypt.hashSync(req.body.password, 8),
            create_at: null,
            update_at: null,
        });
        if (user) res.send({ message: "User Created Successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}
exports.login = async (req, res) => {
     console.log(req.body)
    // Save User to database
    try {
        const user = await User.findOne({
            where: {
                mobile_number: req.body.username
            }
        });

        if (!user) {
            return res.status(404).send({ 
                status : 'Failed',
                message: "User Not Found."
             })
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ 
                status : 'Failed',
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
            status : 'Success',
            message : 'Logged in Successfully.',
            id: user.id,
            mobile_number: user.mobile_number,
            token: jsontoken
        })

    } catch (error) {
        res.status(500).send({ 
            status : 'Failed',
            message: error.message
         });
    }

}

exports.logout = async (req, res) => {
    // console.log(req.session);
    try {
        res.clearCookie("token");
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
}