const userModel = require("../models/userSchema");

const getAllUserController = async (req, res) => {
  try {
    const loggedinUser = await userModel.findById({_id: "6ad6118641c2dfaca4cf2baf"})
    const users = await userModel.find()
    res.status(200).json({
        success: true,
        message: "Users get successfully",
        data: users,
        loggedinuser: loggedinUser
    })
  } catch (error) {
      res.send("catch error")
    
  }
};


module.exports = {
    getAllUserController
}