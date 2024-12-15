import { APPerror } from "../../errors/AppError";
import { AcademicDepartment } from "../AcademicDepartment/AD.model";
import { AcademicFaculty } from "../AcademicFaculty/AF.model";

import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { SemesterRegistration } from "../SemesterRegistration/SR.model";
import { TOfferedCourse } from "./OC.interface";
import { OfferedCourse } from "./OC.model";
import httpStatus from "http-status";
import { hasTimeConflict } from "./OC.utils";


const createOfferedCourseIntoDb = async(payload: TOfferedCourse) =>{
    const {semesterRegistration, academicFaculty,academicDepartment,course,faculty, section, days,startTime, endTime} = payload

const isSemesterRegistrationExist = await 
SemesterRegistration.findById(semesterRegistration);
if(!isSemesterRegistrationExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Semester Registration not found')
}
const academicSemester = isSemesterRegistrationExist.academicSemester;





const isAcademicFacultyExist = await 
AcademicFaculty.findById(academicFaculty);
if(!isAcademicFacultyExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Academic Faculty not found')
}
const isAcademicDepartmentExist = await 
AcademicDepartment.findById(academicDepartment);
if(!isAcademicDepartmentExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Academic department not found')
}
const isCourseExist = await 
Course.findById(course);
if(!isCourseExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Course not found')
}
const isFacultyExist = await 
Faculty.findById(faculty);
if(!isFacultyExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Faculty not found')
}
//checked if the department is belong to the faculty
const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
 academicFaculty,
 _id: academicDepartment
})
if(!isDepartmentBelongToFaculty){
    throw new APPerror(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmentExist.name} does not belong to the ${isAcademicFacultyExist.name}`)
}

const isSameOfferedCourseExist = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
    
})
if(isSameOfferedCourseExist){
    throw new APPerror(httpStatus.CONFLICT, 'This offered course already exist')
}

const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
}).select('days startTime endTime')

const newSchedule ={
    days,
    startTime,
    endTime
}
if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new APPerror(
        httpStatus.CONFLICT,
        `This faculty is not available at that time ! Choose other time or day`,
      );
}

const result = await OfferedCourse.create({...payload, academicSemester})
return result
}

const updateOfferedCourseIntoDb = async(id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days'| 'startTime' | 'endTime'>) =>{
const {faculty, days, startTime, endTime} = payload;


const isOfferedCourseExist = await OfferedCourse.findById(id);
if(!isOfferedCourseExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'Offered course not found')
}
const isFacultyExist = await Faculty.findById(faculty);
if(!isFacultyExist){
    throw new APPerror(httpStatus.NOT_FOUND, 'faculty not found')
}
const semesterRegistration = isOfferedCourseExist.semesterRegistration;
const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
if(semesterRegistrationStatus?.status === "Upcoming"){
    throw new APPerror(httpStatus.BAD_REQUEST, 'This semester registration is upcoming')
}



const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
}).select('days startTime endTime')

const newSchedule ={
    days,
    startTime,
    endTime
}
if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new APPerror(
        httpStatus.CONFLICT,
        `This faculty is not available at that time ! Choose other time or day`,
      );
}


const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
})
return result;


}
export const offeredCourseService = {
createOfferedCourseIntoDb,
updateOfferedCourseIntoDb
}