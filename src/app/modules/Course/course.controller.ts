import {  Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import http from 'http-status'
import catchAsync from "../../utils/catchAsync";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req: Request,res: Response) =>{
  const result = await CourseService.createCourseIntoDb(req.body);
   sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: 'Course is created successfully',
    data: result
   })
 });
 const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id} = req.params;
  const result =
    await CourseService.getSingleCoursesFromDB(id);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id} = req.params;
  const result =
    await CourseService.deleteCourseIntoDb(id);

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const {id } = req.params;
  const result = await CourseService.updateCourseIntoDb(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const {courseId } = req.params;
  const {faculties} = req.body;
  const result = await CourseService.assignFacultiesWithCourseIntoDb(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Faculties assigned successfully',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const {courseId } = req.params;
  const {faculties} = req.body;
  const result = await CourseService.removeFacultiesWithCourseIntoDb(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: http.OK,
    success: true,
    message: 'Faculties removed successfully',
    data: result,
  });
});

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}