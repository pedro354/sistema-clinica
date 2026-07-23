import { Appointment } from "../../generated/prisma/client";
import { DateRange } from "../types/DateRange";

export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELED"

export interface AppointmentWhereParams {
    date?: DateRange
    userId?: number
    patientId?: number
    status?: AppointmentStatus
}
export interface FindAppointmentsParams {
    where?: AppointmentWhereParams
    sortBy?: "date" | "status"
    order?: "asc" | "desc"
    offset?: number
    limit?: number
    include?: {
        patient?: boolean
    }
}
export interface CreateAppointmentAttributes {
    date: Date
    status?: AppointmentStatus
    description?: string
    patientId: number
    userId: number
}
export interface AppointmentRepository {
    find: (params: FindAppointmentsParams ) => Promise<Appointment[]>
    findById: (id: number) => Promise<Appointment | null>
    create: (attributes: CreateAppointmentAttributes) => Promise<Appointment>
    update: (id: number, attributes: Partial<CreateAppointmentAttributes>) => Promise<Appointment | null>
    delete: (id: number) => Promise<Appointment>
}