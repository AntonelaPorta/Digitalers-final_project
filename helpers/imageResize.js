const sharp = require('sharp')
const fs = require('fs')

const imageResize = async (file, name) => {
    await sharp(file.path)
            .resize(500)
            .toFormat("jpeg", { mozjpeg: true })
            .jpeg({quality: 100})
            .toFile(`${file.destination}/${name}`)

    await fs.promises.unlink(file.path)
}

module.exports = {
    imageResize
}