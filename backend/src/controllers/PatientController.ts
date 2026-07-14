import {
  CreatePatientRequestSchema,
  getPatientsRequestSchema,
  updatePatientRequestSchema,
} from './schema/PatientRequestSchema';
import { Handler } from 'express';
import { PatientService } from '../services/PatientService';

export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  index: Handler = async (req, res, next) => {
    try {
      const query = getPatientsRequestSchema.parse(req.query);
      const { sortBy, order, offset, limit } = query;
      const result = await this.patientService.getPatientFind({
        ...query,
        sortBy,
        offset,
        order,
        limit,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = CreatePatientRequestSchema.parse(req.body);
      const newPatient = await this.patientService.createPatient(body);
      res.status(200).json(newPatient);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const patient = await this.patientService.getPatientById(id);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = updatePatientRequestSchema.parse(req.body);
      const updatedPatient = await this.patientService.updatePatient(id, body);
      res.status(200).json(updatedPatient);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const deletePatient = await this.patientService.deletePatient(id);
      res.json(deletePatient);
    } catch (error) {
      next(error);
    }
  };
}
