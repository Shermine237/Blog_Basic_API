/*  index.js is to make test */
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');

const database = 'mongodb://127.0.0.1:27017/blog_server';


main().catch(err => console.log(err));  // run main and catch error

async function main()
{
    await mongoose.connect(database).then(() => console.log('Successfully connected'));

    for (let i = 1; i < 6; i++)
    {
        await create_user(`User ${i}`, `user${i}`, `user${i}@mail.com`);
        await create_category(`Category ${i}`);
    }

    let users = await User.find().catch(err => console.log(err));
    let categories = await Category.find().catch(err => console.log(err));

    await create_post("titre1", "content", true, users[1], categories[1]);
    post1 = await Post.findOne().catch(err => console.log(err));
    let tags = post1.tags;
    tags.push("Tags 1");
    tags.push("Tags 2");
    post1.tags = tags;
    await post1.save();

    console.log(post1);
}


async function create_post(title_bg, content_bg, published_status, author_bg, category_bg=null, tags_bg=null)
{
    let slug_bg = slugify(title_bg);
    if(await exist_in_db(Post, 'slug', slug_bg))
        return

    let post = await Post.create({
        title: title_bg,
        slug: slug_bg,
        content: content_bg,
        published: published_status,
        author: author_bg,
        date_creation: new Date
    }).catch((error) => console.log(error));

    if (category_bg)
    {
        post.category = category_bg;
        await post.save()
    }
    if (tags_bg)
    {
        post.tags = tags_bg;
        await post.save()
    }

    return post;
}


async function create_user(name_usr, surname_usr, email_usr)
{
    if(await exist_in_db(User, 'surname', surname_usr))
        return

    let user = await User.create({
        name: name_usr,
        surname: surname_usr,
        email: email_usr
    }).catch((error) => console.log(error));
    return user;

}


async function create_category(name_cat)
{
    if(await exist_in_db(Category, 'name', name_cat))
        return

    let category = await Category.create({
        name: name_cat
    }).catch((error) => console.log(error));
    return category;
}


async function exist_in_db(model, field, value)
{
    let result = await model.exists({[field]: value});
    if(!result)
        return false

    console.log(`${field}: ${value} already exist`);
    return true
}


function slugify(string)
{
    return string.toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')
}
