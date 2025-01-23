import { Router } from "express";
const router = Router();
import * as userControl from "./service/user.service.js";
import { auth } from "../../middleware/auth.js";

router.get("/getMessages", auth(), userControl.getMessages);
router.get("/userData", auth(), userControl.userData);
router.delete("/delete/:id", auth(), userControl.deleteMessage);

export default router;
