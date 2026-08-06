import { Handler } from "express";
import { UserService } from "../services/UserService";
import { CreateUserSchema, UpdateUserSchema } from "./schema/UserRequestSchema";

export class UserController {
    constructor (private readonly userService: UserService) {}
    //Emily o getuser foi criado nos respectivos arquivos para funcionar
    index: Handler = async (req, res) => {
            const result = await this.userService.getUser();
            return res.status(200).json(result);
    }
    create: Handler = async(req, res) => {
            const body = CreateUserSchema.parse(req.body)
            const newUser = await this.userService.createUser(body)
            return res.status(201).json(newUser)
    }
    show: Handler = async(req, res) => {
            const id = +req.params.id
            const user = await this.userService.getUserById(id)
            return res.status(200).json(user)
    }
    update: Handler = async(req, res) => {
            const id = +req.params.id
            const body = UpdateUserSchema.parse(req.body);
            const updatedUser = await this.userService.updateUser(id, body)
            return res.status(200).json(updatedUser)
    }
}