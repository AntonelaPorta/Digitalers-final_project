const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_REMOTE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 
        console.log('Database connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    dbConnection
}