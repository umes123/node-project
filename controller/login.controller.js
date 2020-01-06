const login = require("../model/logIn_schema");
const config = require('../config/config');
const bcrypt = require("bcrypt");
const Joi = require('joi');
const jwt = require('jsonwebtoken');

module.exports.register = async function (req, res, next) {
    try {
        const schema = {
            "email": Joi.string().required(),
            "password": Joi.string().regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
            "DOB": Joi.string().required(),
            "username": Joi.string().required(),
            "role": Joi.string().valid('Admin', 'User').required()
        }
        const result = Joi.validate(req.body, schema);

        if (result.error === null) {
            let hashPassword = bcrypt.hashSync(req.body.password, config.saltRounds);
            let newRegister = new login({
                email: req.body.email,
                password: hashPassword,
                DOB: req.body.DOB,
                username: req.body.username,
                role: req.body.role
            })
            await newRegister.save((err, response) => {
                if (err) {
                    res
                        .status(500)
                        .json({ error: [{ "description": "Failed to register", "additionalInfo": err.errors || err.message }] })

                } else {
                    res
                        .status(200)
                        .json({ message: "Registerd successfuly" })
                }
            })
        } else {
            res
                .status(400)
                .json({ error: [{ "description": result.error.message, "additionalInfo": null }] })

        }
    } catch (error) {
        console.log(error);

    }
}

module.exports.login = async function (req, res, next) {
    try {

        const schema = {
            "password": Joi.string().required(),
            "username": Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error === null) {
            await login
                .findOne({ username: req.body.username }, (err, response) => {
                    if (err) {
                        res
                            .status(500)
                            .json({ error: [{ "description": "Unable to fetch Records from DB", "additionalInfo": null }] })

                    } else if (response) {
                        // let isUser = bcrypt.compareSync(req.body.email, response.email);
                        let isPwd = bcrypt.compareSync(req.body.password, response.password);
                        if (!isPwd) {
                            res
                                .status(404)
                                .json({ error: [{ "description": "Wrong Password", "additionalInfo": null }] })

                        } else {
                            process.env.user = response.username;
                            let token = jwt.sign({ _id: response.id, role: response.role }, config.secretKey);
                            res
                                .set({ 'access_token': token })
                                .status(200)
                                .json({ "token": token, message: "success" })
                        }
                    } else {
                        res
                            .status(404)
                            .json({ error: [{ "description": "User doesn't exist", "additionalInfo": "Please register" }] })
                    }
                })
        } else {
            res
                .status(400)
                .json({ error: [{ "description": result.error.message, "additionalInfo": null }] })

        }

    } catch (error) {
        console.log(error);

    }

};

async function getAllRecords() {
    return login
        .find({})
        .select({ _id: 0, __v: 0 })
        .lean()
}

module.exports.getAllUsers = async function (req, res, next) {
    try {
        let allUsers = await getAllRecords();

        if (allUsers.length === 0) {
            res
                .status(200)
                .json({ error: [{ "description": "No Records Found", "additionalInfo": "Currently there are no User records present" }] })
        } else {
            res
                .status(200)
                .json({ Users: allUsers })
        }

    } catch (error) {
        console.log(error);

    }

};

module.exports.removeUser = async function (req, res, next) {
    try {
        const schema = {
            "username": Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error === null) {
            let allUsers = await getAllRecords();
            if (allUsers.length === 0) {
                res
                    .status(500)
                    .json({ error: [{ "description": "User does not exist", "additionalInfo": "Not able to delete this user record as there is no record for this user is present in DataBase" }] })
            } else if (allUsers.length > 0) {
                await login.deleteOne({ username: req.body.username }, (err, response) => {
                    if (err) {
                        res
                            .status(500)
                            .json({ error: [{ "description": "Unable to remove User", "additionalInfo": null }] })
                    } else {
                        res
                            .status(200)
                            .json({ "message": "User removed successfuly" })
                    }
                })
            }
        } else {
            res
                .status(400)
                .json({ error: [{ "description": result.error.message, "additionalInfo": null }] })

        }
    } catch (error) {
        console.log(error);

    }

};
module.exports.removeAllRecords = async function (req, res, next) {
    await login.remove()
        .exec((err, response) => {
            if (err) {
                res
                    .status(500)
                    .json({ error: [{ "description": "Unable to delete allDocuments", "additionalInfo": null }] })
            } else {
                res
                    .status(200)
                    .json({
                        "message": "AllDocuments deleted successfuly"
                    })
            }
        });

};
