const userModel = require("../models/userSchema")
const bcrypt = require('bcrypt');

let registrationController = async (req, res) => {
    const {username, email, password, profilePicture, address, phone, gender, dob} = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidEmail = emailRegex.test(email)
    const existingUser = await userModel.findOne({email: email})

    if(!username){
        res.status(400).json({
            success: false,
            message: "Please Enter a username"
        })
    }
    if(username.length > 16){
          res.status(400).json({
            success: false,
            message: "username max lenght will be 16"
        })
    }
    if(!email){
        res.status(400).json({
            success: false,
            message: "Please Enter a email"
        })
    }
    if(existingUser){
        res.status(400).json({
            success: false,
            message: "email already existed"
        })
    }
      if(!isValidEmail){
          res.status(400).json({
            success: false,
            message: "enter a valid email"
        })
    }
    if(!password){
        res.status(400).json({
            success: false,
            message: "Please Enter a password"
        })
    }
    if(!gender){
        res.status(400).json({
            success: false,
            message: "Please select your gender"
        })
    }

    const hashedPass = await bcrypt.hash(password, 12) 


    // const user = new userModel(
    //     {
    //        username, email, password, profilePicture, address, phone, gender, dob 
    //     }
    // )
    // await user.save()


    const user = await userModel.create({
        username, email, password: hashedPass, profilePicture, address, phone, gender, dob
    })

    res.status(200).json({
        success: true, 
        message: "Registration Successfully",
        data: {
            username, email, hashedPass
        }

    })

    // if (!req.file) {
    //     return res.status(400).json({ message: "Picture is required" });
    // }

    // const imageUrl = req.file.path;
    // console.log("Image URL:", imageUrl);

    // res.status(201).json({
    //     message: "Registration route",
    //     imageUrl
    // });
}
let loginController = async (req, res) => {
    res.send("login route")
}

module.exports = {
    registrationController,
    loginController
}