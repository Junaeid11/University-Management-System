import { z } from "zod";

const userValidationSchema = z.object({
    
    password: z.string().max(10, { message: 'Password must be less than 10 characters' }).optional(),
   
});
export const UserValidation ={
    userValidationSchema
};