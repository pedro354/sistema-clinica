import { UserRepository } from './../repositores/UserRepository';
import { CreateScheduleAvailabilityAttributes, ScheduleAvailabilityWhereParams } from './../repositores/ScheduleAvailabilityRepository';
/* REGRA DE NEGOCIO */
/* 
Regra do find:
Permirtir buscas disponiblidades usando filtros
Permitir filtrar por periodo(start e end)
permitir filtrar por ususario associado
Permitir incluir os dados do usuario associado
--------------------------------------------------------------------------------
Regra do findById: 
Validar disponibilidade se não existir retornar que não encontrou

--------------------------------------------------------------------------------
Regra create: 
A data inicial é obrigatória.
A data final é obrigatória.
O usuário associado deve existir.
Não permitir disponibilidades duplicadas.
Não permitir disponibilidades conflitantes no mesmo período.
Verificar se o período informado é válido.--------------------------------------------------------------------------------
Regra do update:
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
Concluída não pode ser cancelada.--------------------------------------------------------------------------------
Regra do delete:
Permitir excluir qualquer consulta.
Se a consulta não existir retornar que não foi encontrada.*/

import { AppointmentRepository } from "../repositores/AppointmentRepository";
import { ScheduleAvailabilityRepository } from "../repositores/ScheduleAvailabilityRepository";

export interface GetScheduleAvailabilityParams {
    dateRange: Date;
    isAvailable?: boolean;
    userId?: number
}

export class ScheduleAvailability {
    constructor (private readonly scheduleAvailabilityRepository: ScheduleAvailabilityRepository, private readonly appointmentRepository: AppointmentRepository,
        private readonly userRepository: UserRepository
    ){}

    async getScheduleAvailabilityFind(params:GetScheduleAvailabilityParams){
        const {dateRange,  userId, isAvailable } = params

        const where: ScheduleAvailabilityWhereParams = {}
        const stDate = new Date(dateRange);
        stDate.setHours(0,0,0,0)
        const enDate = new Date(dateRange);
        enDate.setHours(23, 59, 59, 999);
        if (dateRange) where.dateRange = { startDate: stDate, endDate: enDate };
        if(isAvailable !== undefined) {where.isAvailable = isAvailable}
        if(userId) where.userId = userId

        const scheAvail = await this.scheduleAvailabilityRepository.find({
            where,
            include : {user: true}
        });
        return scheAvail
    }
    async getScheduleAvailabilityFindById(id: number){
        const scheAvail = await this.scheduleAvailabilityRepository.findById(id)
        if(!scheAvail) throw new Error("disponibilidade de horário não encontrada!")
        return scheAvail
    }
    async createScheduleAvailability(params: CreateScheduleAvailabilityAttributes){
        const User = await this.userRepository.findById(params.userId)
        if(!User) throw new Error("usuario associado não encontrado!")
        const scheduleAvailabilitys = await this.scheduleAvailabilityRepository.find({}) 
        if(!params.startDate)throw new Error ("Data inicial obrigatoria")
        if(!params.endDate)throw new Error ("Data final obrigatoria")
        
        if(params.startDate > params.endDate) throw new Error ("A data inciial não pode ser maior que data final")
        
        const duplicated = await this.scheduleAvailabilityRepository.find({
            where: {
                dateRange: {
                    startDate: params.startDate,
                    endDate: params.endDate
                }
            }
        })
        if(duplicated.length > 0) throw new Error ("Não pode duplicar")
        
        const schedAvail = scheduleAvailabilitys

        const conflits = schedAvail.filter((sched) => {
            const avaliacaoantesdofim = params.startDate < sched.endDate
            const avaliacaodepoisdoinicio = params.endDate > sched.startDate

            return avaliacaoantesdofim && avaliacaodepoisdoinicio
        });

        if(conflits.length > 0){
            console.log("Disponibilidade de horario não permitida");
        }
        
        if(schedAvail) return true


}

}