const Posts = require('../models/posts')

//Home
const getPostsHome = async (req, res = response) => {
    try {
        const limitNumber = 4
        const posts = await Posts.find({}).sort().limit(limitNumber).lean()

        res.status(200).render('home', 
            {
                title: `Blog - All Posts`,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//INDEX - POSTS
const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find({}).lean()
        
        /*Funcion que acorta el body del post*/
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
        })

        res.status(200).render('posts', 
            {
                title: `Blog - All Posts`,
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

    res.render('post',
        {
            title: `Blog: ${post.title}`,
            post
        }
        )
    } catch (error) {
        console.log('Error Show')
    }
}

//newPost
const newPost = (req, res) => {
    res.status(200).render('new')
}

//Create
const createPost = async (req, res) => {
    try {

        const newPost = new Posts()

        newPost = {
            title: req.body.title,
            body: req.body.body
        }

        await newPost.save()

        res.redirect(`/posts/${post.slug}`)
    } catch (error) {
        console.log('Error al crear un Post')
    }
}

//show Form Post to edit 

const showFormEditPost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        console.log(post)

        res.render('edit', {
            title: 'Editando Post',
            post
        })
    } catch (error) {
        console.log('Show Edit Post', error)
    }
}

//Delete
const deletePost = async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id)

        res.redirect('/posts')
    } catch (error) {
        console.log('Error Show')
    }
}

module.exports = {
    getPosts,
    showPost,
    deletePost,
    createPost,
    newPost,
    showFormEditPost,
    getPostsHome
}