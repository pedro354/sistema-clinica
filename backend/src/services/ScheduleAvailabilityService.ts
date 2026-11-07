import { UserRepository } from './../repositores/UserRepository.js';
import {
  CreateScheduleAvailabilityAttributes,
  ScheduleAvailabilityWhereParams,
} from './../repositores/ScheduleAvailabilityRepository.js';
import { AppointmentRepository } from '../repositores/AppointmentRepository.js';
import { ScheduleAvailabilityRepository } from '../repositores/ScheduleAvailabilityRepository.js';
import { NotFoundError } from '../errors/NotFoundErros.js';
import { ValidationError } from '../errors/ValidationError.js';
import { ConflictError } from '../errors/ConflictError.js';

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
      throw new NotFoundError('Schedule availability not found!');
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
            throw new ValidationError(
              'It is not possible to change the schedule availability, as there is a conflict with another availability.',
            );
          }
        }

      }
    }
    return this.scheduleAvailabilityRepository.update(id, attributes);
  }
    async deleteSchedule(id: number) {
    
    const schedule = await this.getScheduleOrThrow(id)

    return await this.scheduleAvailabilityRepository.delete(schedule.id);
  }


  private async validateUser(userId: number){
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError('Associated user not found!');
  }
  private async validateDateRange(startDate: Date, endDate: Date){
    if (!startDate) throw new NotFoundError('Mandatory start date');
    if (!endDate) throw new NotFoundError('Mandatory end date');

    if (startDate > endDate)
      throw new NotFoundError('The start date cannot be later than the end date.');
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
    if (duplicated.length > 0) throw new ConflictError('Cannot be duplicated');

  }
  private async ensureNoConflict(startDate: Date, endDate: Date){
    const schedules = await this.scheduleAvailabilityRepository.find({});
    const conflicts = schedules.filter((sched) => {
      const avaliacaoantesdofim = startDate < sched.endDate;
      const avaliacaodepoisdoinicio = endDate > sched.startDate;
      return avaliacaoantesdofim && avaliacaodepoisdoinicio;
    });

    if (conflicts.length > 0) {
      throw new ConflictError(
        'There can be no scheduling conflicts with other availability.',
      );
    }
  }
  private async getScheduleOrThrow(id: number){
    const schedule  = await this.scheduleAvailabilityRepository.findById(id);
    if (!schedule ) throw new NotFoundError('Schedule availability not found!');
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
      throw new NotFoundError(
        'It is not possible to change the schedule availability, as there are appointments booked during that time.',
      );
  }

}
