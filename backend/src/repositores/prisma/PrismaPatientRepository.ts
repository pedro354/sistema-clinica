import { Patient, Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../prisma/lib/prisma.js";
import { CreatePatientAttributes, FindPatientsParams, PatientRepository } from "../PatientRepository.js";

export class PrismaPatientRepository implements PatientRepository {
    async find(params: FindPatientsParams): Promise<Patient[]> {
        const where: Prisma.PatientWhereInput = {}

        if(params.where?.name){
            where.name = {
                contains: params.where?.name?.like,
                equals: params.where?.name?.equals,
                mode: params.where?.name?.mode
            }
        }

        if(params.where?.userId !== undefined){
            where.userId = params.where?.userId
        }

        return prisma.patient.findMany({
            where,
            orderBy: { [params.sortBy ?? 'name']: params.order ?? "asc" },
            skip: params.offset,
            take: params.limit,
            include: {
                appointments: params.include?.appointments,
                user: params.include?.user
            }
        })
    }
    async findById(id: number): Promise<Patient | null> {
        return prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: true,
                user: true
            }
        })
    }
    async create(attributes: CreatePatientAttributes): Promise<Patient> {
            console.log(attributes);
        return prisma.patient.create({
            data: attributes
        })
    }
    async update(id: number, attributes: Partial<CreatePatientAttributes>): Promise<Patient | null> {
        return prisma.patient.update({
            where: { id } ,
            data: attributes
            
        })
    }
    async delete(id: number): Promise<Patient> {
        return prisma.patient.delete({
            where: { id }
        })
    }
}