import { AppointmentRepository } from '../repositores/AppointmentRepository';
import {
  CreatePatientAttributes,
  FindPatientsParams,
  PatientRepository,
} from '../repositores/PatientRepository';
import { UserRepository } from '../repositores/UserRepository';

export class PatientService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly patientRepository: PatientRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}
  async getPatientFind(params: FindPatientsParams) {
    const patients = await this.patientRepository.find({
      where: params.where,
      sortBy: params.sortBy,
      order: params.order,
      offset: params.offset,
      limit: params.limit,
      include: { appointments: true, user: true },
    });
    return patients;
  }

  async getPatientById(id: number) {
    const patients = await this.patientRepository.findById(id);
    if (!patients) throw new Error('Pacient not found!');
    return patients;
  }
  async createPatient(params: CreatePatientAttributes) {
    if (!params.name?.trim()) throw new Error('Name is required');

    const user = await this.userRepository.findById(params.userId);
    if (!user) throw new Error('User not found! ');

    if (!params.phone?.trim()) throw new Error('Phone is required');
    const regexPhone = /^\d{2}9\d{8}$/;
    if (!regexPhone.test(params.phone))
      throw new Error('Invalid Phone, please to type (00) 99999-9999 ');

    return await this.patientRepository.create(params);
  }
  async updatePatient(id: number, params: Partial<CreatePatientAttributes>) {
    const patient = await this.patientRepository.findById(id);
    if (!patient) throw new Error('Pacient not found!');

    if (params.userId) {
      const user = await this.userRepository.findById(params.userId);
      if (!user) throw new Error('Usuario não existe');
    }

    if (params.name !== undefined && !params.name.trim()) {
      throw new Error('Nome não pode estar vazio!');
    }

    if (params.phone !== undefined) {
      if (!params.phone.trim())
        throw new Error('Telefone não pode estar vazio!');
      const regexPhone = /^\d{2}9\d{8}$/;
      if (!regexPhone.test(params.phone))
        throw new Error('Invalid Phone, please to type (00) 99999-9999 ');
    }
    return await this.patientRepository.update(id, params);
  }
  async deletePatient(id: number) {
    const patient = await this.patientRepository.findById(id);
    if (!patient) throw new Error('Paciente não existe');

    const appointment = await this.appointmentRepository.find({
      where: { patientId: id },
    });
    if (appointment.length > 0)
      throw new Error('Não é possível deletar paciente com consultas');

    return await this.patientRepository.delete(id);
  }
}
