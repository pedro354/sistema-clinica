import { Patient } from "../../generated/prisma/client";
export interface PatientWhereParams {
    name?: {
        like?: string
        equals?: string
        mode?: "insensitive"
    }
    userId?: number
}
export interface FindPatientsParams {
    where?: PatientWhereParams
    sortBy?: "name" | "phone" | "createdAt"
    order?: "asc" | "desc"
    offset?: number
    limit?: number
    include?: {
        appointments?: boolean
        user?: boolean
    }
}
export interface CreatePatientAttributes {
    name: string
    phone: string
    userId: number
}
export interface PatientRepository {
    find: (params: FindPatientsParams) => Promise<Patient[]>
    findById: (patientId: number) => Promise<Patient | null>
    create: (attributes: CreatePatientAttributes) => Promise<Patient>
    update: (id: number, attributes: Partial<CreatePatientAttributes>) => Promise<Patient | null>
    delete: (id: number) => Promise<Patient>
}