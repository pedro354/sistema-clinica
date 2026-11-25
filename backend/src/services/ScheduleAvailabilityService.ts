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
}

export class ScheduleAvailabilityService {
  constructor(
    private readonly scheduleAvailabilityRepository: ScheduleAvailabilityRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}
async getScheduleAvailabilityFind(
    userId: number,
    params: GetScheduleAvailabilityParams,
) {
    const { startDate, endDate, isAvailable } = params;

    const where: ScheduleAvailabilityWhereParams = {
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

    if (isAvailable !== undefined) {
        where.isAvailable = isAvailable;
    }

    return await this.scheduleAvailabilityRepository.find({
        where,
    });
}

async getScheduleAvailabilityFindById(id: number, userId: number) {
    const schedule = await this.getScheduleOrThrow(id, userId);
    return schedule;
}

async createScheduleAvailability(
    params: Omit<CreateScheduleAvailabilityAttributes, 'userId'>,
    userId: number,
) {    
    await this.validateDateRange(params.startDate, params.endDate)

    await this.ensureNoDuplicated(userId, params.startDate, params.endDate);

    await this.ensureNoConflict(userId, params.startDate, params.endDate);

    return await this.scheduleAvailabilityRepository.create({
        ...params,
        userId,
    });

  }
async updateScheduleAvailability(
    id: number,
    userId: number,
    attributes: Partial<Omit<CreateScheduleAvailabilityAttributes, 'userId'>>,
) {
    const currentSchedule = await this.getScheduleOrThrow(id, userId);

    const newStartDate = attributes.startDate ?? currentSchedule.startDate;
    const newEndDate = attributes.endDate ?? currentSchedule.endDate;

    this.validateDateRange(newStartDate, newEndDate);

    await this.ensureNoAppointments(userId, newStartDate, newEndDate);

    const scheduleChanged =
        newStartDate.getTime() !== currentSchedule.startDate.getTime() ||
        newEndDate.getTime() !== currentSchedule.endDate.getTime();

if (scheduleChanged) {
    await this.ensureNoAppointments(
        userId,
        newStartDate,
        newEndDate,
    );

    await this.ensureNoConflict(
        userId,
        newStartDate,
        newEndDate,
        id,
    );
}
    return await this.scheduleAvailabilityRepository.update(id, attributes);
}

async deleteSchedule(id: number, userId: number) {
    const schedule = await this.getScheduleOrThrow(id, userId);

    return await this.scheduleAvailabilityRepository.delete(schedule.id);
}

private validateDateRange(startDate: Date, endDate: Date) {
    if (!startDate || !endDate) {
        throw new ValidationError('Start date and end date are required.');
    }

    if (startDate > endDate) {
        throw new ValidationError(
            'The start date cannot be later than the end date.',
        );
    }
}
private async ensureNoDuplicated(
    userId: number,
    startDate: Date,
    endDate: Date,
) {
    const duplicated = await this.scheduleAvailabilityRepository.find({
        where: {
            userId,
            date: {
                startDate,
                endDate,
            },
        },
    });

    if (duplicated.length > 0) {
        throw new ConflictError('Cannot be duplicated');
    }
}

private async ensureNoConflict(
    userId: number,
    startDate: Date,
    endDate: Date,
    excludeScheduleId?: number,
) {
    const schedules = await this.scheduleAvailabilityRepository.find({
        where: { userId },
    });

    const conflicts = schedules.filter((schedule) => {
        if (schedule.id === excludeScheduleId) {
            return false;
        }

        const beforeEnd = startDate < schedule.endDate;
        const afterStart = endDate > schedule.startDate;

        return beforeEnd && afterStart;
    });

    if (conflicts.length > 0) {
        throw new ConflictError(
            'There can be no scheduling conflicts with other availability.',
        );
    }
}

private async getScheduleOrThrow(id: number, userId: number) {
    const schedule = await this.scheduleAvailabilityRepository.findById(id);

    if (!schedule || schedule.userId !== userId) {
        throw new NotFoundError('Schedule availability not found!');
    }

    return schedule;
}

private async ensureNoAppointments(
    userId: number,
    startDate: Date,
    endDate: Date,
) {
    const appointments = await this.appointmentRepository.find({
        where: {
            userId,
            date: {
                startDate,
                endDate,
            },
        },
    });

    if (appointments.length > 0) {
        throw new ConflictError(
            'It is not possible to change the schedule availability, as there are appointments booked during that time.',
        );
    }
}
}