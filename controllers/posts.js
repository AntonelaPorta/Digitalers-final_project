const Posts = require('../models/posts')


//INDEX
const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find({}).lean()

        res.render('index', 
            {
                title: `Blog`,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//SHOW
const showPost = async (req, res) => {
    try {
        const post = await Posts.findOne({slug: req.params.slug}).lean()
    if (post === null) return res.redirect('/')

    res.render('show',
        {
            title: `Blog: ${post.title}`,
            post
        }
        )
    } catch (error) {
        console.log('Error Show')
    }
}

module.exports = {
    getPosts,
    showPost
}