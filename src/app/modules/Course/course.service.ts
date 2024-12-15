/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/queryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { TCourse, TCourseFaculty } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import { APPerror } from "../../errors/AppError"

const createCourseIntoDb = async (payload: TCourse)=>{
    const result = await Course.create(payload)
    return result
}
const getAllCoursesFromDB = async (query: Record<string,unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'),query).filter().sort().
fields().paginate().search(CourseSearchableFields)
    const result = await courseQuery.modelQuery
    return result
}
const getSingleCoursesFromDB = async (id: string)=>{
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}
const deleteCourseIntoDb = async (id: string)=>{
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true},{new: true}) 
    return result
}
const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>)=>{
   const {preRequisiteCourses,...courseRemainingData} = payload
   const session = await mongoose.startSession()
   try{
   session.startTransaction()
   


   const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData,
    {
        new: true,
        runValidators: true,
        session
    })
    if(!updatedBasicCourseInfo){
        throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to update course')
    }
//checking preRequisiteCourses is present or not
if(preRequisiteCourses &&  preRequisiteCourses.length>0){



//filter deleted field
const deletedPreRequisites = preRequisiteCourses.filter(el =>el.course && el.isDeleted).map(el=>el.course)
const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, 
  {
    $pull: {
        preRequisiteCourses:{
            course: {
                $in: deletedPreRequisites
            }
        }
    } 
}, {
    new: true,
    runValidators: true,
    session
}

);
if(!deletedPreRequisiteCourses){
    throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to delete course')
}
const newPreRequisites = preRequisiteCourses?.filter(el=> el.course && !el.isDeleted)
const newPreRequisiteCourses = await Course.findByIdAndUpdate(id,
    {
        $addToSet: {preRequisiteCourses:{
            $each: newPreRequisites
        }}
    },
    {
        new: true,
        runValidators: true,
        session
    }
)
if(!newPreRequisiteCourses){
    throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to update course')
}
const result = await Course.findById(id).populate('preRequisiteCourses.course')
return result
}
await session.commitTransaction()
await session.endSession()
   
}catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new APPerror(httpStatus.BAD_REQUEST, 'Failed to update course')

   }
}

const assignFacultiesWithCourseIntoDb = async(id: string, payload: Partial<TCourseFaculty>)=>{
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet:{
            faculties:{
                $each: payload
            }
        }
    },
    {
        upsert: true,
        new: true,

    }
);
return result

}
const removeFacultiesWithCourseIntoDb = async(id: string, payload: Partial<TCourseFaculty>)=>{
    const result = await CourseFaculty.findByIdAndUpdate(id, {
     $pull:{
        faculties:{
            $in: payload
        }
     }
    },
    {
      
        new: true,

    }
);
return result

}


export const CourseService = {
  createCourseIntoDb,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
   deleteCourseIntoDb,
   updateCourseIntoDb,
   assignFacultiesWithCourseIntoDb,
    removeFacultiesWithCourseIntoDb

}