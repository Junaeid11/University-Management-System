import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { courseControllers } from './course.controller';

const router = express.Router();


router.post('/create-course',validateRequest(CourseValidation.createCourseValidationSchema), courseControllers.createCourse)
router.get('/', courseControllers.getAllCourses);
router.get(
    '/:id',
    courseControllers.getSingleCourse,
  );
router.delete('/:id', courseControllers.deleteCourse);  
 
  router.patch(
    '/:departmentId',
    validateRequest(
      CourseValidation.updateCourseValidationSchema,
    ),
    courseControllers.updateCourse,
  );
router.put('/:courseId/assign-faculties',validateRequest(CourseValidation.assignFacultiesWithCourseValidationSchema), courseControllers.assignFacultiesWithCourse);  
  
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidation.assignFacultiesWithCourseValidationSchema), courseControllers.removeFacultiesFromCourse);  
  

export const CourseRoutes = router;





export const AcademicFacultyRoutes = router;