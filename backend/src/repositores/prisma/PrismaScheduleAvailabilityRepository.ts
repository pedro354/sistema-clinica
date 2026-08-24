import { Prisma, ScheduleAvailability } from "../../../generated/prisma/client.js";
import { prisma } from "../../../prisma/lib/prisma.js";
import { CreateScheduleAvailabilityAttributes, FindScheduleAvailabilityParams, ScheduleAvailabilityRepository } from "../ScheduleAvailabilityRepository.js";

export class PrismaScheduleAvailabilityRepository implements ScheduleAvailabilityRepository {
    async find(params: FindScheduleAvailabilityParams): Promise<ScheduleAvailability[]>{
        const where: Prisma.ScheduleAvailabilityWhereInput = {}

        if (params.where?.date) {
            where.startDate = {
                lte: params.where.date.endDate
            }
            where.endDate = {
                gte: params.where.date.startDate,
            }
        }
        if (params.where?.userId !== undefined) {
            where.userId = params.where?.userId
        }
        if (params.where?.isAvailable !== undefined) {
            where.isAvailable = params.where?.isAvailable
        }

        console.log("DATE FILTER:", params.where?.date);
        console.log("PRISMA WHERE:", where);
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