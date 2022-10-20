const mongoose = require('mongoose')
const slugify = require('slugify')

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        versionKey: false
    }
)

//Middleware
//Si encuentra dentro del modelo el title, genera el slug
//title: "Hola que tal"
//slug: "hola-que-tal"
// TODO: llevar a carpeta middlewares
postSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Post', postSchema)