import { z } from "zod";

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string().nonempty(),
        academicFaculty: z.string().nonempty(),
        academicDepartment: z.string().nonempty(),
        course: z.string().nonempty(),
        faculty: z.string().nonempty(),
        section: z.number().int(),
        maxCapacity: z.number().int(),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])).min(1),
        startTime: z.string().refine((time)=>{ const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; return regex.test(time)}, {message: 'Invalid time format'}),
        endTime: z.string().refine((time)=>{ const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; return regex.test(time)}, {message: 'Invalid time format'}),
    }).refine((body)=>{
        const start = new Date(`2020-01-01T${body.startTime}:00`)
        const end = new Date(`2020-01-01T${body.endTime}:00`)
        return start < end
    }, {message: 'Start time must be less than end time'})
})

const updateOfferedCourseValidationSchema = z.object({
    body: z.object(
        {

            faculty: z.string().optional(),
            maxCapacity: z.number().int().optional(),
            days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])).optional(),
            startTime: z.string().refine((time)=>{ const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; return regex.test(time)}, {message: 'Invalid time format'}).optional(),
            endTime: z.string().refine((time)=>{ const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; return regex.test(time)}, {message: 'Invalid time format'}).optional(),
        }).refine((body)=>{
            const start = new Date(`2020-01-01T${body.startTime}:00`)
            const end = new Date(`2020-01-01T${body.endTime}:00`)
            return start < end
        }, {message: 'Start time must be less than end time'})
})
export const offeredCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}