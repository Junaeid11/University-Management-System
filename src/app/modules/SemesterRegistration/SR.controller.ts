import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationService } from "./SR.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration created successfully',
        data: result
    })
})
const getAllSemesterRegistrations = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await SemesterRegistrationService.getAllSemesterRegistration(
                req.query,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully !',
            data: result,
        });
    },
);

const getSingleSemesterRegistration = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result =
            await SemesterRegistrationService.getSingleSemesterRegistrationIntoDb(
                id,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully',
            data: result,
        });
    },
);
const updateSemesterRegistration = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result =
        await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
          id,
          req.body,
        );
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
      });
    },
  );
  
export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
}