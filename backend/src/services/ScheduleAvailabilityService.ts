import { UserRepository } from './../repositores/UserRepository';
import {
  CreateScheduleAvailabilityAttributes,
  ScheduleAvailabilityWhereParams,
} from './../repositores/ScheduleAvailabilityRepository';
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

import { AppointmentRepository } from '../repositores/AppointmentRepository';
import { ScheduleAvailabilityRepository } from '../repositores/ScheduleAvailabilityRepository';

export interface GetScheduleAvailabilityParams {
  startDate: Date;
  endDate: Date;
  isAvailable?: boolean;
  userId?: number;
}

export class ScheduleAvailability {
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

    const scheAvail = await this.scheduleAvailabilityRepository.find({
      where,
      include: { user: true },
    });
    return scheAvail;
  }
  async getScheduleAvailabilityFindById(id: number) {
    const scheAvail = await this.scheduleAvailabilityRepository.findById(id);
    if (!scheAvail)
      throw new Error('disponibilidade de horário não encontrada!');
    return scheAvail;
  }
  async createScheduleAvailability(
    params: CreateScheduleAvailabilityAttributes,
  ) {
    const User = await this.userRepository.findById(params.userId);
    if (!User) throw new Error('usuario associado não encontrado!');
    const scheduleAvailabilitys =
      await this.scheduleAvailabilityRepository.find({});
    if (!params.startDate) throw new Error('Data inicial obrigatoria');
    if (!params.endDate) throw new Error('Data final obrigatoria');

    if (params.startDate > params.endDate)
      throw new Error('A data inciial não pode ser maior que data final');

    const duplicated = await this.scheduleAvailabilityRepository.find({
      where: {
        date: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      },
    });
    if (duplicated.length > 0) throw new Error('Não pode duplicar');

    const schedAvail = scheduleAvailabilitys;

    const conflits = schedAvail.filter((sched) => {
      const avaliacaoantesdofim = params.startDate < sched.endDate;
      const avaliacaodepoisdoinicio = params.endDate > sched.startDate;

      return avaliacaoantesdofim && avaliacaodepoisdoinicio;
    });

    if (conflits.length > 0) {
      throw new Error(
        'Não pode haver conflito de horário com outras disponibilidades',
      );
    }

    if (schedAvail) return true;

    return await this.scheduleAvailabilityRepository.create(params);
  }
  async updateScheduleAvailability(
    id: number,
    attributes: Partial<CreateScheduleAvailabilityAttributes>,
  ) {
    const scheduleAvailability =
      await this.scheduleAvailabilityRepository.findById(id);
    if (!scheduleAvailability)
      throw new Error('Disponibilidade de horário não encontrada!');
    const newStartDate = attributes.startDate ?? scheduleAvailability.startDate
    const newEndDate = attributes.endDate ?? scheduleAvailability.endDate
    const appointments = await this.appointmentRepository.find({
      where: {
        userId: scheduleAvailability.userId,
        date: {
          startDate: newStartDate,
          endDate: newEndDate
        },
      },
    });

    //disponibilidade de horário não pode ser alterada se houver uma consulta agendada nesse período
    if (appointments.length > 0)
      throw new Error(
        'Não é possível alterar a disponibilidade de horário, pois há consultas agendadas nesse período.',
      );

    //se alterou o horario, verificar se há conflito com outras disponibilidades
    if (attributes.startDate && attributes.endDate) {
      const schedules = await this.scheduleAvailabilityRepository.find({});
      for (const sched of schedules) {
        if (sched.id !== id) {
          const beforeEnd = attributes.startDate < sched.endDate;
          const afterStart = attributes.endDate > sched.startDate;
          if (beforeEnd && afterStart) {
            throw new Error(
              'Não é possível alterar a disponibilidade de horário, pois há conflito com outra disponibilidade.',
            );
          }
        }
      }
    }
    return await this.scheduleAvailabilityRepository.update(id, attributes);
  }
}
