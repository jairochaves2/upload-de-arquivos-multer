const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "FILES_ISAAC2", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "FILES_ISAAC2", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) {
          cb(err);
        }
        console.log(file);
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const tiposAceitos = ["image/png", "image/jpg", "image/jpeg"];
    if (tiposAceitos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo Invalido"));
    }
  },
};
