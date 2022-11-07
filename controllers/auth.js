const passport = require("passport")
const Auth = require("../models/auth")
const Post = require('../models/posts')
const { validateAuth } = require('../validations/validateAuth')

const showAuthFormSignUp = (req, res) => {    
    res.status(200).render('auth/signup')
}

/* Register */
const signup = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body

        const errors = validateAuth({ name, email, password })

        if( errors.length > 0) {
            return res.render('auth/signup', {
                errors,
                name,
                email
            })
        }

        const userFound = await Auth.findOne({ name })
        if( userFound ) {
            req.flash('todo_error', 'El usuario ya existe en nuestros registros')
            return res.status(400).redirect('/auth/signup')
        }

        const emailFound = await Auth.findOne({ email })
        if( emailFound ) {
            req.flash('todo_error', 'El mail ya existe en nuestros registros')
            return res.status(400).redirect('/auth/signup')
        }

        const newUser = new Auth({ name, email, password })
        newUser.password = await newUser.passwordEncrypt(password)
        await newUser.save()

        //Mensaje de exito en la creacion de el usuario
        req.flash("todo_ok", "Se registro correctamente")

        res.redirect('/auth/signin')
    } catch (error) {
        res.status(500).send(error.message || "Server Error")
    }
    
}

const showAuthFormSignin = (req, res) => {
    if(!req.session.messages) return res.render('auth/signin')

    const errors = [req.session.messages[0]]
    req.session.messages = []
    return res.render('auth/signin', {
        errors
    })
}

const signin = passport.authenticate('local', {
    successRedirect: "/posts",
    failureRedirect: '/auth/signin',
    failureMessage: true,
    failureFlash: true,
})

const logout = async (req, res, next) => {    
    await req.logout((err) => {
        if(err) return next()
        res.redirect('/auth/signin')
    })
}

/**
 * GET /auth/user
 *  Obtener posts del usuario logueado
 */
 const getUserPosts = async (req, res) => {

    try {
        const user = req.params.user
        if(user !== req.user.name) return res.status(401).redirect('/')

        const posts = await Post.find({user: user}).sort({createdAt: -1}).lean()

        res.status(200).render('auth/userPosts', 
            {
                title: `Blog Gastronómico - Posts de ${user}`,
                posts,
                user
            }
        )
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}

module.exports = {
    showAuthFormSignUp,
    signup,
    showAuthFormSignin,
    signin,
    logout,
    getUserPosts
}