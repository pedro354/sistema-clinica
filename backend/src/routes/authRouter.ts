import { Router } from "express";
import { authController } from "../containers";

const authRouter = Router()

authRouter.post('/login', authController.login)

export default authRouter