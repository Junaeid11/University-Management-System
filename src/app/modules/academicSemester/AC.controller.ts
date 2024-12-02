import {  Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import http from 'http-status'
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./AC.service";


const creteAcademicSemester = catchAsync(async (req: Request,res: Response) =>{
  const result = await AcademicSemesterService.createAcademicSemesterIntoDb(req.body);
   sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: 'Academic Semester is created successfully',
    data: result
   })
 });
 const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersIntoDb();

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterService.getSingleAcademicSemesterIntoDb(semesterId);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
    creteAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,

}