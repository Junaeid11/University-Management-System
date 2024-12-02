import { z } from "zod";

const academicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summer', 'Fall']),
        code: z.enum(['01', '02', '03']),
        year: z.string(),
        startMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        endMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
    }),
})


const updateAcademicSemesterValidationSchema =z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
        code: z.enum(['01', '02', '03']).optional(),
        year: z.string().optional(),
        startMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
        endMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
    }),
})

export const academicSemesterValidation = {
    academicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}