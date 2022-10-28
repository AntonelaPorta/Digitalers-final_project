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
        },
        userName: {
            type: String,
            requered: true
        },
        category: {
            type: String,
            required: false
        },
        image: {
            type: String,
            requerid: true
        },
        views: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//Middleware
// TODO: llevar a carpeta middlewares
postSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    this.views = 0
    next()
})

module.exports = mongoose.model('Post', postSchema)