import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidations } from './OC.validation';
import { offeredCourseController } from './OC.controller';
const router = express.Router();
router.post('/create-offered-courses',validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse);
router.patch('/:id',validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema), offeredCourseController.updateOfferedCourse);

export const offeredCourseRoutes = router;