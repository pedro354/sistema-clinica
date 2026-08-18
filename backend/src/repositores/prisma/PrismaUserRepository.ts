import { User } from '../../../generated/prisma/client.js';
import { CreateUserAttributes, UserRepository } from '../UserRepository.js';
import { prisma } from './../../../prisma/lib/prisma.js';

export class PrismaUserRepository implements UserRepository {
    async find(): Promise<User[]>{
        return prisma.user.findMany()
    }
    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        })
    }
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        })
    }
    async create(attributes: CreateUserAttributes): Promise<User> {
        return prisma.user.create({
            data: attributes
        })
    }
    async update(id: number, attributes: Partial<CreateUserAttributes>): Promise<User | null> {
        return prisma.user.update({
            where: { id },
            data: attributes
        })
    }
}