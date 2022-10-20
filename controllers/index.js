const { response } = require('express')
const { statusModels } = require("../models/index")

const getRootController = (req, res = response) => {
    res.status(200).send(statusModels())
}

module.exports = {
    getRootController
}