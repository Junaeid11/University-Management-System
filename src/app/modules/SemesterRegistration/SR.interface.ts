import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId,
    status: 'Upcoming' | 'Ongoing' | 'Completed',
    startDate: Date,
    endDate: Date,
    minCredit: number,
    maxCredit: number,
}