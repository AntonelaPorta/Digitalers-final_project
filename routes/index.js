const express = require('express')
const routerIndex = express.Router()

const { getRootController } = require('../controllers/index')

routerIndex.get('/', getRootController)

module.exports = routerIndex