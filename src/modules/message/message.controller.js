import { Router } from "express";
const router = Router();
import * as messageController from "./service/message.service.js";
import { auth } from "../../middleware/auth.js";

router.post("/add/:receiverId", auth(), messageController.addMessage);

export default router;
