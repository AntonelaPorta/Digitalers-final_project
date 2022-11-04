const express = require('express')
const { showAllCategories, showPostsCategory } = require('../controllers/category')
const insertDummyCategoryData = require('../helpers/insertCategoryDummy')

const routerCategory = express.Router()

//Router

routerCategory.get("/category", showAllCategories)
routerCategory.get("/category/:slug", showPostsCategory)

//routerCategory.get("/category/db/dummy", insertDummyCategoryData)


module.exports = {
    routerCategory  
}