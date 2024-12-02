import {  Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import http from 'http-status'
import catchAsync from "../../utils/catchAsync";


const createStudent = catchAsync(async (req: Request,res: Response) =>{
   const {password, student: userData} = req.body; 
   const result = await UserService.createStudentIntoDB(password, userData);
   sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: 'Student created successfully',
    data: result
   })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
 });
export const UserController = {
    createStudent
}