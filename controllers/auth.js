const passport = require("passport")
const Auth = require("../models/auth")

const showAuthFormSignUp = (req, res) => {    
    res.render('auth/signup')
}

const signup = async (req, res) => {
    const error = []    
    const { name, email, password, confirm_password } = req.body

    if( password !== confirm_password) {
        error.push({ msg: 'Password do not match.'})
    }

    if( password.lenght < 4) {
        error.push({ msg: 'Password must be al least 4 characters'})
    }

    if( error.lenght > 0) {
        return res.render('/auth/signup', {
            error
        })
    }

    const userFound = await Auth.findOne({ email })
    if( userFound ) {
        return res.redirect('/auth/signup')
    }

    const newUser = new Auth({ name, email, password})
    newUser.password = await newUser.passwordEncrypt(password)
    await newUser.save()

    res.redirect('/auth/signin')
}

const showAuthFormSignin = (req, res) => {    
    res.render('auth/signin')
}

const signin = passport.authenticate('local', {
    sucessRedirect: "/posts",
    failureRedirect: "/auth/signin"
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