import { Router } from "express";

import { authController, tokenService } from "../containers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

// Realiza a autenticação do usuário.
authRouter.post("/login", authController.login);

// Recupera a sessão do usuário autenticado.
authRouter.get(
    "/auth/me",
    authMiddleware(tokenService),
    authController.me
);

export default authRouter;