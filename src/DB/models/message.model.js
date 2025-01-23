import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = model("message", messageSchema);

export default messageModel;
