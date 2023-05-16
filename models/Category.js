const mongoose = require('mongoose');


const {Schema, model} = mongoose;

const category_schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Category = model('category', category_schema);

module.exports = Category;
