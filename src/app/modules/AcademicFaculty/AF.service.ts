import { TAcademicFaculty } from "./AF.interface";
import { AcademicFaculty } from "./AF.model";

const createAcademicFacultyIntoDb = async(payload: TAcademicFaculty) =>{

const result = await AcademicFaculty.create(payload);
return result;
}


const getAllAcademicFacultyIntoDb = async() =>{
    const result = await AcademicFaculty.find();
    return result;
}
const getSingleAcademicFacultiesIntoDb = async(id: string) =>{
    const result = await AcademicFaculty.findById(id);
    return result;
}
const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
  ) => {
  
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


export const AcademicFacultyService = {
    createAcademicFacultyIntoDb,
    getAllAcademicFacultyIntoDb,
    getSingleAcademicFacultiesIntoDb,
    updateAcademicFacultyIntoDB
}