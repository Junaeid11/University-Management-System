
import { z } from "zod";

const preRequisiteCoursesSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const createCourseValidationSchema= z.object({
    body: z.object({
        title: z.string().min(3).max(255),
        prefix: z.string().min(3).max(255),
        code: z.number().min(3).max(255),
        credits: z.number().min(1).max(5),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCoursesSchema).optional()

    })
})
const UpdatePreRequisiteCoursesSchema = z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional()
})
const updateCourseValidationSchema= z.object({
    body: z.object({
        title: z.string().min(3).max(255).optional(),
        prefix: z.string().min(3).max(255).optional(),
        code: z.number().min(3).max(255).optional(),
        credits: z.number().min(1).max(5).optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(UpdatePreRequisiteCoursesSchema).optional()
    })
})
const assignFacultiesWithCourseValidationSchema = z.object({
body: z.object({
    faculties: z.array(z.string())
})
})


export const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    assignFacultiesWithCourseValidationSchema
}