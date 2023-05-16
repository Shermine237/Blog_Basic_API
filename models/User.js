const mongoose = require('mongoose');


const {Schema, model} = mongoose;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        lowecase: true,
        required: true
    },
    email: String
});


const User = model('User', user_schema);    // 'User' will be the name (in lowercase in plurial) of the collection in data base

module.exports = User;    // Export data
