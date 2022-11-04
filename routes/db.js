const express = require('express')
const routerDev = express.Router()
const Post = require('../models/posts')
const { generatePost } = require('../helpers/posts')

//TODO: Llevar esto a un controlador
routerDev.get('/db/fresh', async (req, res = express.response) => {
    try {
        //delete All
        //const postsdelete = await Post.deleteMany()
        //console.log(postsdelete)

        //Count posts
        const posts = await Post.find({}).count()
        console.log(posts)

        //Create POST
        for (let i = 0; i < 80; i++) {
            const nuevoPost = generatePost()
            const post = new Post(nuevoPost)

            await post.save()
        }

        res.send('OK')
    } catch (error) {
        console.log(error)
        res.send('ERROR')
    }
})

module.exports = {
    routerDev
}