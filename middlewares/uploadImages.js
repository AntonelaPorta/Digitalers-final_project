const multer = require('multer')


//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    //cb(new Error("Not a Image"), false);
    cb("El archivo que ingreso no es una imagen" , false);
  }
};

const uploadImage = multer({
    storage: multerStorage,
    //fileFilter: multerFilter
  })
  .single('image')

module.exports = uploadImage
