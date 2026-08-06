import {
  CreatePatientRequestSchema,
  getPatientsRequestSchema,
  updatePatientRequestSchema,
} from './schema/PatientRequestSchema';
import { Handler } from 'express';
import { PatientService } from '../services/PatientService';

export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  index: Handler = async (req, res) => {
      const query = getPatientsRequestSchema.parse(req.query);
      const { sortBy, order, offset, limit } = query;
      const result = await this.patientService.getPatientFind({
        ...query,
        sortBy,
        offset,
        order,
        limit,
      });
      return res.status(200).json(result);
  };
  create: Handler = async (req, res) => {
      const body = CreatePatientRequestSchema.parse(req.body);
      const newPatient = await this.patientService.createPatient(body);
      return res.status(200).json(newPatient);
  };
  show: Handler = async (req, res) => {
      const id = +req.params.id;
      const patient = await this.patientService.getPatientById(id);
      return res.status(200).json(patient);
  };
  update: Handler = async (req, res) => {
      const id = +req.params.id;
      const body = updatePatientRequestSchema.parse(req.body);
      const updatedPatient = await this.patientService.updatePatient(id, body);
      return res.status(200).json(updatedPatient);
  };
  delete: Handler = async (req, res) => {
      const id = Number(req.params.id);
      const deletePatient = await this.patientService.deletePatient(id);
      return res.json(deletePatient);
  };
}
