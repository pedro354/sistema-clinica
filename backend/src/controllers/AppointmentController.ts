import { AppointmentService } from '../services/AppointmentService';
import { CreateAppointmentRequestSchema, GetAppointmentsRequestSchema, UpdateAppointmentRequestSchema } from './schema/AppoitmentRequestSchema';
import { Handler } from 'express';

export class AppoitmentController {
  
  constructor(private readonly appointmentService: AppointmentService ) {}
  index: Handler = async (req, res) => {
    const query = GetAppointmentsRequestSchema.parse(req.query);
    const appoitment = await this.appointmentService.getAppointmentFind(query)
    return res.status(201).json(appoitment)
  };
  create: Handler = async (req, res) => {
      const query = CreateAppointmentRequestSchema.parse(req.body)
      const newAppointment = await this.appointmentService.createAppointment(query);
       return res.status(200).json(newAppointment);
  };
  show: Handler = async (req, res) => {
      const id = +req.params.id;
      const appointment = await this.appointmentService.getAppointmentFindById(id);
       return res.status(200).json(appointment);
  };
  update: Handler = async (req, res) => {
      const id = +req.params.id;
      const body = UpdateAppointmentRequestSchema.parse(req.body);
      console.log("Body:", req.body.date);
      const updatedAppointment = await this.appointmentService.updateAppointment(id, body);
       return res.status(200).json(updatedAppointment);
  };
  delete: Handler = async (req, res) => {
      const id = Number(req.params.id);
      const deleteAppointment = await this.appointmentService.deleteAppointment(id);
      return res.json(deleteAppointment);
  };
}
