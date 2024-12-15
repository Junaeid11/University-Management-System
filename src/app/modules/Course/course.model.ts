import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>({
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    preRequisiteCourses: [preRequisiteCoursesSchema]
})
export const Course =  model<TCourse>('Course', courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculty>({
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'faculty',
        required: true
    }]
})
export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultiesSchema);