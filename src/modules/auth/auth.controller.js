import userModel from "../../DB/models/User.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto-js";
import { sendEmail } from "../../../services/email.js";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, cPassword, phone } = req.body;
    if (password !== cPassword) {
      res.json("password does not match cPassword");
    }
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "Already registered" });
    } else {
      const hashed = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const encryptedPhone = crypto.AES.encrypt(
        phone,
        process.env.SECRETKEY
      ).toString();
      let message = "Click here to verify your email";
      await sendEmail(email, "confirm to register", message);
      const saveUser = await userModel({
        userName,
        email,
        password: hashed,
        phone: encryptedPhone,
      });
      const savedUser = await saveUser.save();
      const result = savedUser.toObject();
      delete result.password;
      delete result.phone;
      res.json({ message: "Saved", result });
    }
  } catch {
    console.error("Error in signUp:", error);
    res.status(500).json({ message: "Catch error", error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ message: "You have to register first" });
    } else {
      const matched = bcrypt.compareSync(password, user.password);
      if (matched) {
        let bytes = crypto.AES.decrypt(user.phone, process.env.SECRETKEY);
        var originalText = bytes.toString(crypto.enc.Utf8);
        const result = user.toObject();
        result.phone = originalText;
        delete result.password;
        delete result.confirmEmail;
        res.json({ message: "Welcome", result });
      } else {
        res.json({ message: "Password is not correct" });
      }
    }
  } catch {
    res.json({ message: "catch error", error: error.message });
  }
};
