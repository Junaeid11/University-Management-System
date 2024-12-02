import { z } from "zod";

const createAcademicValidationSchema = z.object({
  body:z.object({
    name: z.string({
      required_error: "Name is required",
    })
  })
})
const updateAcademicValidationSchema = z.object({
  body:z.object({
    name: z.string({
      required_error: "Name is required",
    })
  })
})
export const AcademicFacultyValidation = {
 createAcademicValidationSchema,
 updateAcademicValidationSchema
}