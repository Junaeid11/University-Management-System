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
 const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await UserService.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: http.OK,
      success: true,
      message: 'Faculty is created successfully',
      data: result,
    });
  });
  
  const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await UserService.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: http.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });
export const UserController = {
    createStudent,
    createFaculty,
    createAdmin
}