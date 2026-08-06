import { Handler } from 'express';
import { CreateScheduleAvailabilityRequestSchema, GetScheduleAvailabilityRequestSchema, UpdateScheduleAvailabilityRequestSchema } from './schema/ScheduleAvailabilityRequestSchema';
import { ScheduleAvailabilityService } from '../services/ScheduleAvailabilityService';

export class ScheduleAvailabilityController {
  constructor(private readonly scheduleAvailability: ScheduleAvailabilityService ) {}
  index: Handler = async (req, res) => {
      const query = GetScheduleAvailabilityRequestSchema.parse(req.query);
      const result = await this.scheduleAvailability.getScheduleAvailabilityFind(query)
      return res.status(200).json(result);
  };
  create: Handler = async (req, res) => {
      const body = CreateScheduleAvailabilityRequestSchema.parse(req.body)
      const newAppointment = await this.scheduleAvailability.createScheduleAvailability(body);
      return res.status(200).json(newAppointment);
  };
  show: Handler = async (req, res) => {
      const id = +req.params.id;
      const appointment = await this.scheduleAvailability.getScheduleAvailabilityFindById(id);
      return res.status(200).json(appointment);
  };
  update: Handler = async (req, res) => {
      const id = +req.params.id;
      const body = UpdateScheduleAvailabilityRequestSchema.parse(req.body);
      const updatedAppointment = await this.scheduleAvailability.updateScheduleAvailability(id, body);
      return res.status(200).json(updatedAppointment);
  };
}
