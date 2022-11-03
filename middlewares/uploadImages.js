const multer = require('multer')

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
    filename: (req, file, cb) => {
        cb(null, `/uploads/${Date.now()}-${file.originalname}`)
    }
})

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Not a Image"), false);
  }
};

const uploadImage = multer({
    storage: multerStorage,
    //fileFilter: multerFilter
  })
  .single('image')

module.exports = uploadImage
