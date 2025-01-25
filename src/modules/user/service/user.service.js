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
    console.log(id);

    const message = await messageModel.findById(id);
    if (message.receiverId.toString() == req.currentUserId.toString()) {
      const deletedMessage = await messageModel.findByIdAndDelete(
        { _id: id },
        { message }
      );
      res.json({ message: "deleted", deletedMessage });
    } else {
      res.json({ message: "not deleted", error });
    }
  } catch (error) {
    res.json({ message: "not deleted", error });
  }
};

export const profilePic = async (req, res) => {
  if (req.imageError) {
    res.json({ message: "Invalid file" });
  } else {
    if (!req.file) {
      console.log(req.file);

      res.json({ message: "Please upload image" });
    } else {
      await userModel.updateOne(
        { _id: req.currentUserId },
        { profilePic: req.file.path }
      );
      res.json({ message: "Done" });
    }
  }
};
