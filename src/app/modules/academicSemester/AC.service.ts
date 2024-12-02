import { academicSemesterNameCodeMapper, TAcademicSemester } from "./AC.interface";
import { AcademicSemester } from "./AC.model";

const createAcademicSemesterIntoDb = async(payload: TAcademicSemester) =>{
if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error('Invalid code for the semester')
}
const result = await AcademicSemester.create(payload);
return result;
}


const getAllAcademicSemestersIntoDb = async() =>{
    const result = await AcademicSemester.find();
    return result;
}
const getSingleAcademicSemesterIntoDb = async(id: string) =>{
    const result = await AcademicSemester.findById(id);
    return result;
}
const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


export const AcademicSemesterService = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemestersIntoDb,
    getSingleAcademicSemesterIntoDb,
    updateAcademicSemesterIntoDB


}