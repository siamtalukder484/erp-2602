const userModel = require("../models/userSchema");

function formatUser(user){
  return{
    id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    address: user.address,
    phone: user.phone,
    gender: user.gender,
    dob: user.dob,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

const getAllUserController = async (req, res) => {
  try {
    const loggedinUserId = req.user.id
    const loggedinUser = await userModel.findById(loggedinUserId)
    const search = req.query.search ? req.query.search.trim() : ""
    const limit = 5
    const page = req.query.page === undefined ? 1 : Number(req.query.page)

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be a positive integer",
      })
    }

    const filter = {
      _id: {$ne: loggedinUserId},
    }
    
    if(search){
      const searchRegex = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      filter.$or = [
        {username: {$regex: searchRegex, $options: "i"}},
        {email: {$regex: searchRegex, $options: "i"}}
      ]
    }

    const [users, totalUsers] = await Promise.all([
      userModel.find(filter).skip((page - 1) * limit).limit(limit),
      userModel.countDocuments(filter),
    ])

    
    res.status(200).json({
        success: true,
        message: "Users get successfully",
        data: {
          users: users.map(formatUser),
          length: totalUsers,
          page,
          limit,
          totalPages: Math.ceil(totalUsers / limit),
        },
        loggedinuser: loggedinUser
    })
  } catch (error) {
      res.send("catch error")
  }
};

const getSingleUserController = async (req, res) => {
  const userId = req.params.id
  try {

    const user = await userModel.findOne({
      _id: userId
    })
    res.status(200).json({
        success: true,
        message: "User get successfully",
        data: user,
    })
  } catch (error) {
      res.status(409).json({
        success: false,
        message: error.message,
        userId: userId
      })
  }
}

const approvedUserController = async (req, res) => {

  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { status: true },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "User approved Successfully.",
      data: updateUser,
    });
  } catch (error) {
    res.status(409).json({
        success: false,
        message: error.message,
      })
  }
}
const deactiveUserController = async (req, res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { status: false },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "User deactive Successfully.",
      data: updateUser,
    });
  } catch (error) {
    res.status(409).json({
        success: false,
        message: error.message,
      })
  }
}
const deleteUserController = async (req, res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User delete Successfully.",
    });
  } catch (error) {
    res.status(409).json({
        success: false,
        message: error.message,
      })
  }
}

module.exports = {
    getAllUserController,
    getSingleUserController,
    approvedUserController,
    deleteUserController, 
    deactiveUserController
}