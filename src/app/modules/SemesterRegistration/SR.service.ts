import { APPerror } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/AC.model";
import { TSemesterRegistration } from "./SR.interface";
import httpStatus from "http-status";
import { SemesterRegistration } from "./SR.model";
import QueryBuilder from "../../builder/queryBuilder";
import { SemesterRegistrationStatus } from "./SR.constrant";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester;
//checked if there any registered semester is already 
const isThereAnyUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or:[
        {status: "Upcoming"},
        {status: "Ongoing"}
    ]
})
if(isThereAnyUpcomingOrOngoing){
    throw new APPerror(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoing.status.toUpperCase()} semester registration`)
}




    const isAcademicSemesterExist = await AcademicSemester.findById(payload.academicSemester);
    if (!isAcademicSemesterExist) {
        throw new APPerror(httpStatus.NOT_FOUND, 'Academic Semester not found')
    }
    const isSemesterRegistrationExist =
        await SemesterRegistration.findOne({academicSemester})
    if (isSemesterRegistrationExist) {
        throw new APPerror(httpStatus.CONFLICT, 'Semester Registration already exist')
    }
    const result = await SemesterRegistration.create(payload);
    return result;


}
const getAllSemesterRegistration = async (query: Record<string,unknown>) => {
const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query).filter().sort().fields().paginate();
const result =await semesterRegistrationQuery.modelQuery;
return result;
}
const getSingleSemesterRegistrationIntoDb = async (id: string) =>{
    const result = await SemesterRegistration.findById(id);

    return result;
}
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    const isSemesterRegistrationExist =
    await SemesterRegistration.findById(id)
if (!isSemesterRegistrationExist) {
    throw new APPerror(httpStatus.NOT_FOUND, 'This semester registration not found')
}



//if the requested semester registration is ongoing or upcoming then it will not be updated
const currentSemesterStatus = isSemesterRegistrationExist.status;
const requestedStatus = payload?.status;
if(currentSemesterStatus === "Completed"){
    throw new APPerror(httpStatus.BAD_REQUEST, `this semester is already ${currentSemesterStatus.toUpperCase()}`)
}

if(currentSemesterStatus === SemesterRegistrationStatus.UPCOMING && requestedStatus === "Completed" ){
    throw new APPerror(httpStatus.BAD_REQUEST, `You can't directly change to  ${currentSemesterStatus.toUpperCase()} to ${requestedStatus.toUpperCase()}`)
}
if(currentSemesterStatus === 'Ongoing'&& requestedStatus === "Upcoming" ){
    throw new APPerror(httpStatus.BAD_REQUEST, `You can't directly change to  ${currentSemesterStatus.toUpperCase()} to ${requestedStatus.toUpperCase()}`)
}
const result = await SemesterRegistration.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
return result;












}

export const SemesterRegistrationService =
{
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistration,
    getSingleSemesterRegistrationIntoDb,
    updateSemesterRegistrationIntoDB
}