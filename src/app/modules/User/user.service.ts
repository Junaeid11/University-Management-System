import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/AC.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {  generateAdminId, generateFaculty, generateStudentId } from "./user.utils";
import { APPerror } from "../../errors/AppError";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../AcademicDepartment/AD.model";
import { Faculty } from "../Faculty/faculty.model";
import { Admin } from "../Admin/admin.model";
import httpStatus from "http-status";




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
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'faculty';
  
    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );
  
    if (!academicDepartment) {
      throw new APPerror(400, 'Academic department not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFaculty();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array
  
      //create a faculty
      if (!newUser.length) {
        throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw err;
    }
  };
  
  const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  }; 
export const UserService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB
};


