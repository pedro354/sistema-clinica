import { Appointment } from "../../generated/prisma/client";

export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELED"

export interface AppointmentWhereParams {
    date?: {
        gte?: Date 
        lte?: Date
    }
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
    id: number
    date: Date
    status: AppointmentStatus
    description?: string
    patientId: number
}


export interface AppointmentRepository {
    find: (params: FindAppointmentsParams ) => Promise<Appointment[]>
    findById: (id: number) => Promise<Appointment | null>
    findByAppointment: (id: number) => Promise<Appointment[]>
    create: (attributes: CreateAppointmentAttributes) => Promise<Appointment>
    update: (id: number, attributes: Partial<CreateAppointmentAttributes>) => Promise<Appointment | null>
    delete: (id: number) => Promise<Appointment>
}