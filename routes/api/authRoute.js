const express = require("express");
const router = express.Router(); 
const authController =  require("../../controllers/authController")
const multer = require('multer');

const picStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    console.log(file)
    // cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: picStorage });

router.post("/login",(req, res)=>{
    console.log("ami login route")
} ) 
router.post("/registration",upload.single('picture'), authController.registrationController)



module.exports = router;