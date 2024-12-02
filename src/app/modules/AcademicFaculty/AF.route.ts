import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './AF.validation';
import { academicFacultyControllers } from './AF.controller';

const router = express.Router();


router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.createAcademicValidationSchema), academicFacultyControllers.creteAcademicFaculty)
router.get('/', academicFacultyControllers.getAllAcademicFaculties);
router.get(
    '/:departmentId',
    academicFacultyControllers.getSingleAcademicFaculty,
  );
  
  router.patch(
    '/:departmentId',
    validateRequest(
      AcademicFacultyValidation.updateAcademicValidationSchema,
    ),
    academicFacultyControllers.updateAcademicFaculty,
  );
  







export const AcademicFacultyRoutes = router;