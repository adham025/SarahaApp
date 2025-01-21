import { Router } from "express";
const router = Router();
import * as registerControl from "../auth.controller.js";

router.post("/signup", registerControl.signUp);
router.post("/login", registerControl.logIn);

export default router;
