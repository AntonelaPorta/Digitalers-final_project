const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//Proceso de encriptacion de la password
AuthSchema.methods.passwordEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//Proceso de chequeo de password
AuthSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Auth', AuthSchema)