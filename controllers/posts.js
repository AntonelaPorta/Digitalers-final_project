const Posts = require('../models/posts')

const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find({}).lean()

        //console.log(posts)
        const title = 'Listado de Post'

        res.render('index', 
            {
                title,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPosts
}