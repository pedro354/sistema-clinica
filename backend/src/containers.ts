import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { PrismaUserRepository } from './repositores/prisma/PrismaUserRepository';
import { PrismaPatientRepository } from "./repositores/prisma/PrismaPatientRepository";
import { PatientService } from "./services/PatientService";
import { PatientController } from "./controllers/PatientController";
import { PrismaAppoitmentRepository } from "./repositores/prisma/PrismaAppointmentRepository";
import { PrismaScheduleAvailabilityRepository } from "./repositores/prisma/PrismaScheduleAvailabilityRepository";
import { AppointmentService } from "./services/AppointmentService";
import { ScheduleAvailabilityService } from "./services/ScheduleAvailabilityService";
import { AppoitmentController } from "./controllers/AppointmentController";
import { ScheduleAvailabilityController } from "./controllers/ScheduleAvailabilityController";

export const userRepository = new PrismaUserRepository()
export const patientRepository = new PrismaPatientRepository()
export const appointmentRepository = new PrismaAppoitmentRepository()
export const scheduleAvailabilityRepository = new PrismaScheduleAvailabilityRepository()

export const userService = new UserService(userRepository)
export const patientService = new PatientService(patientRepository, userRepository, appointmentRepository)
export const appointmentService = new AppointmentService(appointmentRepository, patientRepository)
export const scheduleAvailabilityService = new ScheduleAvailabilityService(scheduleAvailabilityRepository,appointmentRepository,userRepository)

export const userController = new UserController(userService)
export const patientController = new PatientController(patientService)
export const appointmentController = new AppoitmentController(appointmentService)
export const scheduleAvailabilityController = new ScheduleAvailabilityController(scheduleAvailabilityService)

