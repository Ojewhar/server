const router = require("express").Router();
const uploads = require("../middlewares/multipleUploadsMiddleware");
const upload = require("../middlewares/singleUploadMiddleware");

// upload single files
router.post("/upload", upload.single("singlefile"), function (req, res, next) {
  const uploadedFile = req.file;
  res.status(200).json(uploadedFile);
  next();
});

// upload multiple files
router.post(
  "/uploads",
  uploads.array("multiplefile", 10),
  function (req, res, next) {
    res.status(200).json("File uploades successfully");
    next();
  }
);

module.exports = router;
