import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: [true, "userName is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    phone: { type: String },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);
export default userModel;
