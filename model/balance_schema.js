const mongoose = require("mongoose");


const schema = mongoose.Schema({

    username: {
        type: String,
        require: true,
        unique: true
    },
    attempts: {
        type: Number,
        require: true
    }
});
const model = mongoose.model('isBalance', schema, 'isBalance')
module.exports = model;