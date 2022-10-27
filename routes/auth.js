const express = require('express')
const { showAuthFormSignUp, signup, showAuthFormSignin, signin, logout } = require('../controllers/auth')
const routerAuth = express.Router()

//Router

routerAuth.get("/auth/signup", showAuthFormSignUp)
routerAuth.post("/auth/signup", signup)

routerAuth.get("/auth/signin", showAuthFormSignin)
routerAuth.post("/auth/signin", signin)
routerAuth.get("/auth/logout", logout)

module.exports = {
    routerAuth  
}

