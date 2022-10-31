const express = require('express')
const { getPosts, showPost,newPost, deletePost, editPost, createPost, showFormEditPost, getHome, getUserPosts, searchPosts } = require('../controllers/posts')


const routerPosts = express.Router()
const { isAuthenticated } = require("../middlewares/isauthenticated")

//Rutas de Post

routerPosts.get('/', getHome)

routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/:slug', showPost)

routerPosts.get('/posts/new', isAuthenticated, newPost)
routerPosts.get('/posts/edit/:id', isAuthenticated, showFormEditPost) 

routerPosts.post('/posts', isAuthenticated, createPost)
routerPosts.put('/posts/:id', isAuthenticated, editPost)
routerPosts.delete('/posts/:id', isAuthenticated, deletePost)

routerPosts.get("/posts/user" ,isAuthenticated, getUserPosts) // TODO: ver donde poner path
routerPosts.post("/posts/search", searchPosts) // TODO: ver donde poner path

module.exports = {
    routerPosts
}