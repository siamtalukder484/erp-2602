const express = require("express");
const router = express.Router(); 
const authController =  require("../../controllers/authController")
const multer = require('multer');

const picStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix ='img-' + Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: picStorage });

router.post("/login",(req, res)=>{
    console.log("ami login route")
} ) 
router.post("/registration",upload.single('picture'), authController.registrationController)



module.exports = router;