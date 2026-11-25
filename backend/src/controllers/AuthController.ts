import { Handler } from "express";

import { UserService } from "../services/UserService.js";
import { LoginSchema } from "./schema/UserRequestSchema.js";

export class AuthController {

    constructor(private readonly userService: UserService) {}

    // Realiza o login e cria o cookie de autenticação.
    login: Handler = async (req, res) => {

        const body = LoginSchema.parse(req.body);

        const { user, token } = await this.userService.loginUser(
            body.email,
            body.password
        );

        const isProduction = process.env.NODE_ENV === "production";

        // Configura o cookie HttpOnly utilizado na autenticação.
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({ user });
    };

    // Recupera os dados do usuário associado ao token validado.
    me: Handler = async (req, res) => {

        const userId = Number(req.user.id);

        // Busca o usuário identificado pelo middleware.
        const user = await this.userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Remove informações sensíveis antes de retornar os dados.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...publicUser } = user;

        return res.status(200).json(publicUser);
    };
    logout: Handler = async (_req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    return res.status(200).json({
        message: "Logout realizado com sucesso",
    });
};
}