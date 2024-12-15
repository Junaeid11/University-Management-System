/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, } from 'express';
import { StudentService } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const getSingleStudent = catchAsync(async (req, res,) => {
    const { id } = req.params;
  const result = await StudentService.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});



const createStudent = catchAsync(async (req, res) => {
    const { studentData } = req.body;
    const result = await StudentService.createStudentIntoDb(studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      data: result,
      success: true
    });
})
const getAllStudent = catchAsync(async (req, res) => {

    const result = await StudentService.getAllStudentsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'All students retrieved successfully',
      data: result,
      success: true
    });
})



const deleteStudent: RequestHandler =catchAsync( async (req, res, ) => {
    const { id } = req.params;
    const result = await StudentService.getDeleteStudentsFormDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student deleted successfully',
      data: result,
      success: false
    });
})
const updateStudent: RequestHandler =catchAsync( async (req, res, ) => {
    const { id } = req.params;
    const {student} = req.body;
    const result = await StudentService.updateStudentIntoDB(id, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student updated successfully',
      data: result,
      success: false
    });
})
export const StudentController = {
  deleteStudent,
  createStudent,
  getSingleStudent,
  getAllStudent,
  updateStudent 


}
