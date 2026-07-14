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
import { AppointmentStatus } from '../../generated/prisma/enums';
import {
  AppointmentRepository,
  AppointmentWhereParams,
  CreateAppointmentAttributes,
} from '../repositores/AppointmentRepository';
import { PatientRepository } from '../repositores/PatientRepository';

export interface GetAppointmentParams {
  startDate: Date;
  endDate: Date;
  status?: AppointmentStatus;
  sortBy?: 'date' | 'status';
  order?: 'asc' | 'desc';
}

export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {}
  async getAppointmentFind(params: GetAppointmentParams) {
    const { startDate, endDate, status, sortBy, order } = params;

    const where: AppointmentWhereParams = {};
    const queryStartDate = new Date(startDate);
    queryStartDate.setHours(0, 0, 0, 0);
    const queryEndDate = new Date(endDate);
    queryEndDate.setHours(23, 59, 59, 999);
    
    where.date = { startDate: queryStartDate, endDate: queryEndDate };
    
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
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new Error('Appointment not found!');
    return appointment;
  }
  async createAppointment(params: CreateAppointmentAttributes) {
    const patient = await this.patientRepository.findById(params.patientId);
    if (!patient) throw new Error('Patient not found!');

    if (!params.date) throw new Error('Date appointment is required!');

    const duplicated = await this.appointmentRepository.find({
      where: {
        patientId: params.patientId,
        date: {
          startDate: params.date,
          endDate: params.date,
        },
      },
    });
    if (duplicated.length > 0) {
      throw new Error('Date and patient is have duplicate');
    }
    return await this.appointmentRepository.create(params);
  }
  async updateAppointment(
    id: number,
    params: Partial<CreateAppointmentAttributes>,
  ) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new Error('Appointment not found!');
    const appointments = await this.appointmentRepository.find({where: {date: {startDate: appointment.date, endDate: appointment.date}}});

    const consultas = appointments;

    const conflitos = consultas.filter((consulta) => {
      const nowDate = consulta.date === params.date;
      const otherAppointment = consulta.id !== params.patientId;
      return nowDate && otherAppointment;
    });
    if (conflitos.length > 0) {
      console.log('Consulta já marcada para outro paciente');
    } else {
      console.log('Horario disponivel');
    }

    /* A consulta pode ter o status alterado? Se sim, qual são as opções?
Uma consulta cancelada não pode voltar para concluida
 */

    if (appointment.status === 'CANCELED' && params.status === 'COMPLETED') {
      throw new Error('Consulta cancelada não pode ser concluída!');
    }

    if (appointment.status === 'COMPLETED' && params.status === 'CANCELED') {
      throw new Error('Consulta concluída não pode ser cancelada!');
    }

                        return await this.appointmentRepository.update(id, params)
  }
  async deleteAppointment(id:number){
    const appoitmentExists = await this.appointmentRepository.findById(id)
    if(!appoitmentExists) throw new Error ("Consulta não encontrada!")
    return await this.appointmentRepository.delete(id)
  }
}
