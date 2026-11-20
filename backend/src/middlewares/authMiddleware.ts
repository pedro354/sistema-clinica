import { NextFunction, Request, Response } from "express";
import { TokenService } from "../services/TokenService";

export function authMiddleware(tokenService: TokenService){
    return (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.headers.cookie;

    if(!cookie){
        return res.status(401).json({message: "Authentication required"})
    }
    const authCookie = cookie
    .split(";")
    .map(item => item.trim())
    .find(item => item.startsWith('auth_token='))

    if(!authCookie){
        return res.status(401).json({message: "Authentication required"})
    }
    const token = authCookie.substring('auth_token='.length)
    
    
    if(!token){
        return res.status(401).json({message: "Authentication required"})
    }
    
    try {
        const userId = tokenService.verifyToken(token)
        req.user = {
            id: userId,
        }
        next(userId)
    } catch {
        
        return res.status(401).json({message: "Invalid or expired token"})
    }
}
}