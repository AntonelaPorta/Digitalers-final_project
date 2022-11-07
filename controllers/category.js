const Category = require("../models/category")
const Post = require('../models/posts')


const showAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).lean()

        res.status(200).render('category/categories', 
            {
                title: `Blog Gastronómico - Categorías`,
                categories
            }
        )
    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}


const showPostsCategory = async (req, res) => {
    try {
        let slug = req.params.slug

        //Convierte el slug en el nombre de la categoria
        if(/-/.test(slug)){
            slug = slug.split('-').join(' ')
        }
        const nameCategory = slug[0].toUpperCase() + slug.slice(1)
        
        //Buscamos los posts
        const posts = await Post.find({category: nameCategory}).sort({createdAt: -1}).lean()
        const categories = await Category.find({}).lean()

        res.status(200).render('post/posts', 
            {
                title: `Blog Gastronómico - ${nameCategory}`,
                TemplateTitle: `${nameCategory}`,
                posts,
                categories
            }
        )

    } catch (error) {
        res.status(500).send(error.message || "Error Occurred")
    }
}


module.exports = {
    showAllCategories,
    showPostsCategory
}