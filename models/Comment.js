const mongoose = require('mongoose');


const {Schema, SchemaTypes, model} = mongoose;

const comment_schema = new Schema({
   author: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
   },
   comment_content: {
    type: String,
    required: true
   },
   rate: Number
});

const Comment = model('Comment', comment_schema);

module.exports = Comment
