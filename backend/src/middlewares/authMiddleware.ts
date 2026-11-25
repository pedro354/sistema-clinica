import { NextFunction, Request, Response } from "express";
import { TokenService } from "../services/TokenService.js";

export function authMiddleware(tokenService: TokenService) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Recupera o cookie enviado pelo navegador.
        const cookie = req.headers.cookie;
        console.log("COOKIE RECEBIDO:", req.headers.cookie);
        if (!cookie) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        
        console.log("HEADERS:", req.headers);
        // Localiza o cookie de autenticação.
        const authCookie = cookie
            .split(";")
            .map(item => item.trim())
            .find(item => item.startsWith("auth_token="));

        if (!authCookie) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authCookie.substring("auth_token=".length);

        try {
            // Valida o JWT e recupera o ID do usuário.
            const userId = tokenService.verifyToken(token);

            // Disponibiliza a identidade para controllers e services.
            req.user = {
                id: userId
            };

            // Continua o processamento da requisição.
            next();

        } catch {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    };
}