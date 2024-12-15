/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */


import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { APPerror } from '../../errors/AppError';
import { User } from '../User/user.model';
import QueryBuilder from '../../builder/queryBuilder';
import { studentSearchableFields } from './student.constant';



const createStudentIntoDb = async (studentData: TStudent) => {

  if (await Student.isUserExists()) {
    throw new Error('Student already exist')
  }

  const result = await Student.create(studentData);//build in static method


  return result;

}

const getDeleteStudentsFormDb = async (id: string) => {
  const session = await mongoose.startSession();
try {
  session.startTransaction();


  const deletedStudent = await Student.findByIdAndUpdate( id ,
     { isDeleted: true },
     { new: true, session });
    
if(!deletedStudent){
  throw new APPerror(httpStatus.BAD_REQUEST,'Failed to delete student');
}
const userId = deletedStudent.user
const deletedUser = await User.findByIdAndUpdate(userId,
  {isDeleted: true },
  { new: true, session }
)
if(!deletedUser){
  throw new APPerror(httpStatus.BAD_REQUEST,'Failed to delete user');
}
await session.commitTransaction();
await session.endSession();
return deletedStudent;
} catch (err) {
  await session.abortTransaction();
  await session.endSession();
  throw new Error('Failed to delete student');
  
}

}


const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester').populate('academicDepartment').populate({
    path: 'academicDepartment',
    populate:{
     path: 'academicFaculty'
    }
  });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const {name, guardian , localGuardian, ...remainingStudentData} = payload;
  const modifiedUpdatedStudentData: Record<string, unknown> = {
    ...remainingStudentData
  } 
 if(name && Object.keys(name).length ){
  for(const [key, value] of Object.entries(name)){
    modifiedUpdatedStudentData[`name.${key}`] = value;
  }
 }
 if(guardian && Object.keys(guardian).length ){
  for(const [key, value] of Object.entries(guardian)){
    modifiedUpdatedStudentData[`guardian.${key}`] = value;
  }
 }
 if(localGuardian && Object.keys(localGuardian).length ){
  for(const [key, value] of Object.entries(localGuardian)){
    modifiedUpdatedStudentData[`localGuardian.${key}`] = value;
  }
 }

  const result = await Student.findByIdAndUpdate(id, 
    modifiedUpdatedStudentData,{
    new: true,
    runValidators: true
    }
  )
  return result;
};

const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  ).search(studentSearchableFields).filter().sort().paginate().fields();
const result = await studentQuery.modelQuery;
  return result;
}

export const StudentService = {
  createStudentIntoDb,
  getDeleteStudentsFormDb,
  getSingleStudentFromDB,
  getAllStudentsFromDB,
  updateStudentIntoDB
  
}
