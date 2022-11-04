const sharp = require('sharp')
const fs = require('fs')

const imageResize = async (file) => {
    try {
        const imageName = ((file.filename).split('.')[0])+".jpeg"
        await sharp(file.path)
                .resize(500)
                .toFormat("jpeg", { mozjpeg: true })
                .jpeg({quality: 100})
                .toFile(`${file.destination}/${imageName}`)

        await fs.promises.unlink(file.path)

        return imageName
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    imageResize
}