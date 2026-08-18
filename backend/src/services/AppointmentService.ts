import { AppointmentStatus } from '../../generated/prisma/enums.js';
import { ConflictError } from '../errors/ConflictError.js';
import { NotFoundError } from '../errors/NotFoundErros.js';
import { ValidationError } from '../errors/ValidationError.js';
import {
  AppointmentRepository,
  AppointmentWhereParams,
  CreateAppointmentAttributes,
} from '../repositores/AppointmentRepository.js';
import { PatientRepository } from '../repositores/PatientRepository.js';

export interface GetAppointmentParams {
  startDate: Date;
  endDate: Date;
  userId?: number;
  status?: AppointmentStatus;
  sortBy?: 'date' | 'status';
  order?: 'asc' | 'desc';
}

export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {}
  // Public API
  async getAppointmentFind(params: GetAppointmentParams) {
    const { startDate, endDate, userId, status, sortBy, order } = params;

    const where: AppointmentWhereParams = {};
    if (userId !== undefined) where.userId = userId;
    const queryStartDate = new Date(startDate);
    queryStartDate.setHours(0, 0, 0, 0);
    const queryEndDate = new Date(endDate);
    queryEndDate.setHours(23, 59, 59, 999);

    where.date = { startDate: queryStartDate, endDate: queryEndDate };
    console.log("User:", where.userId);
console.log("Local:", params.startDate.toLocaleString("pt-BR"));
    if (status) where.status = status;

    const appointment = await this.appointmentRepository.find({
      where,
      sortBy,
      order,
      include: { patient: true },
    });
    return appointment;
  }

  async getAppointmentFindById(id: number) {
    await this.getAppointmentOrThrow(id);
  }

  async createAppointment(params: CreateAppointmentAttributes) {
    await this.validatePatient(params.patientId);

    this.validateAppointmentDate(params.date);
    
    await this.ensureNoDuplicate(params.patientId, params.date, params.date);
        
    return this.appointmentRepository.create(params);
  }
  
  async updateAppointment(id: number,params: Partial<CreateAppointmentAttributes>) {
    const currentAppointment = await this.getAppointmentOrThrow(id);
    
    const newDate = params.date ?? currentAppointment.date;

    this.validateAppointmentDate(newDate);

    const nextStatus = params.status ?? currentAppointment.status;
    
    await this.validateStatusTransition(currentAppointment.status, nextStatus);
    
    await this.ensureNoConflict(id, newDate);
    
    return await this.appointmentRepository.update(id, params);
  }
  // Private Helpers
  async deleteAppointment(id: number) {
    await this.getAppointmentFindById(id);
    return await this.appointmentRepository.delete(id);
  }
  private async getAppointmentOrThrow(id: number) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new NotFoundError('Appointment not found!');
    return appointment;
  }
  private async validatePatient(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);
    if (!patient) throw new NotFoundError('Patient not found!');
  }
  private async validateAppointmentDate(date: Date) {
    if (!date) throw new ValidationError('Date appointment is required!');
  }
  private async ensureNoDuplicate(
    patientId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const duplicated = await this.appointmentRepository.find({
      where: {
        userId: patientId,
        patientId: patientId,
        date: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    if (duplicated.length > 0) {
      throw new ConflictError('An appointment for this patient already exists on the selected date.');
    }
  }
  private async validateStatusTransition(
    currentStatus: AppointmentStatus,
    nextStatus: AppointmentStatus,
  ) {
    const statusTransitions: Record<AppointmentStatus, AppointmentStatus[]> = {
      SCHEDULED: ['COMPLETED', 'CANCELED'],
      COMPLETED: ['SCHEDULED'],
      CANCELED: ['SCHEDULED'],
    };

    if (currentStatus === nextStatus) return;

    const canChange = statusTransitions[currentStatus].includes(nextStatus);
    if (!canChange) {
      throw new ValidationError('Invalid status transition!');
    }
  }
private async ensureNoConflict(
  appointmentId: number,
  appointmentDate: Date,
) {
  const APPOINTMENT_DURATION = 60 * 60 * 1000; // 1 hora

  const appointments = await this.appointmentRepository.find({
    where: {userId: appointmentId},
  });

  const newStart = appointmentDate.getTime();
  const newEnd = newStart + APPOINTMENT_DURATION;

  const hasConflict = appointments.some((appointment) => {
    if (appointment.id === appointmentId) {
      return false;
    }

    const currentStart = appointment.date.getTime();
    const currentEnd = currentStart + APPOINTMENT_DURATION;

    return (
      newStart < currentEnd &&
      newEnd > currentStart
    );
  });

  if (hasConflict) {
    throw new ConflictError(
      'There is already an appointment scheduled for this time.',
    );
  }
}}
/* REGRA DE NEGOCIO */
/* 
Regra do find:
Permitir buscar consultas utilizando filtros
Permitir incluir os dadso do paciente associado.
--------------------------------------------------------------------------------
Regra do findById: 
Se a consulta não existir retornar que não foi encontrado!
--------------------------------------------------------------------------------
Regra create: 
Não permitir criar consulta duplicada
A data da consulta é obrigatoria
Se é valido o paciente
Não permitir consultas conflitantes no mesmo horario
Verifica se o horario está disponivel
--------------------------------------------------------------------------------
Regra do update:
Consultas agendadas podem ser remarcadas
A consulta pode ter o status alterado? Se sim, qual são as opções?
Uma consulta cancelada não pode voltar para concluida
--------------------------------------------------------------------------------
Regra do delete:
Permitir excluir qualquer consulta.
*/
