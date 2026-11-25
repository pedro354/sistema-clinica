import { Router } from 'express'
import { appointmentController, patientController, scheduleAvailabilityController, tokenService, userController } from '../containers.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Cadastro de usuários permanece público.
router.post("/user", userController.create);

// Todas as rotas registradas abaixo exigem autenticação.
router.use(authMiddleware(tokenService));


router.get('/user', userController.index)
router.get('/user/:id', userController.show)
router.put('/user/:id', userController.update)

router.get('/patient', patientController.index)
router.post('/patient', patientController.create)
router.get('/patient/:id', patientController.show)
router.put('/patient/:id', patientController.update)
router.delete('/patient/:id', patientController.delete)

router.get('/appointment', appointmentController.index)
router.post('/appointment', appointmentController.create)
router.get('/appointment/:id', appointmentController.show)
router.put('/appointment/:id', appointmentController.update)
router.delete('/appointment/:id', appointmentController.delete)

router.get('/scheduleavailability', scheduleAvailabilityController.index)
router.post('/scheduleavailability', scheduleAvailabilityController.create)
router.get('/scheduleavailability/:id', scheduleAvailabilityController.show)
router.put('/scheduleavailability/:id', scheduleAvailabilityController.update)
router.delete('/scheduleavailability/:id', scheduleAvailabilityController.delete)


export default router