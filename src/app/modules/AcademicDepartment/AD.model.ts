import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./AD.interface";
import { APPerror } from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" }
}, {
    timestamps: true
}
);

academicDepartmentSchema.pre("save", async function (next) {

    const isDepartment = await AcademicDepartment.findOne({ name: this.name })

    if (isDepartment) {
        throw new Error("Department already exists")
    }
    next()
}
)




academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne({ name: query})
    if (!isDepartmentExist) {
        throw new APPerror(httpStatus.NOT_FOUND,"Department does not exist")
    }
    next()

})

export const AcademicDepartment = model<TAcademicDepartment>(
    "AcademicDepartment",
    academicDepartmentSchema
)