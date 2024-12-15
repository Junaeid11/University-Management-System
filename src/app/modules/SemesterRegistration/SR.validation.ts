import { z } from "zod";

const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum(['Upcoming', 'Ongoing', 'Completed']),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number(),

    })
})
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum(['Upcoming', 'Ongoing', 'Completed']).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
    })
})




export const SemesterRegistrationValidations ={
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}