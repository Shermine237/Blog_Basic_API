const posts = []

for (let i = 0; i<10; i++)
{
    posts.push(
        {
            id : `${i}`,
            title: `Titre ${i}`,
            autor: "Autor",
            content: `Content ${i}`,
            category: "Category",
            date_create: "Date creation"
        }
    )
};

module.exports = posts  //  Export const post
