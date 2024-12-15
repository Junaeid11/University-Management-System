import { z } from "zod";

const loginValidationSchema =z.object({
body: z.object({
    id: z.string({required_error: 'id is required'}),
    password: z.string({required_error:'passWord is Required'}).max(100),
})
})
const changePasswordValidationSchema =z.object({
body: z.object({
    oldPassword: z.string({required_error: 'Old password is required'}),
    newPassword: z.string({required_error:'passWord is Required'}).max(100),
})
})

const refreshTokenValidationSchema =z.object({
    cookies:z.object({
        refreshToken: z.string({required_error: 'refreshToken is required'}),
    })
})


export const AuthValidation ={
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema
}