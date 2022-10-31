const passport = require("passport")
const Auth = require("../models/auth")

const showAuthFormSignUp = (req, res) => {    
    res.render('auth/signup')
}

/* Register */
const signup = async (req, res) => {
    try {
        const errors = []    
        const { name, email, password, confirm_password } = req.body

        if( password !== confirm_password) {
            errors.push({ msg: 'La contraseña no machea'})
        }

        if( password.lenght < 4) {
            errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres'})
        }

        if( errors.lenght > 0) {
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
        res.status(500).send("Server Error", error) //TODO ERROR
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

module.exports = {
    showAuthFormSignUp,
    signup,
    showAuthFormSignin,
    signin,
    logout
}