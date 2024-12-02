import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./AC.interface";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: ['Autumn', 'Summer', 'Fall']
    },
    code: {
        type: String,
        required: true,
        enum: ['01', '02', '03']
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
            type: String,
            required: true,
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    endMonth: {
            type: String,
            required: true,
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
},
{timestamps: true});

//if any semester exists in same year 
academicSemesterSchema.pre('save',async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if(isSemesterExists){
    throw new Error('Semester already exists in the same year')
  }
  next()

})



export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
