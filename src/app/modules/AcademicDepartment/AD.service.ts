import { TAcademicDepartment } from "./AD.interface";
import { AcademicDepartment } from "./AD.model";

const createAcademicDepartmentIntoDb = async(payload: TAcademicDepartment) =>{

const result = await AcademicDepartment.create(payload);
return result;
}


const getAllAcademicDepartmentIntoDb = async() =>{
    const result = await AcademicDepartment.find();
    return result;
}
const getSingleAcademicDepartmentIntoDb = async(id: string) =>{
    const result = await AcademicDepartment.findById(id);
    return result;
}
const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>,
  ) => {
  
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentIntoDb,
    getSingleAcademicDepartmentIntoDb,
    updateAcademicFacultyIntoDB
}
