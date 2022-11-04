const passport = require("passport")
const Auth = require("../models/auth")
const Post = require('../models/posts')

const { formatDate } = require('../helpers/date')

const showAuthFormSignUp = (req, res) => {    
    res.status(200).render('auth/signup')
}

/* Register */
const signup = async (req, res) => {
    try {
        const errors = []    
        const { name, email, password, confirm_password } = req.body

        if( password.length < 4) {
            errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres'})
        }

        if( password !== confirm_password) {
            errors.push({ msg: 'La contraseña no machea'})
        }

        if( errors.length > 0) {
            return res.render('auth/signup', {
                errors,
                name,
                email
            })
        }

        const userFound = await Auth.findOne({ email })
        if( userFound ) {
            req.flash('todo_error', 'El mail ya existe en nuestros registros') //TODO: terminar con los mensajes de alerta
            return res.status(400).redirect('/auth/signup')
        }

        const newUser = new Auth({ name, email, password })
        newUser.password = await newUser.passwordEncrypt(password)
        await newUser.save()

        //Mensaje de exito en la creacion de el usuario
        req.flash("todo_ok", "Se registro correctamente")

        res.redirect('/auth/signin')
    } catch (error) {
        res.status(500).send(error || "Server Error") //TODO ERROR
    }
    
}

const showAuthFormSignin = (req, res) => {
    if(!req.session.messages) return res.render('auth/signin')

    const errors = [{ msg: req.session.messages[0] }]
    req.session.messages = []
    return  res.render('auth/signin', {
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

        /*Funcion que acorta el body del post*/
        if(posts !== []) {
            posts.forEach(post => {
                post.shortBody = post.body.substring(0,300)
                post.updatedAt = formatDate(post.updatedAt)
            })
        }

        res.status(200).render('auth/userPosts', 
            {
                title: `Blog Gastronómico - Posts de ${user}`,
                posts,
                user
            }
        )
    } catch (error) {
        res.status(500).send({message: error.message} || "Error Occurred")
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