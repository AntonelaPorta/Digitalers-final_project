const mongoose = require('mongoose')
const slugify = require('slugify')

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: ['Comida extranjera', 'Fast food', 'Gourmet', 'Buffet', 'Take away', 'Parrilla', 'Pizzeria', 'Vegano', "Restaurante", "Resto bar"],
            required: true
        },
        image: {
            type: String,
            required: true,
            unique: true
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

CategorySchema.pre('validate', function(next) {
    //Crear slug
    if(this.name) {
        this.slug = slugify(this.name, {lower: true, strict: true})
        this.image = slugify(this.name, {lower: true, strict: true})+".jpg"
    }

    next()
})

module.exports = mongoose.model('Category', CategorySchema)