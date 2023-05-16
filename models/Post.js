const mongoose = require('mongoose');


const {Schema, SchemaTypes, model} = mongoose;

const post_schema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    date_creation: {
        type: Date,
        required: true
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'Category'
    },
    tags: [String],
    date_last_modification: Date,
    comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'Comment'
    }]
});

const Post = model('Post', post_schema);

module.exports = Post;
