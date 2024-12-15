import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import { APPerror } from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";


const auth = (...requiredRoles : TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        //if token sent
        const token = req.headers.authorization;
        if (!token) {
            throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not authorized ')
        }
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      const {role, userId, iat} = decoded;
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
        
        {

            // decoded undefined
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not ADMIN ')

            }
            req.user = decoded as JwtPayload
            next()
   
        }
    })

}
export default auth;