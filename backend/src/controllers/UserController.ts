import { Handler } from "express";
import { UserService } from "../services/UserService";
import { CreateUserSchema, UpdateUserSchema } from "./schema/UserRequestSchema";

export class UserController {
    constructor (private readonly userService: UserService) {}
    //Emily o getuser foi criado nos respectivos arquivos para funcionar
    index: Handler = async (req, res, next) => {
        try {
            const result = await this.userService.getUser();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    create: Handler = async(req, res, next) => {
        try {
            const body = CreateUserSchema.parse(req.body)
            const newUser = await this.userService.createUser(body)
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }
    show: Handler = async(req, res, next) => {
        try {
            const id = +req.params.id
            const user = await this.userService.getUserById(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    update: Handler = async(req, res, next) => {
        try {
            const id = +req.params.id
            const body = UpdateUserSchema.parse(req.body);
            const updatedUser = await this.userService.updateUser(id, body)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
    //Esse não tem delete
}