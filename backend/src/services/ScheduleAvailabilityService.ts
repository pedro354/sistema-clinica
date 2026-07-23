import { UserRepository } from './../repositores/UserRepository';
import {
  CreateScheduleAvailabilityAttributes,
  ScheduleAvailabilityWhereParams,
} from './../repositores/ScheduleAvailabilityRepository';
import { AppointmentRepository } from '../repositores/AppointmentRepository';
import { ScheduleAvailabilityRepository } from '../repositores/ScheduleAvailabilityRepository';

export interface GetScheduleAvailabilityParams {
  startDate: Date;
  endDate: Date;
  isAvailable?: boolean;
  userId?: number;
}

export class ScheduleAvailabilityService {
  constructor(
    private readonly scheduleAvailabilityRepository: ScheduleAvailabilityRepository,
    private readonly appointmentRepository: AppointmentRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getScheduleAvailabilityFind(params: GetScheduleAvailabilityParams) {
    const { startDate, endDate, userId, isAvailable } = params;
    
    const where: ScheduleAvailabilityWhereParams = {};
    const queryStartDate = new Date(startDate);
    queryStartDate.setHours(0, 0, 0, 0);
    const queryEndDate = new Date(endDate);
    queryEndDate.setHours(23, 59, 59, 999);
    where.date = { startDate: queryStartDate, endDate: queryEndDate };
    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable;
    }
    if (userId) where.userId = userId;
    
    const schedules = await this.scheduleAvailabilityRepository.find({
      where,
      include: { user: true },
    });
    return schedules;
  }
  async getScheduleAvailabilityFindById(id: number) {
    const schedules = await this.scheduleAvailabilityRepository.findById(id);
    if (!schedules)
      throw new Error('disponibilidade de horário não encontrada!');
    return schedules;
  }
  async createScheduleAvailability(params: CreateScheduleAvailabilityAttributes) {
    
    await this.validateUser(params.userId)
    
    await this.validateDateRange(params.startDate, params.endDate)

    await this.ensureNoDuplicated(params.startDate, params.endDate)

    await this.ensureNoConflict(params.startDate, params.endDate)

    return await this.scheduleAvailabilityRepository.create(params);

  }
  async updateScheduleAvailability(id: number, attributes: Partial<CreateScheduleAvailabilityAttributes>) {
    // A disponibilidade deve existir.
    const currentSchedule = await this.getScheduleOrThrow(id)
    // O novo período deve ser válido.
    const newStartDate = attributes.startDate ?? currentSchedule.startDate;
    const newEndDate = attributes.endDate ?? currentSchedule.endDate;
    this.validateDateRange(newStartDate, newEndDate)
    // Não permitir alterar uma disponibilidade caso existam e consultas agendadas no período informado.
    await this.ensureNoAppointments(currentSchedule.userId, newStartDate, newEndDate)
    // Não pode conflitar com outra disponibilidade.
    const scheduleChanged = newStartDate.getTime() !== currentSchedule.startDate.getTime() || 
       newEndDate.getTime() !== currentSchedule.endDate.getTime()
    if(scheduleChanged){
       const userSchedules  = await this.scheduleAvailabilityRepository.find({where: {userId: currentSchedule.userId}})
      for (const schedule of userSchedules) {
        if (schedule.id !== id) {
          const beforeEnd = newStartDate < schedule.endDate;
          const afterStart = newEndDate > schedule.startDate;
          if (beforeEnd && afterStart) {
            throw new Error(
              'Não é possível alterar a disponibilidade de horário, pois há conflito com outra disponibilidade.',
            );
          }
        }

      }
    }
    return this.scheduleAvailabilityRepository.update(id, attributes);
  }
  private async validateUser(userId: number){
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('usuario associado não encontrado!');
  }
  private async validateDateRange(startDate: Date, endDate: Date){
    if (!startDate) throw new Error('Data inicial obrigatoria');
    if (!endDate) throw new Error('Data final obrigatoria');

    if (startDate > endDate)
      throw new Error('A data inciial não pode ser maior que data final');
  }
  private async ensureNoDuplicated(startDate: Date, endDate: Date){
    const duplicated = await this.scheduleAvailabilityRepository.find({
      where: {
        date: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    if (duplicated.length > 0) throw new Error('Não pode duplicar');

  }
  private async ensureNoConflict(startDate: Date, endDate: Date){
    const schedules = await this.scheduleAvailabilityRepository.find({});
    const conflicts = schedules.filter((sched) => {
      const avaliacaoantesdofim = startDate < sched.endDate;
      const avaliacaodepoisdoinicio = endDate > sched.startDate;
      return avaliacaoantesdofim && avaliacaodepoisdoinicio;
    });

    if (conflicts.length > 0) {
      throw new Error(
        'Não pode haver conflito de horário com outras disponibilidades',
      );
    }
  }
  private async getScheduleOrThrow(id: number){
    const schedule  = await this.scheduleAvailabilityRepository.findById(id);
    if (!schedule ) throw new Error('Disponibilidade de horário não encontrada!');
    return schedule
  }
  private async ensureNoAppointments(userId: number, startDate: Date, endDate: Date){
    const appointments = await this.appointmentRepository.find({
      where: {
        userId: userId,
        date: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    if (appointments.length > 0)
      throw new Error(
        'Não é possível alterar a disponibilidade de horário, pois há consultas agendadas nesse período.',
      );
  }

}

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
1. A disponibilidade deve existir.

2. O novo período deve ser válido.

3. Não pode haver consultas marcadas nesse período.

4. Não pode conflitar com outra disponibilidade.
*/
