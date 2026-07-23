import { ScheduleAvailability } from "../../generated/prisma/client"
import { DateRange } from "../types/DateRange"

export interface ScheduleAvailabilityWhereParams {
    date?: DateRange
    userId?: number
    isAvailable?: boolean
}

export interface FindScheduleAvailabilityParams {
    where?: ScheduleAvailabilityWhereParams
    include?: {
        user?: boolean
    }
}
export interface CreateScheduleAvailabilityAttributes{
    startDate: Date
    endDate: Date
    isAvailable?: boolean
    userId: number
}
export interface ScheduleAvailabilityRepository {
    find: (params: FindScheduleAvailabilityParams) =>Promise<ScheduleAvailability[]>
    findById: (id: number) => Promise<ScheduleAvailability | null>
    create: (attributes: CreateScheduleAvailabilityAttributes) => Promise<ScheduleAvailability>
    update: (id: number, attributes: Partial<CreateScheduleAvailabilityAttributes>) => Promise<ScheduleAvailability | null>
}
