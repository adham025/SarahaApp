import { Router } from "express";
const router = Router();
import * as userControl from "./service/user.service.js";
import { auth } from "../../middleware/auth.js";
import { myMulter, validationType } from "../../middleware/multer.js";

router.get("/getMessages", auth(), userControl.getMessages);
router.get("/userData", auth(), userControl.userData);
router.delete("/delete/:id", auth(), userControl.deleteMessage);
router.get(
  "/profilePic",
  auth(),
  myMulter(validationType.image, "uploads/user/profilePic").single("image"),
  userControl.profilePic
);

export default router;
