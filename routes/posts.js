const express = require('express')
const { getPosts, showPost,newPost, deletePost, editPost, createPost, showFormEditPost, getHome } = require('../controllers/posts')

const routerPosts = express.Router()

//Rutas de Post

routerPosts.get('/', getHome)

routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/new', newPost)
routerPosts.get('/posts/edit/:id', showFormEditPost) 
routerPosts.get('/posts/:slug', showPost)
routerPosts.post('/posts', createPost)

routerPosts.put('/posts/:id', editPost)
routerPosts.delete('/posts/:id', deletePost)


module.exports = {
    routerPosts
}