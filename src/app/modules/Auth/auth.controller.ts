
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
    const result = await authService.loginUser(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is logged in successfully",
        data: {

            accessToken,
            needsPasswordChange

        }
    }
    )
})
const refreshToken = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies
    const result = await authService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token is generate successfully",
        data: result
    }
    )
})
const changePassword = catchAsync(async (req, res) => {

    const { ...passwordData } = req.body;
    const result = await authService.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed  successfully",
        data: result
    }
    )
})
export const authController = {
    loginUser,
    changePassword,
    refreshToken
}