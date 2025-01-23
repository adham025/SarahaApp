import bcrypt from "bcryptjs";
import crypto from "crypto-js";
import { sendEmail } from "../../../../services/email.js";

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
      let token = jwt.sign({ id: savedUser._id }, process.env.tokenKey)
      let message = `<a href="http://localhost:3000/auth/confirmEmail/${token}>please click here to verify your email</a>`
      sendEmail(email, message)
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
        if (user.confirmEmail) {
            const token = jwt.sign({ isLogin: true, id: user._id }, process.env.TOKENKEY, { expiresIn: 60*60*60 })
            let bytes = crypto.AES.decrypt(user.phone, process.env.SECRETKEY);
            var originalText = bytes.toString(crypto.enc.Utf8);
            const result = user.toObject();
            result.phone = originalText;
            delete result.password;
            delete result.confirmEmail;
            res.json({ message: "You are logged in", user, token })
        } else {
            res.json({ message: "Please confirm ur email" })
        }
      } else {
        res.json({ message: "Password is not correct" });
      }
    }
  } catch {
    res.json({ message: "catch error", error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
    let { token } = req.params;
    let decoded = jwt.verify(token, process.env.TOKENKEY)
    if (decoded) {
        let user = await userModel.findOne({ _id: decoded.id, confirmEmail: false })
        if (user) {
            let updatedUser = await userModel.findByIdAndUpdate(decoded.id, { confirmEmail: true }, { new: true })
            res.json({ message: "updated", updatedUser })
        } else {
            res.json({ message: "you are already verified" })
        }
    } else {
        res.json({ message: "invalid token" })
    }
}
