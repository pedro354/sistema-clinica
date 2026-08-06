import { Router } from 'express'
import { appointmentController, patientController, scheduleAvailabilityController, userController } from '../containers';


const router = Router();


router.get('/user', userController.index)
router.post('/user', userController.create)
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

export default router