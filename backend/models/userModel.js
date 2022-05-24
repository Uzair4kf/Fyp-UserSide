import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user-data",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
//userModel
