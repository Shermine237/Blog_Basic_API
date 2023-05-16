const express = require('express');  //  import express module
const mongoose = require('mongoose');
const body_parser = require('body-parser')  // use to parse request body json to js code

const app = express();   //  create new instance of express

const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');


const PORT = 4000;   //  choose port to run server
const database = 'mongodb://127.0.0.1:27017/blog_server';   //  database location

main().catch(err => console.log(err));  // run main and catch error


async function main()
{
    app.use(body_parser.json())
    // connect to database
    await mongoose.connect(database).then(() => console.log('Successfully connected'));

    // End point:
        // GET
    app.get('/', function(req, res){
        res.send('<h1>Home API</h1>\
                    <ul>\
                        <li><a href="/api/all">All posts</a></li>\
                        <li><a href="/api/single_post/6454158a7e4f3dd595f2d3a4">Single post</a></li>\
                    </ul>');
    });

    app.get('/api/all', function(req, res){
        Post.find()
                .then((posts) => res.send(posts))
                .catch((error) => res.status(400).send(error));
    });

    app.get('/api/single_post/:id', function(req, res){
        const id = req.params.id;   //  Get id from request link (parameter :id)
        Post.findOne({_id : id})
                .then((post) => res.send(post))
                .catch((error) => res.status(400).send(error));
    });

        // POST
    app.post('/api/add_post', async function(req, res){
        let {body} = req;   // take req's body
        let post = await Post.create(body)
            .then(() => res.send('Post created Successfully'))
            .catch((error) => res.status(400).send(error));
    })

    // start server
    app.listen(PORT, () => console.log(`Sample App listenning to port ${PORT} !`));
}

