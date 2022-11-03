const express = require('express')
const { getPosts, showPost,newPost, deletePost, editPost, createPost, showFormEditPost, getHome, searchPosts } = require('../controllers/posts')


const routerPosts = express.Router()
const { isAuthenticated } = require("../middlewares/isauthenticated")
const uploadImage = require('../middlewares/uploadImages')

//Rutas de Post

routerPosts.get('/', getHome)

routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/new', isAuthenticated, newPost)
routerPosts.get('/posts/search', searchPosts) // TODO: ver donde poner path

routerPosts.get('/posts/edit/:id', isAuthenticated, showFormEditPost) 
routerPosts.get('/posts/:slug', showPost)

routerPosts.post('/posts', isAuthenticated, uploadImage, createPost)
routerPosts.put('/posts/:id', isAuthenticated, uploadImage, editPost)
routerPosts.delete('/posts/:id', isAuthenticated, deletePost)



module.exports = {
    routerPosts
}