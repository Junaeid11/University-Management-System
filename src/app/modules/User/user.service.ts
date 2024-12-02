import config from "../../config";
import { AcademicSemester } from "../academicSemester/AC.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";



const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData : Partial<TUser> ={}
   userData.password = password || (config.default_password as string); 
   userData.role = 'student';


   const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

   if (admissionSemester) {
       userData.id =await generateStudentId(admissionSemester);
   } else {
       throw new Error('Admission semester not found');
   }
   //set student role
    const newUser = await  User.create(userData)
    if(Object.keys(newUser).length){
        payload.id = newUser.id;
        payload.user = newUser._id;

        const newStudent = await Student.create(payload);
        return newStudent;
    }
}
export const UserService = {
    createStudentIntoDB
};