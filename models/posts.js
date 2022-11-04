const mongoose = require('mongoose')
const slugify = require('slugify')
const { JSDOM } = require('jsdom')
const domPurifier = require('dompurify')

const htmlPurify = domPurifier(new JSDOM().window)

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
        user: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Comida extranjera', 'Fast food', 'Gourmet', 'Buffet', 'Take away', 'Parrilla', 'Pizzeria', 'Vegano', "Restaurante", "Resto bar"],
            required: true
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

//Indexacion para search
postSchema.index({'$**': 'text'})

//Middleware
postSchema.pre('validate', function(next) {
    //Crear slug
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    //Crea las views cuando se guarda un documento
    this.views = 0

    //
    if(this.body) {
        this.body = htmlPurify.sanitize(this.body)
    }
    next()
})

module.exports = mongoose.model('Post', postSchema)