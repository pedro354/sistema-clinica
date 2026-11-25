import { UserController } from "./controllers/UserController.js";
import { UserService } from "./services/UserService.js";
import { PrismaUserRepository } from './repositores/prisma/PrismaUserRepository.js';
import { PrismaPatientRepository } from "./repositores/prisma/PrismaPatientRepository.js";
import { PatientService } from "./services/PatientService.js";
import { PatientController } from "./controllers/PatientController.js";
import { PrismaAppoitmentRepository } from "./repositores/prisma/PrismaAppointmentRepository.js";
import { PrismaScheduleAvailabilityRepository } from "./repositores/prisma/PrismaScheduleAvailabilityRepository.js";
import { AppointmentService } from "./services/AppointmentService.js";
import { ScheduleAvailabilityService } from "./services/ScheduleAvailabilityService.js";
import { AppoitmentController } from "./controllers/AppointmentController.js";
import { ScheduleAvailabilityController } from "./controllers/ScheduleAvailabilityController.js";
import { TokenService } from "./services/TokenService.js";
import { AuthController } from "./controllers/AuthController.js";

export const userRepository = new PrismaUserRepository()
export const patientRepository = new PrismaPatientRepository()
export const appointmentRepository = new PrismaAppoitmentRepository()
export const scheduleAvailabilityRepository = new PrismaScheduleAvailabilityRepository()

// Serviço responsável pela geração e validação dos tokens.
export const tokenService = new TokenService()

export const userService = new UserService(userRepository, tokenService)
export const patientService = new PatientService(patientRepository, userRepository, appointmentRepository)
export const appointmentService = new AppointmentService(appointmentRepository, patientRepository, scheduleAvailabilityRepository)
export const scheduleAvailabilityService = new ScheduleAvailabilityService(scheduleAvailabilityRepository,appointmentRepository)

export const userController = new UserController(userService)
export const patientController = new PatientController(patientService)
export const appointmentController = new AppoitmentController(appointmentService)
export const scheduleAvailabilityController = new ScheduleAvailabilityController(scheduleAvailabilityService)

// Controller responsável pelas operações de autenticação.
export const authController = new AuthController(userService)
