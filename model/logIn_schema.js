const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        match: [/\S+@\S+\.\S+/, 'emailId is invalid']
    },
    password: {
        type: String,
        require: true
    },
    DOB: {
        type: String,
        require: true,
        match: [/^\d{2}\/\d{2}\/\d{4}$/, "Invalid format of DOB"]
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true
    }
});
const model = mongoose.model('assignmentLogin', schema, 'assignmentLogin')
module.exports = model;