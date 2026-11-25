import { AppointmentService } from '../services/AppointmentService.js';
import { CreateAppointmentRequestSchema, GetAppointmentsRequestSchema, UpdateAppointmentRequestSchema } from './schema/AppoitmentRequestSchema.js';
import { Handler } from 'express';

export class AppoitmentController {
  
  constructor(private readonly appointmentService: AppointmentService ) {}
  index: Handler = async (req, res) => {
    const query = GetAppointmentsRequestSchema.parse(req.query);
    const userId = Number(req.user.id);
    const appoitment = await this.appointmentService.getAppointmentFind(userId, query)
    return res.status(201).json(appoitment)
  };
  create: Handler = async (req, res) => {
      const query = CreateAppointmentRequestSchema.parse(req.body)
      const userId = Number(req.user.id);
      const newAppointment = await this.appointmentService.createAppointment( query, userId);
       return res.status(200).json(newAppointment);
  };
  show: Handler = async (req, res) => {
      const id = +req.params.id;
      const userId = Number(req.user.id);
      const appointment = await this.appointmentService.getAppointmentFindById(userId, id);
       return res.status(200).json(appointment);
  };
  update: Handler = async (req, res) => {
      const id = +req.params.id;
      const userId = Number(req.user.id);
      const body = UpdateAppointmentRequestSchema.parse(req.body);
      console.log("Body:", req.body.date);
      const updatedAppointment = await this.appointmentService.updateAppointment(id, userId, body);
       return res.status(200).json(updatedAppointment);
  };
  delete: Handler = async (req, res) => {
      const id = Number(req.params.id);
      const userId = Number(req.user.id);
      const deleteAppointment = await this.appointmentService.deleteAppointment(userId,id);
      return res.json(deleteAppointment);
  };
}
