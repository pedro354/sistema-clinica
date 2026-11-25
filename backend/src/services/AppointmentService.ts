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

import { ScheduleAvailabilityRepository } from '../repositores/ScheduleAvailabilityRepository.js';

export interface GetAppointmentParams {
    startDate: Date;
    endDate: Date;
    status?: AppointmentStatus;
    sortBy?: 'date' | 'status';
    order?: 'asc' | 'desc';
}

export class AppointmentService {
    private readonly APPOINTMENT_DURATION = 60 * 60 * 1000;

    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly patientRepository: PatientRepository,
        private readonly scheduleAvailabilityRepository: ScheduleAvailabilityRepository,
    ) {}

    // Public API

    async getAppointmentFind(
        userId: number,
        params: GetAppointmentParams,
    ) {
        const { startDate, endDate, status, sortBy, order } = params;

        const where: AppointmentWhereParams = {
            userId,
        };

        const queryStartDate = new Date(startDate);
        queryStartDate.setHours(0, 0, 0, 0);

        const queryEndDate = new Date(endDate);
        queryEndDate.setHours(23, 59, 59, 999);

        where.date = {
            startDate: queryStartDate,
            endDate: queryEndDate,
        };

        if (status) {
            where.status = status;
        }

        return this.appointmentRepository.find({
            where,
            sortBy,
            order,
            include: { patient: true },
        });
    }

    async getAppointmentFindById(id: number, userId: number) {
        return this.getAppointmentOrThrow(id, userId);
    }

    async createAppointment(
        params: Omit<CreateAppointmentAttributes, 'userId'>,
        userId: number,
    ) {
        await this.validatePatient(params.patientId, userId);

        this.validateAppointmentDate(params.date);

        await this.ensureNoDuplicate(
            params.patientId,
            userId,
            params.date,
        );

        await this.ensureNoConflict(
            userId,
            params.date,
        );

        await this.ensureAvailable(
            userId,
            params.date,
        );

        return this.appointmentRepository.create({
            ...params,
            userId,
        });
    }

    async updateAppointment(
        id: number,
        userId: number,
        params: Partial<Omit<CreateAppointmentAttributes, 'userId'>>,
    ) {
        const currentAppointment = await this.getAppointmentOrThrow(
            id,
            userId,
        );

        const nextPatientId = params.patientId ?? currentAppointment.patientId;

        if (params.patientId !== undefined) {
            await this.validatePatient(nextPatientId, userId);
        }

        const newDate = params.date ?? currentAppointment.date;

        this.validateAppointmentDate(newDate);

        const nextStatus = params.status ?? currentAppointment.status;

        await this.validateStatusTransition(
            currentAppointment.status,
            nextStatus,
        );

        // Verifica horários somente quando a data for alterada.
        if (params.date !== undefined) {
            await this.ensureNoDuplicate(
                nextPatientId,
                userId,
                newDate,
                id,
            );

            await this.ensureNoConflict(
                userId,
                newDate,
                id,
            );

            await this.ensureAvailable(
                userId,
                newDate,
            );
        }

        return this.appointmentRepository.update(id, params);
    }

    async deleteAppointment(id: number, userId: number) {
        await this.getAppointmentOrThrow(id, userId);

        return this.appointmentRepository.delete(id);
    }

    // Private Helpers

    private async getAppointmentOrThrow(
        id: number,
        userId: number,
    ) {
        const appointment = await this.appointmentRepository.findById(id);

        if (!appointment || appointment.userId !== userId) {
            throw new NotFoundError('Appointment not found!');
        }

        return appointment;
    }

    private async validatePatient(
        patientId: number,
        userId: number,
    ) {
        const patient = await this.patientRepository.findById(patientId);

        if (!patient || patient.userId !== userId) {
            throw new NotFoundError('Patient not found!');
        }
    }

    private validateAppointmentDate(date: Date) {
        if (!date || Number.isNaN(date.getTime())) {
            throw new ValidationError('Valid appointment date is required!');
        }

        if (date.getTime() <= Date.now()) {
            throw new ValidationError('Appointment date must be in the future!');
        }
    }

    // Impede duplicidade para o mesmo paciente no mesmo horário.
    private async ensureNoDuplicate(
        patientId: number,
        userId: number,
        appointmentDate: Date,
        excludeAppointmentId?: number,
    ) {
        const startDate = new Date(appointmentDate);
        const endDate = new Date(
            appointmentDate.getTime() + this.APPOINTMENT_DURATION,
        );

        const appointments = await this.appointmentRepository.find({
            where: {
                userId,
                patientId,
                date: {
                    startDate,
                    endDate,
                },
            },
        });

        const duplicated = appointments.some(
            (appointment) => appointment.id !== excludeAppointmentId,
        );

        if (duplicated) {
            throw new ConflictError(
                'An appointment for this patient already exists on the selected date.',
            );
        }
    }

    private async validateStatusTransition(
        currentStatus: AppointmentStatus,
        nextStatus: AppointmentStatus,
    ) {
        const statusTransitions: Record<
            AppointmentStatus,
            AppointmentStatus[]
        > = {
            SCHEDULED: ['COMPLETED', 'CANCELED'],
            COMPLETED: ['SCHEDULED'],
            CANCELED: ['SCHEDULED'],
        };

        if (currentStatus === nextStatus) {
            return;
        }

        const canChange = statusTransitions[currentStatus].includes(nextStatus);

        if (!canChange) {
            throw new ValidationError('Invalid status transition!');
        }
    }

    // Verifica conflito considerando a duração de uma hora.
    private async ensureNoConflict(
        userId: number,
        appointmentDate: Date,
        excludeAppointmentId?: number,
    ) {
        const appointments = await this.appointmentRepository.find({
            where: { userId },
        });

        const newStart = appointmentDate.getTime();
        const newEnd = newStart + this.APPOINTMENT_DURATION;

        const hasConflict = appointments.some((appointment) => {
            if (
                appointment.id === excludeAppointmentId ||
                appointment.status === 'CANCELED'
            ) {
                return false;
            }

            const currentStart = appointment.date.getTime();
            const currentEnd = currentStart + this.APPOINTMENT_DURATION;

            return newStart < currentEnd && newEnd > currentStart;
        });

        if (hasConflict) {
            throw new ConflictError(
                'There is already an appointment scheduled for this time.',
            );
        }
    }

    // Verifica se existe disponibilidade cobrindo todo o horário.
    private async ensureAvailable(
        userId: number,
        appointmentDate: Date,
    ) {
        const appointmentStart = appointmentDate.getTime();
        const appointmentEnd = appointmentStart + this.APPOINTMENT_DURATION;

        const schedules = await this.scheduleAvailabilityRepository.find({
            where: { userId },
        });

        const isAvailable = schedules.some((schedule) => {
            return (
                schedule.isAvailable &&
                schedule.startDate.getTime() <= appointmentStart &&
                schedule.endDate.getTime() >= appointmentEnd
            );
        });

        if (!isAvailable) {
            throw new ConflictError(
                'There is no availability for the selected appointment time.',
            );
        }
    }
}