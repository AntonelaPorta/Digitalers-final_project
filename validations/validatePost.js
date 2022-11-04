const Joi = require('joi')

const validacionEditPost = (post) => {
    const SchemaEditPost = Joi.object(
        {
            title: Joi.string()
                .min(5)
                .max(100)
                .required()
                .messages({
                    'string.base': 'El título debería ser de tipo string',
                    'string.empty': 'El título no debería estar vacio',
                    'string.min': `El título debería tener al menos 5 caracteres`,
                    'string.max': `El título debería tener menos 30 caracteres`,
                    'any.required': `Debe completar el título`,
                }),
            body: Joi.string()
                .min(200)
                .max(10000)
                .required()
                .messages({
                    'string.base': 'El cuerpo del post debería ser de tipo string',
                    'string.empty': 'El cuerpo del post no debería estar vacio',
                    'string.min': `El cuerpo del post debería tener al menos 200 caracteres`,
                    'string.max': `El cuerpo del post debería tener menos 10000 caracteres`,
                    'any.required': `Debe completar el cuerpo del post`,
                }),
            category: Joi.string()
                .valid('Comida extranjera', 'Fast food', 'Gourmet', 'Buffet', 'Take away', 'Parrilla', 'Pizzeria', 'Vegano', "Restaurante", "Resto bar")
                .messages({
                    'string.base': 'La categoría del post debería ser de tipo string',
                    'string.empty': 'La categoría del post no debería estar vacio',
                    'any.only': `La categoría debe cohincider con los seleccionado`,
                    'any.required': `Debe completar la categoría del post`,
                }),
            image: Joi.string()
            .regex(RegExp(/\.(jpg|jpeg|png|webp)$/i))
            .required()
            .messages({
                'string.regex': 'La imagen del post no debería estar vacio',
            })
        }
    )

    const validation = SchemaEditPost.validate(post, { abortEarly: false })

        if(validation.error){
            let errors = validation.error.message.split('. ')
            return errors
        }

        return false
}


const validacionCreatePost = (post) => {
    const SchemaEditPost = Joi.object(
        {
            title: Joi.string()
                .min(5)
                .max(100)
                .required()
                .messages({
                    'string.base': 'El título debería ser de tipo string',
                    'string.empty': 'El título no debería estar vacio',
                    'string.min': `El título debería tener al menos 5 caracteres`,
                    'string.max': `El título debería tener menos 30 caracteres`,
                    'any.required': `Debe completar el título`,
                }),
            body: Joi.string()
                .min(200)
                .max(10000)
                .required()
                .messages({
                    'string.base': 'El cuerpo del post debería ser de tipo string',
                    'string.empty': 'El cuerpo del post no debería estar vacio',
                    'string.min': `El cuerpo del post debería tener al menos 200 caracteres`,
                    'string.max': `El cuerpo del post debería tener menos 10000 caracteres`,
                    'any.required': `Debe completar el cuerpo del post`,
                }),
            category: Joi.string()
                .valid('Comida extranjera', 'Fast food', 'Gourmet', 'Buffet', 'Take away', 'Parrilla', 'Pizzeria', 'Vegano', "Restaurante", "Resto bar")
                .messages({
                    'string.base': 'La categoría del post debería ser de tipo string',
                    'string.empty': 'La categoría del post no debería estar vacio',
                    'any.only': `Seleccione alguna categoria`,
                    'any.required': `Debe completar la categoría del post`,
                }),
            image: Joi.string()
                .regex(RegExp(/\.(jpg|jpeg|png|webp)$/i))
                .required()
                .messages({
                    'string.empty': 'La imagen del post no debería estar vacio',
                    'string.regex': 'El archivo debe ser de formato imagen',
                })
        }
    )

    const validation = SchemaEditPost.validate(post, { abortEarly: false })

        if(validation.error){
            let errors = validation.error.message.split('. ')
            console.log(errors)
            return errors
        }

        return false
}



module.exports = {
    validacionEditPost,
    validacionCreatePost
}