const Post = require('../models/posts')

//Home Page
const getHome = async (req, res = response) => {
    try {
        const limitNumber = 4
        const posts = await Post.find({}).sort().limit(limitNumber).lean()

        /*Funcion que acorta el body del post*/
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
        })

        res.status(200).render('home', 
            {
                title: `Blog - All Post`,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//INDEX - GET all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).lean()
        
        /*Funcion que acorta el body del post*/
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
        })

        res.status(200).render('posts', 
            {
                title: `Blog - All Post`,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//SHOW - GET one post
const showPost = async (req, res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug}).lean()
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

//GET Template form para crear un post
const newPost = (req, res) => {
    res.status(200).render('new')
}

//POST crear un post
const createPost = async (req, res) => {
    try {

        const newPost = new Post()

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

//GET Form para editar un post
const showFormEditPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean()

        res.render('edit', {
            title: 'Editando Post',
            post
        })
    } catch (error) {
        console.log('Show Edit Post', error)
    }
}

//EDIT
const editPost = async (req, res) => {
    try {
        const id = req.params.id

        const updatedResult = await Post.findByIdAndUpdate(id, req.body, { new: true })

        res.redirect(`/posts/${updatedResult.slug}`)
    } catch (error) {
        console.log('Error EDIT')
    }
}

//DELETE
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.redirect('/posts')
    } catch (error) {
        console.log('Error DELETE')
    }
}

module.exports = {
    getPosts,
    showPost,
    deletePost,
    editPost,
    createPost,
    newPost,
    showFormEditPost,
    getHome
}