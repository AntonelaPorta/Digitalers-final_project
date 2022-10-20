const express = require('express')
const routerDev = express.Router()
const Post = require('../models/posts')

//TODO: Llevar esto a un controlador
routerDev.get('/db/fresh', async (req, res = express.response) => {
    try {
        //usamos el modelo que creamos para generar la informacion en nuestra db
        const post = new Post() //creo el modelo de post para hacer la consulta

        const nuevoPost = {
            title: 'Post 1',
            body: 'Body del post1'
        }
        await post.save(nuevoPost)

        res.send('OK')
    } catch (error) {
        console.log(error)
    }
})

module.exports = routerDev