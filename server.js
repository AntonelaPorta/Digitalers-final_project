const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')
require('dotenv').config()
require("./config/passport")


const { dbConnection } = require('./config/database')
const { routerDev } = require('./routes/db')
const { routerPosts } = require('./routes/posts')
const { routerAuth } = require('./routes/auth')
const { routerCategory } = require('./routes/category')

// Inicializo la aplicación de express
const app = express()

//Conectar a la DB
dbConnection()

//Handlebars config
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./config/hbsHelpers') 
}))
app.set('view engine', 'hbs')
app.set('views', './views')

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.DB_REMOTE_URI})
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.todo_ok = req.flash('todo_ok')
    res.locals.todo_error = req.flash('todo_error')

    res.locals.user = req.user || null
    res.locals.userName = req.user ? req.user.name : null
    next()
})

// Routes
app.use('/', routerDev) //Solo para desarrollo
app.use('/', routerPosts)
app.use('/', routerAuth)
app.use('/', routerCategory)

app.use((req, res, next) => {
    res.status(404).render('404', {title: "Page Not Found"})
});

//Server
const PORT = process.env.PORT

app.listen(PORT, err => {
    if(err) throw new Error(`Ocurrió un problema con el servidor: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})