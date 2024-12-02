
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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

export const User =model<TUser>('User', userSchema);
