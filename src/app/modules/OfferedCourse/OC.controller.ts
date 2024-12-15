import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { offeredCourseService } from "./OC.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await offeredCourseService.createOfferedCourseIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration created successfully',
        data: result
    })
})
const updateOfferedCourse =catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await offeredCourseService.updateOfferedCourseIntoDb(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration updated successfully',
        data: result
    })
})
export const offeredCourseController = {
    createOfferedCourse,
    updateOfferedCourse
}