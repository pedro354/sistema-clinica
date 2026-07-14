import { Handler } from 'express';
import { ScheduleAvailability } from '../services/ScheduleAvailabilityService';
import { CreateScheduleAvailabilityRequestSchema, GetScheduleAvailabilityRequestSchema, UpdateScheduleAvailabilityRequestSchema } from './schema/ScheduleAvailabilityRequestSchema';

export class ScheduleAvailabilityController {
  constructor(private readonly scheduleAvailability: ScheduleAvailability ) {}
  index: Handler = async (req, res, next) => {
    try {
      const query = GetScheduleAvailabilityRequestSchema.parse(req.query);
      const result = await this.scheduleAvailability.getScheduleAvailabilityFind(query)
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = CreateScheduleAvailabilityRequestSchema.parse(req.body)
      const newAppointment = await this.scheduleAvailability.createScheduleAvailability(body);
      res.status(200).json(newAppointment);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const appointment = await this.scheduleAvailability.getScheduleAvailabilityFindById(id);
      res.status(200).json(appointment);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateScheduleAvailabilityRequestSchema.parse(req.body);
      const updatedAppointment = await this.scheduleAvailability.updateScheduleAvailability(id, body);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  };
  //não tem delete
//   delete: Handler = async (req, res, next) => {
//     try {
//       const id = Number(req.params.id);
//       const deleteAppointment = await this.scheduleAvailability.delete(id);
//       res.json(deleteAppointment);
//     } catch (error) {
//       next(error);
//     }
//   };
}
