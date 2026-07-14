import { Prisma, ScheduleAvailability } from "../../../generated/prisma/client";
import { prisma } from "../../../prisma/lib/prisma";
import { CreateScheduleAvailabilityAttributes, FindScheduleAvailabilityParams, ScheduleAvailabilityRepository } from "../ScheduleAvailabilityRepository";

export class PrismaScheduleAvailability implements ScheduleAvailabilityRepository {
    async find(params: FindScheduleAvailabilityParams): Promise<ScheduleAvailability[]>{
        const where: Prisma.ScheduleAvailabilityWhereInput = {
            startDate: {
                gte: params.where?.date?.startDate,
            },
            endDate: {
                lte: params.where?.date?.endDate
            },
            userId: params.where?.userId,
            isAvailable: params.where?.isAvailable
        }
        return prisma.scheduleAvailability.findMany({
            where,
            include: {
                user: params.include?.user
            }
        })
    }
    async findById(id:number): Promise<ScheduleAvailability | null>{
        return prisma.scheduleAvailability.findUnique({
            where: {id},
            include: {
                user: true
            }
        })
    }
    async create(attributes: CreateScheduleAvailabilityAttributes): Promise <ScheduleAvailability> {
        return prisma.scheduleAvailability.create({data: attributes})
    }
   async update(id: number, attributes: Partial<CreateScheduleAvailabilityAttributes>): Promise<ScheduleAvailability>{
    return prisma.scheduleAvailability.update({
        where: {id},
        data: attributes
    })
   }
       async delete(id: number): Promise<ScheduleAvailability>{
        return prisma.scheduleAvailability.delete({where: { id }})
    }

}