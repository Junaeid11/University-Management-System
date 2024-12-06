import  express  from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation.zod";

const router = express.Router();
// we will add the controller 
//router.post('/create-student', StudentController.createStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentController.updateStudent);
router.get('/', StudentController.getAllStudent);

router.delete('/:studentId', StudentController.deleteStudent);
export const StudentRoute = router;