import config from "../../config";
import { APPerror } from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import  { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import jwt from 'jsonwebtoken'


const loginUser = async (payload: TLoginUser) => {
    //if the user is  exist 
    const user = await User.isUserExistByCustomId(payload.id)
    if (!user) {
        throw new APPerror(httpStatus.NOT_FOUND, 'User not found')
    }
    //user is already deleted
    const isDeleted = user.isDeleted
    if (isDeleted) {
        throw new APPerror(httpStatus.NOT_FOUND, 'This user is already deleted')
    }
    // //if the user is blocked
    const userStatus = user.status
    if (userStatus === 'blocked') {
        throw new APPerror(httpStatus.NOT_FOUND, 'This user is blocked')
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new APPerror(httpStatus.FORBIDDEN, 'Password is not matched')
    }



    const JwtPayload = {
        userId: user.id,
        role: user.role
    }
    //create token and sent to the client
    const accessToken = createToken(JwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
    const refreshToken = createToken(JwtPayload, config.jwt_access_secret as string, config.jwt_refresh_expires_in as string);




    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needChangePassword



    }

}
const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const user = await User.isUserExistByCustomId(userData.userId)
    if (!user) {
        throw new APPerror(httpStatus.NOT_FOUND, 'User not found')
    }
    //user is already deleted
    const isDeleted = user.isDeleted
    if (isDeleted) {
        throw new APPerror(httpStatus.NOT_FOUND, 'This user is already deleted')
    }
    // //if the user is blocked
    const userStatus = user.status
    if (userStatus === 'blocked') {
        throw new APPerror(httpStatus.NOT_FOUND, 'This user is blocked')
    }

    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new APPerror(httpStatus.FORBIDDEN, 'Password is not matched')

    //hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))


    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    }

    )
    return null

}
const refreshToken = async(token: string)=>{
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
  const { userId, iat} = decoded;
    const user = await User.isUserExistByCustomId(userId)
if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found')
}
//user is already deleted
const isDeleted = user.isDeleted
if (isDeleted) {
    throw new APPerror(httpStatus.NOT_FOUND, 'This user is already deleted')
}
// //if the user is blocked
const userStatus = user.status
if (userStatus === 'blocked') {
    throw new APPerror(httpStatus.NOT_FOUND, 'This user is blocked')
}
if(user.passwordChangedAt && User.isJWTIssuedBeforeChangePassword(user.passwordChangedAt, iat as number))
{
   throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not authorized ') 
}

const JwtPayload = {
    userId: user.id,
    role: user.role
}
//create token and sent to the client
const accessToken = createToken(JwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
return {
    accessToken
}

}
export const authService = {
    loginUser,
    changePassword,
    refreshToken
}