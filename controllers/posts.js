const Post = require('../models/posts')
const slugify = require('slugify')
const { formatDate } = require('../helpers/date')
const { errorMonitor } = require('connect-mongo')

/**
 * GET /
 *  Home page
 */

const getHome = async (req, res = response) => {
    try {
        const posts = await Post.find({}).sort({views: -1}).limit(4).lean()

        /*Funcion que acorta el body del post*/
        //TODO Convetir la funcion en una reutilizable
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
            post.updatedAt = formatDate(post.updatedAt)
        })

        res.status(200).render('home', 
            {
                title: `Blog Gastronómico`,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

/**
 * GET /posts
 *  All posts
 */
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1}).lean()

        if(posts !== {}) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0,300)
                post.updatedAt = formatDate(post.updatedAt)
            })
        }

        res.status(200).render('posts', 
            {
                title: `Blog Gastronómico - Todos los Posts`,
                TemplateTitle: 'Todos los posts',
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

/**
 * GET /post/:slug
 *  One post
 */
const showPost = async (req, res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug}).lean()
    if (post === null) return res.redirect('/')

    post.updatedAt = formatDate(post.updatedAt)
    
    //Update views post
    await Post.findOneAndUpdate({slug: req.params.slug}, {views: ++post.views})
 
    res.render('post',
        {
            title: `Blog Gastronómico - ${post.title}`,
            post
        }
    )

    } catch (error) {
        console.log('Error Show')
    }
}

/**
 * GET /posts/user
 *  User log Post
 */
const getUserPosts = async (req, res) => {

    try {
        const user = req.user.name
        const posts = await Post.find({user: user}).sort({createdAt: -1}).lean()
        console.log(posts)

        /*Funcion que acorta el body del post*/
        if(posts !== []) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0,300)
                post.updatedAt = formatDate(post.updatedAt)
            })
        }

        res.status(200).render('userPosts', 
            {
                title: `Blog Gastronómico - Posts de ${user}`,
                posts,
                user
            }
        )
    } catch (error) {
        console.log(errorMonitor)
    }
}

/**
 * GET /posts/new
 * Template form para crear un post
 */
const newPost = (req, res) => {
    res.status(200).render('new', {
        title: "Blog Gastronómico - Creando Post"
    })
}

/**
 * POST /posts
 * Crear un post
 */
const createPost = async (req, res) => {
    try {
        let newPost = new Post()

        newPost.title = req.body.title
        newPost.body = req.body.body
        newPost.category = req.body.category
        newPost.image = req.body.image
        newPost.user = req.user.name

        newPost = await newPost.save()

        res.redirect(`/posts/${newPost.slug}`)
    } catch (error) {
        console.log('Error al crear un Post', error)
    }
}

/**
 * GET /posts/edit/:id
 * Form para editar un post
 */
const showFormEditPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean()

        res.render('edit', {
            title: 'Blog Gastronómico - Editando Post',
            post
        })
    } catch (error) {
        console.log('Show Edit Post', error)
    }
}

/**
 * PUT /posts/:id
 * Editar post
 */
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

/**
 * DELETE /posts/:id
 * Eliminar post
 */
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.redirect('/posts/user')
    } catch (error) {
        console.log('Error DELETE')
    }
}

/**
 * POST /posts/search
 * Busqueda de post en particular
 */
const searchPosts = async (req, res) => {
    try {
        const searchTerm =  req.body.searchTerm

        const posts = await Post.find( { $text: {$search: searchTerm}}).lean()

        res.status(200).render('posts', 
            {
                title: `Blog Gastronómico - Search`,
                TemplateTitle: 'Search Posts',
                posts
            }
        )
    } catch (error) {
        res.status(500).send({message: error.message} || "Error Occurred")
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
    getHome,
    getUserPosts,
    searchPosts
}