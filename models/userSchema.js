const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "male"
    },
    dob: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema)

module.exports = userModel