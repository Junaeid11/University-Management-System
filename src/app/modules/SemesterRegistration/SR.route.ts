import express from 'express';
import { SemesterRegistrationController } from './SR.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './SR.validation';

const router = express.Router();
router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), SemesterRegistrationController.createSemesterRegistration);
router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);
router.patch('/:id',validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
SemesterRegistrationController.updateSemesterRegistration);
router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
  );
  
export const semesterRegistrationRoutes = router;