import { Model, Types } from "mongoose";

export type TGuardian ={
    fatherName: string;
    fatherOccupation: string;
    fatherContactNumber: string;
    motherName: string;
    motherOccupation: string;
    motherContactNumber: string;
}
export type TUserName={
    firstName: string;
    middleName: string;
    lastName: string;
}
export type TLocalGuardian ={
    name: string;
    occupation: string; 
    contactNumber: string;
    address: string;
    profileImage?: string;
    isActivate: "Yes" | "blocked";
}

export type TStudent ={
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    gender: "Male" | "Female";
    age: number;
    dateOfBirth: string;
    email: string;
    contactNumber:string;
    emergencyContactNumber?: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian?: TLocalGuardian;
    admissionSemester: Types.ObjectId;
    isDeleted: boolean;
    academicDepartment: Types.ObjectId;
  }


 //for creating static 


 export interface StudentModel extends Model<TStudent> {
    isUserExists(): Promise<TStudent | null>;
  }







//for creating a custom method in the model
// export type studentMethods =  {
//     isUserExist(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<TStudent, Record<string,never>,  studentMethods>