const Post = require('../models/posts')
const slugify = require('slugify')
const { formatDate } = require('../helpers/date')
const Category = require('../models/category')
const fs = require('fs')
const { imageResize } = require('../helpers/imageResize')
const { validacionEditPost, validacionCreatePost } = require('../validations/validatePost')

/**
 * GET /
 *  Home page
 */

const getHome = async (req, res = response) => {
    try {
        const posts = await Post.find({}).sort({ views: -1 }).limit(4).lean()
        const categories = await Category.find({}).limit(5).lean()

        /*Funcion que acorta el body del post*/
        //TODO Convetir la funcion en una reutilizable
        posts.forEach(post => {
            post.shortBody = post.body.substring(0, 300)
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
        const posts = await Post.find({}).sort({ createdAt: -1 }).lean()
        const categories = await Category.find({}).lean()

        if (posts !== {}) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0, 300)
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
        const post = await Post.findOne({ slug: req.params.slug }).lean()
        if (post === null) return res.redirect('/')

        post.updatedAt = formatDate(post.updatedAt)

        //Update views post
        await Post.findOneAndUpdate({ slug: req.params.slug }, { views: ++post.views })

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
        console.log(categories)

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
        const categories = await Category.find({}).lean()

        newPost.image = req.file ? req.file.filename : null

        const { title, body, category, image } = newPost
        console.log(req.file)

        //Validacion de datos
        const errors = validacionCreatePost({ title, body, category, image })
        if (errors) {
            //Borrar imagen si create no tiene exito
            if (req.file) {
                await fs.promises.unlink(req.file.path)
            }

            return res.status(400).render('post/new', {
                errors,
                post: {
                    title: newPost.title,
                    body: newPost.body,
                    category: newPost.category,
                },
                categories
            })
        }

        //Resize imagen y borrado de la anterior 
        if (req.file) {
            const imageName = await imageResize(req.file)

            newPost.image = `/uploads/${imageName}`
        }

        newPost.user = req.user.name

        const titleExists = await Post.findOne({ title: newPost.title })
        if (titleExists) {
            req.flash('todo_error', 'El titulo ya existe en nuestros registros')
            return res.status(400).redirect('/posts/new')
        }

        newPost = await newPost.save()

        req.flash("todo_ok", "Se creo el post correctamente")

        res.status(200).redirect(`/posts/${newPost.slug}`)
    } catch (error) {
        console.log(error)
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
        const categories = await Category.find({}).lean()

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
        }

        req.file ? image = req.file.filename : image = ".jpg"

        //Validacion de datos
        const errors = validacionCreatePost({ ...updatedPost, image })
        console.log(req.file)

        if (errors) {
            //File system borrar imagen
            if (req.file) {
                await fs.promises.unlink(req.file.path)
            }

            return res.status(400).render('post/edit', {
                errors,
                post: { ...updatedPost, _id: id }
            })
        }

        //Resize imagen y borrado de la anterior 
        if (req.file) {
            //Resize imagen y guardamos el nombre en el objeto post
            const imageName = await imageResize(req.file)
            updatedPost.image = `/uploads/${imageName}`

            //File system borrar imagen del post antiguo
            const post = await Post.findById(req.params.id)
            const path = `./public${post.image}`
            if (fs.existsSync(path)) {
                await fs.promises.unlink(`${path}`)
            }
        }

        //Actualizo el slug
        updatedPost.slug = slugify(req.body.title, { lower: true, strict: true })

        await Post.findByIdAndUpdate(id, updatedPost, { new: true })

        req.flash("todo_ok", "Se edito el post correctamente")

        res.status(200).redirect(`/posts/${updatedPost.slug}`)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || "Error Occurred")
    }
}

/**
 * DELETE /posts/:id
 * Eliminar post
 */
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //File system borrar imagen
        const path = `./public${post.image}`
        if (fs.existsSync(path)) {
            await fs.promises.unlink(`${path}`)
        }

        await Post.deleteOne(post)
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
        const searchTerm = req.body.searchTerm

        const posts = await Post.find({ $text: { $search: searchTerm } }).lean()
        const categories = await Category.find({}).lean()

        
        if (posts.length === 0) {
            return res.status(400).render('post/posts',
                {
                    title: `Blog Gastronómico - Search`,
                    TemplateTitle: 'Search Posts',
                    message: `No se encontro ningun resultado que contenga: ${searchTerm}`,
                    posts,
                    categories
                }
            )
        }

        /*Funcion que acorta el body del post*/
        if (posts !== []) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0, 300)
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