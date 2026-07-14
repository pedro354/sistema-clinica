import { AppointmentService } from '../services/AppointmentService';
import { CreateAppointmentRequestSchema, GetAppointmentsRequestSchema, UpdateAppointmentRequestSchema } from './schema/AppoitmentRequestSchema';
import { Handler } from 'express';

export class AppoitmentController {
  constructor(private readonly appointmentService: AppointmentService ) {}
  index: Handler = async (req, res, next) => {
    try {
      const query = GetAppointmentsRequestSchema.parse(req.query);
      const result = await this.appointmentService.getAppointmentFind(query)
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = CreateAppointmentRequestSchema.parse(req.body)
      const newAppointment = await this.appointmentService.createAppointment(body);
      res.status(200).json(newAppointment);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const appointment = await this.appointmentService.getAppointmentFindById(id);
      res.status(200).json(appointment);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateAppointmentRequestSchema.parse(req.body);
      const updatedAppointment = await this.appointmentService.updateAppointment(id, body);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const deleteAppointment = await this.appointmentService.deleteAppointment(id);
      res.json(deleteAppointment);
    } catch (error) {
      next(error);
    }
  };
}
