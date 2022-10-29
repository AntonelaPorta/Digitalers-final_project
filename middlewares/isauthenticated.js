const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('todo_error', 'Acceso no autorizado. Por favor, inicie sesión.')
    res.redirect('/auth/signin')
}

module.exports = {
    isAuthenticated
}