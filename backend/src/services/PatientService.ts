import { AppointmentRepository } from '../repositores/AppointmentRepository';
import {
  CreatePatientAttributes,
  FindPatientsParams,
  PatientRepository,
} from '../repositores/PatientRepository';
import { UserRepository } from '../repositores/UserRepository';

export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UserRepository,
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
    await this.getPatientOrThrow(id)
  }
  async createPatient(params: CreatePatientAttributes) {

    this.validateName(params.name);
    
    await this.validateUser(params.userId);

    this.validatePhone(params.phone)

    return this.patientRepository.create(params);
  }
  async updatePatient(id: number, params: Partial<CreatePatientAttributes>) {

    const currentPatient = await this.getPatientOrThrow(id)

    if (params.userId) {
      await this.validateUser(params.userId)
    }

    if (params.name !== undefined) {
      await this.validateName(params.name)
    }

    if (params.phone !== undefined) {
      await this.validatePhone(params.phone)
    }
    return this.patientRepository.update(currentPatient.id, params);
  }
  async deletePatient(id: number) {
    
    const patient = await this.getPatientOrThrow(id)


    const appointment = await this.appointmentRepository.find({ where: { patientId: id } });

    if (appointment.length > 0)
      throw new Error('Não é possível deletar paciente com consultas');

    return await this.patientRepository.delete(patient.id);
  }

  private async getPatientOrThrow(id: number){
    const patient = await this.patientRepository.findById(id);
    if (!patient) throw new Error('Pacient not found!');
    return patient;
  }
  private async validateName(name: string){
    if (!name?.trim()) throw new Error('Name is required');
  }
  private async validateUser(userId: number){
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found! ');
    return user
  }
  private async validatePhone(phone:string){
    if (!phone?.trim()) throw new Error('Phone is required');
    const regexPhone = /^\d{2}9\d{8}$/;
    if (!regexPhone.test(phone))
      throw new Error('Invalid Phone, please to type (00) 99999-9999 ');
  }

}
