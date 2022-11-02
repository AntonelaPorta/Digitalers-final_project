const Post = require('../models/posts')
const slugify = require('slugify')
const { formatDate } = require('../helpers/date')
const Category = require('../models/category')

/**
 * GET /
 *  Home page
 */

const getHome = async (req, res = response) => {
    try {
        const posts = await Post.find({}).sort({views: -1}).limit(4).lean()
        const categories = await Category.find({}).limit(5).lean()

        /*Funcion que acorta el body del post*/
        //TODO Convetir la funcion en una reutilizable
        posts.forEach(post => {
            post.shortBody = post.body.substring(0,300)
            post.updatedAt = formatDate(post.updatedAt)
        })

        res.status(200).render('home', 
            {
                title: `Blog Gastronómico - Home`,
                posts,
                categories
            }
        )
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}

/**
 * GET /posts
 *  All posts
 */
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1}).lean()
        const categories = await Category.find({}).lean()

        if(posts !== {}) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0,300)
                post.updatedAt = formatDate(post.updatedAt)
            })
        }

        res.status(200).render('post/posts', 
            {
                title: `Blog Gastronómico - Todos los Posts`,
                TemplateTitle: 'Todos los posts',
                posts,
                categories
            }
        )
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
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
    
        res.status(200).render('post/post',
            {
                title: `Blog Gastronómico - ${post.title}`,
                post
            }
        )

    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}

/**
 * GET /posts/new
 * Template form para crear un post
 */
const newPost = async (req, res) => {
    try {
        const categories = await Category.find({}).lean()

        res.status(200).render('post/new', {
            title: "Blog Gastronómico - Creando Post",
            categories
        })
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
   
}

/**
 * POST /posts
 * Crear un post
 */
const createPost = async (req, res) => {
    try {
        //console.log(req.body.body)
        
        let newPost = new Post(req.body)

        newPost.user = req.user.name

        const title = await Post.findOne({title: newPost.title})
        if( title ) {
            req.flash('todo_error', 'El titulo ya existe en nuestros registros') //TODO: terminar con los mensajes de alerta
            return res.status(400).redirect('/posts/new')
        }

        newPost = await newPost.save()

        res.redirect(`/posts/${newPost.slug}`)
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}

/**
 * GET /posts/edit/:id
 * Form para editar un post
 */
const showFormEditPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean()
        let categories = await Category.find({}).lean()

        res.render('post/edit', {
            title: 'Blog Gastronómico - Editando Post',
            post,
            categories
        })
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
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
        res.status(500).send(error.message || "Error Occurred")
    }
}

/**
 * DELETE /posts/:id
 * Eliminar post
 */
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.redirect(`/auth/${req.user.name}`)
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
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
        const categories = await Category.find({}).lean()

         /*Funcion que acorta el body del post*/
        if(posts !== []) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0,300)
                post.updatedAt = formatDate(post.updatedAt)
            })
        } 

        res.status(200).render('post/posts', 
            {
                title: `Blog Gastronómico - Search`,
                TemplateTitle: 'Search Posts',
                posts,
                categories
            }
        )
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
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
    searchPosts
}