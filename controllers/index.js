const express = require('express')
const { statusModels } = require("../models/index")

const getRootController = (req, res = express.response) => {
    res.status(200).send(statusModels)
}

module.exports = {
    getRootController
}