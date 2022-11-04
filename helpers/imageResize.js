const sharp = require('sharp')
const fs = require('fs')

const imageResize = async (file) => {
    const name = `resize-${file.filename}`
    await sharp(file.path)
            .resize(500)
            .toFormat("jpeg", { mozjpeg: true })
            .jpeg({quality: 100})
            .toFile(`${file.destination}/${name}`)

    await fs.promises.unlink(file.path)

    return name
}

module.exports = {
    imageResize
}