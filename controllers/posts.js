const Post = require('../models/posts')
const slugify = require('slugify')
const { formatDate } = require('../helpers/date')

//Home Page
const getHome = async (req, res = response) => {
    try {
        const posts = await Post.find({}).sort({views: -1}).limit(4).lean()

        /*Funcion que acorta el body del post*/
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
            post.updatedAt = formatDate(post.updatedAt)
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
        const posts = await Post.find({}).sort({updatedAt: -1}).lean()
        
        /*Funcion que acorta el body del post*/
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
            post.updatedAt = formatDate(post.updatedAt)
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

    post.updatedAt = formatDate(post.updatedAt)
    
    //Update views post
    await Post.findOneAndUpdate({slug: req.params.slug}, {views: ++post.views})
 
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

        newPost.title = req.body.title
        newPost.body = req.body.body
        newPost.category = req.body.category
        newPost.image = req.body.image
        newPost.userName = "User" //TODO ver usuario del signin

        newPost = await newPost.save()

        res.redirect(`/posts/${newPost.slug}`)
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

        const updatedPost = {
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            image: req.body.image,
            slug: slugify(req.body.title, {lower: true, strict: true})
        }

        await Post.findByIdAndUpdate(id, updatedPost, { new: true })

        res.redirect(`/posts/${updatedPost.slug}`)
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