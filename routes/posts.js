const express = require('express')
const { getPosts } = require('../controllers/posts')

const routerPosts = express.Router()

//Rutas de Post
routerPosts.get('/posts', getPosts)

module.exports = routerPosts