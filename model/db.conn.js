const mongoose = require('mongoose');
const config = require('../config/config');

const options = {
    user: config.dbuser,
    pass: config.dbpwd,
    authSource: config.authsourse,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.connection;
mongoose.connect(config.dbUrl, options);

// mongoose.connect("mongodb://localhost/details", options)

connection.on('error', (error) => console.log(error))

connection.once('open', () => console.log("Connected to DB successfuly"))

// var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/details');

// var connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {

//     connection.db.collection("details", function (err, collection) {
//         collection.find({}).toArray(function (err, data) {
//             console.log(data); // it will print your collection data
//         })
//     });

// });