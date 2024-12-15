/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
    id: string;
    password: string;
    needChangePassword?: boolean;
    passwordChangedAt?:Date
    role: 'admin' | 'faculty' | 'student';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}
export type NewUser = {
    id: string;
    password: string;
    role: 'admin' | 'faculty' | 'student' ;
    isDeleted: boolean;

}
export interface UserModel extends Model<TUser> {
    isUserExistByCustomId(id: string): Promise<TUser>
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
    isJWTIssuedBeforeChangePassword(passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number
     ) : boolean
} 



export type TUserRole = keyof typeof USER_ROLE;