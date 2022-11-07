const Joi = require('joi')

const validateAuth = (user) => {
    const SchemaAuth = Joi.object(
        {
            name: Joi.string()
                .min(5)
                .max(20)
                .required()
                .messages({
                    'string.base': 'El nombre de usuario debería ser de tipo string',
                    'string.empty': 'El nombre de usuario no debería estar vacio',
                    'string.min': `El nombre de usuario debería tener al menos 5 caracteres`,
                    'string.max': `El nombre de usuario debería tener menos 20 caracteres`,
                    'any.required': `Debe completar el nombre de usuario`,
                }),
            email: Joi.string()
                .email()
                .regex(RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
                .required()
                .messages({
                    'string.empty': 'Ingrese un mail, el campo no debería estar vacio',
                    'object.regex': 'Ingrese un mail en el formato adecuado',
                    "string.pattern.base": "Ingrese un mail en el formato adecuado"
                }),
            password: Joi.string()
                .min(8)
                .max(30)
                .regex(RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/))
                .required()
                .messages({
                    'string.empty': 'Ingrese una contraseña, el campo no debería estar vacio',
                    'string.min': `La contraseña debería tener al menos 8 caracteres`,
                    'string.max': `La contraseña debería tener menos 30 caracteres`,
                    'object.regex': 'La contraseña debe al menos una letra mayúscula, una letra minúscula, un caracter especial (#$@!%&*?) y en total entre 8 y 30 caracteres',
                    "string.pattern.base": "La contraseña debe al menos una letra mayúscula, una letra minúscula, un caracter especial (#$@!%&*?) y en total entre 8 y 30 caracteres"
                })
        }
    )

    const validation = SchemaAuth.validate(user, { abortEarly: false })

        if(validation.error){
            let errors = validation.error.message.split('. ')
            console.log(errors)
            return errors
        }

        return []
}

module.exports = {
    validateAuth
}