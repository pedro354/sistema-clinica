import { ScheduleAvailability } from "../../generated/prisma/client"

export interface ScheduleAvailabilityWhereParams {
    dateRange?: {
        startDate: Date
        endDate: Date
    }
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
/**
 * Regra do update:
A consulta deve existir
Permitir remarcação de consultar:
- Não permitir conflito de horario com outras consultas
- Ignorar a propria consulta durante a validação e conflito
Permitir alteração de status:
Agendada pode ser concluída.
Agendada pode ser cancelada.
Concluída pode voltar para agendada.
Cancelada pode voltar para agendada.
Cancelada não pode ser concluída.
Concluída não pode ser cancelada.
 * 
 */