const express = require('express')
require('dotenv').config()
const { engine } = require('express-handlebars')
const methodOverride =  require('method-override')

const { dbConnection } = require('./databases/config')
const routerIndex = require('./routes/index')
const routerDev = require('./routes/db')
const routerPosts = require('./routes/posts')


const app = express()

//Conectar a la DB
dbConnection()

//Handlebars config
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

//Middlewares
//TODO ver mejorar la configuracion
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

//routes
app.use('/', routerIndex)
app.use('/', routerDev)
app.use('/', routerPosts)

//Server
const PORT = process.env.PORT || 8080

app.listen(PORT, err => {
    if(err) throw new Error(`Ocurrió un problema con el servidor: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})