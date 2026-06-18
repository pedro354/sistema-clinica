import { Appointment, Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../prisma/lib/prisma';
import {
  AppointmentRepository,
  CreateAppointmentAttributes,
  FindAppointmentsParams,
} from '../AppointmentRepository';

export class PrismaAppoitmentRepository implements AppointmentRepository {
  async find(params: FindAppointmentsParams): Promise<Appointment[]> {
    const where: Prisma.AppointmentWhereInput = {
      date: {
        gte: params.where?.date?.gte,
        lte: params.where?.date?.lte,
      },
      patientId: params.where?.patientId,
      status: params.where?.status,
    };
    return prisma.appointment.findMany({
      where,
      orderBy: { [params.sortBy ?? 'date']: params.order },
      skip: params.offset,
      take: params.limit,
      include: {
        patient: params.include?.patient,
      },
    });
  }
  async findById(id: number): Promise<Appointment | null> {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });
  }
  async create(attributes: CreateAppointmentAttributes): Promise<Appointment> {
    return prisma.appointment.create({ data: attributes });
  }
  async update(
    id: number,
    attributes: Partial<CreateAppointmentAttributes>,
  ): Promise<Appointment> {
    return prisma.appointment.update({
      where: { id },
      data: attributes as Prisma.AppointmentUpdateInput,
    });
  }
  async delete(id: number): Promise<Appointment> {
    return prisma.appointment.delete({ where: { id } });
  }
}
