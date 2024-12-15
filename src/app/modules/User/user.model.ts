
import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
   needChangePassword:{
         type: Boolean,
         required: true,
         default: true
   },
   passwordChangedAt:{
       type: Date
   },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        required: true,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
}, {timestamps: true});
userSchema.pre('save', async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        parseInt(config.bcrypt_salt_rounds as string)
    );
    next()
})

//set empty string after saving password
userSchema.post('save',function(doc, next){   doc.password ='';
    next()
})
userSchema.statics.isUserExistByCustomId = async function (id: string) {
    return await this.findOne({id}).select('+password');
}
userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string)
 {
  return await  bcrypt.compare(plainTextPassword, hashedPassword);
}


userSchema.statics.isJWTIssuedBeforeChangePassword = function(passwordChangedTimestamp:Date,jwtIssuedTimestamp: number){
   const passwordChangedTime = new Date(passwordChangedTimestamp).getTime()/1000;
    return passwordChangedTime > jwtIssuedTimestamp; 

}
export const User =model<TUser, UserModel>('User', userSchema);
