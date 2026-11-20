import { User } from "../../generated/prisma/client.js"

export type PublicUser = Omit<User, 'password'>

export type LoginResult = {
    user: PublicUser;
    token: string;
}
