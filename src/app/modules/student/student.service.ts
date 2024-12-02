

import { TStudent } from './student.interface';
import { Student } from './student.model';



const createStudentIntoDb = async (studentData: TStudent) => {
  // console.log('Incoming Student Data:', student);

  if (await Student.isUserExists()) {
    throw new Error('Student already exist')
  }

  const result = await Student.create(studentData);//build in static method


  // const student = new Student(studentData);
  // if (await student.isUserExist(studentData.id)) {
  //     throw new Error('Student already exist')
  // }
  // const result = await student.save()//build in instance method


  return result;

}

const getDeleteStudentsFormDb =async (id: string)=>{
    const result = await Student.updateOne({ id  },{isDeleted: true});
    return result;
}
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
}

export const StudentService = {
  createStudentIntoDb,
  getDeleteStudentsFormDb,
  getSingleStudentFromDB,
  getAllStudentsFromDB
}
