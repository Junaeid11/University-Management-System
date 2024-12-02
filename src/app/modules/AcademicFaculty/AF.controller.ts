import {  Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import http from 'http-status'
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyService } from "./AF.service";

const creteAcademicFaculty = catchAsync(async (req: Request,res: Response) =>{
  const result = await AcademicFacultyService.createAcademicFacultyIntoDb(req.body);
   sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: 'Academic faculty is created successfully',
    data: result
   })
 });
 const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultyIntoDb();

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyService.getSingleAcademicFacultiesIntoDb(facultyId);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const {facultyId } = req.params;
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const academicFacultyControllers = {
    creteAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,

}