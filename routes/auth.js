const express = require('express')
const { showAuthFormSignUp, signup, showAuthFormSignin, signin, logout, getUserPosts} = require('../controllers/auth')
const { isAuthenticated } = require('../middlewares/isauthenticated')
const routerAuth = express.Router()

//Router

routerAuth.get("/auth/signup", showAuthFormSignUp)
routerAuth.post("/auth/signup", signup)

routerAuth.get("/auth/signin", showAuthFormSignin)
routerAuth.post("/auth/signin", signin)
routerAuth.get("/auth/logout", isAuthenticated, logout)

routerAuth.get('/auth/:user', isAuthenticated, getUserPosts)

module.exports = {
    routerAuth  
}

