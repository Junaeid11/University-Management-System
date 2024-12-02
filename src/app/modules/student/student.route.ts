import  express  from "express";
import { StudentController } from "./student.controller";

const router = express.Router();
// we will add the controller 
//router.post('/create-student', StudentController.createStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);

router.delete('/:studentId', StudentController.deleteStudent);
export const StudentRoute = router;