import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/AC.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { APPerror } from "../../errors/AppError";



const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {}
    userData.password = password || (config.default_password as string);
    userData.role = 'student';


    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    const session = await mongoose.startSession();
   
    try {
        session.startTransaction()
        if (admissionSemester) {
            userData.id = await generateStudentId(admissionSemester);
        } else {
            throw new Error('Admission semester not found');
        }
        //set student role (transaction-1)
        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newStudent = await Student.create([payload], { session });
        if (!newStudent) {
            throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create student');
        }
        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err
    }
}
export const UserService = {
    createStudentIntoDB
};