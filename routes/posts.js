const express = require('express')
const { getPosts, showPost } = require('../controllers/posts')

const routerPosts = express.Router()

//Rutas de Post
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/:slug', showPost)

module.exports = routerPosts