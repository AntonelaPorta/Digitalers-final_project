const express = require('express')
const Posts = require('../models/posts')

const routerPosts = express.Router()

//Rutas de index
routerPosts.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find({})

        res.render('get', 
            {
                title,
                posts
            }
        )
    } catch (error) {
        console.log(error)
    }
})

module.exports = routerPosts