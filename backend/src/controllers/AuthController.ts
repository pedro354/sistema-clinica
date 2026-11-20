import { Handler } from "express";
import { UserService } from "../services/UserService.js";
import { LoginSchema } from "./schema/UserRequestSchema.js";

export class AuthController {
    constructor(private readonly userService: UserService) {}

    login: Handler = async (req, res) => {
        const body = LoginSchema.parse(req.body);

        const { user, token } = await this.userService.loginUser(
            body.email,
            body.password
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({ user });
    };
}