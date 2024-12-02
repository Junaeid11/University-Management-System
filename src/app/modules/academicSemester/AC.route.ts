import express from 'express';
import { academicSemesterControllers } from './AC.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './AC.validation';

const router = express.Router();


router.post('/create-academic-semester',validateRequest(academicSemesterValidation.academicSemesterValidationSchema), academicSemesterControllers.creteAcademicSemester)
router.get('/', academicSemesterControllers.getAllAcademicSemesters);
router.get(
    '/:semesterId',
    academicSemesterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
      academicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    academicSemesterControllers.updateAcademicSemester,
  );
  







export const academicSemesterRoutes = router;