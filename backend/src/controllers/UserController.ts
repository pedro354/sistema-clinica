import { Handler } from "express";
import { prisma } from "../../prisma/lib/prisma";

export class UserController {
    index: Handler = async (req, res, next) => {
        try {
            console.log("User index");
            const user = await prisma.user.findMany();
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}