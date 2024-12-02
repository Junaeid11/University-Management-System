import {  Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import http from 'http-status'
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentService } from "./AD.service";


const createAcademicDepartment = catchAsync(async (req: Request,res: Response) =>{
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDb(req.body);
   sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: 'Academic department is created successfully',
    data: result
   })
 });
 const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartmentIntoDb();

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const {  departmentId } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentIntoDb(departmentId);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {departmentId } = req.params;
  const result = await AcademicDepartmentService.updateAcademicFacultyIntoDB(
    departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}