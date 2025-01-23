import { Router } from "express";
const router = Router();
import * as registerControl from "./service/auth.service.js";
import { validation } from "../../../services/validation.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";

router.post("/signup", validation(signUpSchema), registerControl.signUp);
router.post("/login", validation(signInSchema), registerControl.logIn);
router.get("/confirmEmail/:token", registerControl.confirmEmail);

export default router;
