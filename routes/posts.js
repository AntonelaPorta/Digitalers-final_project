const express = require('express')
const { getPosts, showPost,newPost, deletePost, createPost, editPost, showFormEditPost } = require('../controllers/posts')

const routerPosts = express.Router()

//Rutas de Post
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/new', newPost)
routerPosts.get('/posts/edit/:id', showFormEditPost) 
routerPosts.get('/posts/:slug', showPost)
routerPosts.post('/posts', createPost)
//routerPosts.put('/posts/:id', editPost)
routerPosts.delete('/posts/:id', deletePost)


module.exports = routerPosts