const Joi = require('joi');
const balance = require("../model/balance_schema");
const config = require('../config/config');
let user = process.env.user;


async function addUser() {
    try {
        let newAttempt = new balance({
            username: process.env.user,
            attempts: 1
        })
        return newAttempt.save();
    } catch (error) {
        console.log(error);

    }

}
async function isExists() {
    return balance.findOne({ username: process.env.user })
        .select({ username: 1, attempts: 1, _id: 0 })
        .lean()
}

async function updateInDB() {
    return balance.update({ username: process.env.user }, { $inc: { attempts: 1 } })
        .lean()
}

async function addAttempts() {
    let isExist = await isExists();
    if (!isExist) {
        await addUser()
    } else {
        await updateInDB()
    }
}



module.exports.isBalance = async function (request, res, next) {
    try {
        const schema = {
            "input": Joi.string().required()
        }
        const result = Joi.validate(request.body, schema);
        if (process.env.user == undefined) {
            res
                .status(400)
                .json({ error: [{ "description": "Please login first", "additionalInfo": "Please login first and then try" }] })

        } else if (result.error === null) {
            let answer = checkIsBalanced(request.body.input);
            await addAttempts();
            let data = await isExists();
            if (answer) {
                res
                    .status(200)
                    .json({ username: data.username, message: "Balanced", attempts: data.attempts })
            } else {
                res
                    .status(400)
                    .json({ username: data.username, message: "Not Balanced", attempts: data.attempts })
            }

        } else {
            res
                .status(400)
                .json({ "message": result.error.message })
        }


    } catch (error) {
        console.log(error);

    }

};

function checkIsBalanced(str) {
    try {
        let stack = [];

        let open = {
            '{': '}',
            '[': ']',
            '(': ')'
        };

        let closed = {
            '}': true,
            ']': true,
            ')': true
        }

        for (let i = 0; i < str.length; i++) {

            let char = str[i];

            if (open[char]) {
                stack.push(char);
            } else if (closed[char]) {
                if (open[stack.pop()] !== char) {
                    return false;
                }
            }
        }
        return true;
    } catch (error) {
        console.log(error);

    }

}