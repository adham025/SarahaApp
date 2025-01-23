import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/User.model.js";

export const addMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    let { text } = req.body;
    let foundedUser = await userModel.findById(receiverId);
    if (foundedUser) {
      let addMes = new messageModel({ text, receiverId });
      let added = await addMes.save();
      res.json({ message: "added", added });
    } else {
      res.json({ message: "invalid user" });
    }
  } catch (error) {
    res.json({ message: "invalid user" });
  }
};
