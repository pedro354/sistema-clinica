import { User } from "../../generated/prisma/client.js"

export interface CreateUserAttributes {
    name: string
    email: string
    password: string
}
export interface UserRepository {
    find: () => Promise<User[]>
    findById: (id: number) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    create: (attributes: CreateUserAttributes) => Promise<User>
    update: (id: number, attributes: Partial<CreateUserAttributes>) => Promise<User | null>
}