import mongoose from "mongoose";
import { TSemesterRegistration } from "./SR.interface";

const semesterRegistrationModel = new mongoose.Schema<TSemesterRegistration>({
    academicSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minCredit: {
        type: Number,
        required: true,
        default: 3,
    },
    maxCredit: {
        type: Number,
        required: true,
        default: 18,
    }

},
    {
        timestamps: true
    })

export const SemesterRegistration = mongoose.model('SemesterRegistration', semesterRegistrationModel)  