import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './AD.validation';
import { academicDepartmentControllers } from './AD.controller';

const router = express.Router();


router.post('/create-academic-department',//validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), 
  academicDepartmentControllers.createAcademicDepartment)
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get(
    '/:departmentId',
    academicDepartmentControllers.getSingleAcademicDepartment,
  );
  
  router.patch(
    '/:departmentId',
    validateRequest(
        AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    academicDepartmentControllers.updateAcademicDepartment,
  );
  
  





export const AcademicDepartmentRoutes = router;