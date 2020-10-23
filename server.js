require("dotenv/config");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
const multerConfig = require("./config/multer");
const port = 3005;

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});
const upload = multer(multerConfig).single("image");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post("/upload", upload, (req, res) => {
  console.log(req.file);
  res.status(202).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
