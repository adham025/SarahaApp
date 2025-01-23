import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/User.model.js";

export const getMessages = async (req, res) => {
  const userMessages = await messageModel.find({
    receiverId: req.currentUserId,
  });
  res.json({ message: "user", userMessages });
};

export const userData = async (req, res) => {
  let userData = await userModel.find({});
  res.json({ message: "user", userData });
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await messageModel.findById(id);
    if (message.receiverId.toString() == req.currentUserId.toString()) {
      const deletedMessage = await messageModelModel.findByIdAndDelete(
        { _id: id },
        { post }
      );
      res.json({ message: "deleted", deleteMessage });
    } else {
      res.json({ message: "not deleted", error });
    }
  } catch (error) {
    res.json({ message: "not deleted", error });
  }
};
