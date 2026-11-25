import { NotFoundError } from '../errors/NotFoundErros.js';
import { ValidationError } from '../errors/ValidationError.js';
import { AppointmentRepository } from '../repositores/AppointmentRepository.js';
import {
  CreatePatientAttributes,
  FindPatientsParams,
  PatientRepository,
} from '../repositores/PatientRepository.js';
import { UserRepository } from '../repositores/UserRepository.js';
import { PHONE_REGEX } from '../utils/regex.js';

export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UserRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  // Lista somente os pacientes pertencentes ao usuário autenticado.
  async getPatientFind(userId: number, params: FindPatientsParams) {
    await this.validateUser(userId);

    return this.patientRepository.find({
      ...params,
      where: {
        ...params.where,
        userId,
      },
      include: { appointments: true, user: true },
    });
  }

  // Busca um paciente verificando sua propriedade.
  async getPatientById(id: number, userId: number) {
    return this.getPatientOrThrow(id, userId);
  }

  // Cria um paciente associado ao usuário autenticado.
  async createPatient(
    params: Omit<CreatePatientAttributes, 'userId'>,
    userId: number,
  ) {
    this.validateName(params.name);
    this.validatePhone(params.phone);

    await this.validateUser(userId);

    return this.patientRepository.create({
      ...params,
      userId,
    });
  }

  // Atualiza somente pacientes pertencentes ao usuário autenticado.
  async updatePatient(
    id: number,
    userId: number,
    params: Partial<Omit<CreatePatientAttributes, 'userId'>>,
  ) {
    const currentPatient = await this.getPatientOrThrow(id, userId);

    if (params.name !== undefined) {
      this.validateName(params.name);
    }

    if (params.phone !== undefined) {
      this.validatePhone(params.phone);
    }

    return this.patientRepository.update(currentPatient.id, params);
  }

  // Exclui somente pacientes pertencentes ao usuário autenticado.
  async deletePatient(id: number, userId: number) {
    const patient = await this.getPatientOrThrow(id, userId);

    const appointments = await this.appointmentRepository.find({
      where: {
        patientId: id,
        userId,
      },
    });

    if (appointments.length > 0) {
      throw new ValidationError(
        'It is not possible to delete a patient with appointments.',
      );
    }

    return this.patientRepository.delete(patient.id);
  }

  // Confere se o paciente existe e pertence ao usuário.
  private async getPatientOrThrow(id: number, userId: number) {
    const patient = await this.patientRepository.findById(id);

    if (!patient || patient.userId !== userId) {
      throw new ValidationError('Patient not found!');
    }

    return patient;
  }

  private validateName(name: string) {
    if (!name?.trim()) {
      throw new ValidationError('Name is required');
    }
  }

  private async validateUser(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ValidationError('User not found!');
    }

    return user;
  }

  private validatePhone(phone: string) {
    if (!phone?.trim()) {
      throw new ValidationError('Phone is required');
    }

    if (!PHONE_REGEX.test(phone)) {
      throw new NotFoundError(
        'Invalid phone number. Use the format (00) 99999-9999.',
      );
    }
  }
}