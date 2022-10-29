const passport = require('passport')
const { Strategy } = require('passport-local')
const Auth = require('../models/auth')

passport.use(
    new Strategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            const user = await Auth.findOne({ email })

            if(!user) {
                return done(null, false, { message: 'El correo electrónico que ingresaste no está conectado a una cuenta.'})
            }

            const isMatch = await user.checkPassword(password)
            if(!isMatch) {
                return done(null, false, { message: 'La contraseña que ingresaste es incorrecta.'})
            }

            return done(null, user)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})