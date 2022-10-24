const { response } = require('express')
const { statusModels } = require("../models/index")

const getRootController = (req, res = response) => {
    res.status(200).render('home', {
        title: 'Blog Gastronómico',
    })
}

module.exports = {
    getRootController
}