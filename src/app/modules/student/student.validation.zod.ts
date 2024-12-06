import { z } from 'zod';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required.')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be capitalized.' }
    ),
  middleName: z.string().nonempty('Middle name is required.'),
  lastName: z
    .string()
    .nonempty('Last name is required.')
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: 'Last name should only contain alphabets.' }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required.')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be capitalized.' }
    ).optional(),
  middleName: z.string().nonempty('Middle name is required.').optional(),
  lastName: z
    .string()
    .nonempty('Last name is required.')
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: 'Last name should only contain alphabets.' }).optional(),
});

// Guardian schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father\'s name is required.').optional(),
  fatherOccupation: z.string().nonempty('Father\'s occupation is required.').optional(),
  fatherContactNumber: z.string().nonempty('Father\'s contact number is required.').optional(),
  motherName: z.string().nonempty('Mother\'s name is required.').optional(),
  motherOccupation: z.string().nonempty('Mother\'s occupation is required.').optional(),
  motherContactNumber: z.string().nonempty('Mother\'s contact number is required.').optional(),
});
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father\'s name is required.'),
  fatherOccupation: z.string().nonempty('Father\'s occupation is required.'),
  fatherContactNumber: z.string().nonempty('Father\'s contact number is required.'),
  motherName: z.string().nonempty('Mother\'s name is required.'),
  motherOccupation: z.string().nonempty('Mother\'s occupation is required.'),
  motherContactNumber: z.string().nonempty('Mother\'s contact number is required.'),
});

// Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian\'s name is required.'),
  occupation: z.string().nonempty('Local guardian\'s occupation is required.'),
  contactNumber: z.string().nonempty('Local guardian\'s contact number is required.'),
  address: z.string().nonempty('Local guardian\'s address is required.'),
  profileImage: z.string().url('Profile image URL is invalid.').optional(),
  isActivate: z.enum(['Yes', 'blocked'], {
    errorMap: () => ({ message: 'Local guardian activation status is required and must be Yes or blocked.' }),
  }),
});
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian\'s name is required.').optional(),
  occupation: z.string().nonempty('Local guardian\'s occupation is required.').optional(),
  contactNumber: z.string().nonempty('Local guardian\'s contact number is required.').optional(),
  address: z.string().nonempty('Local guardian\'s address is required.').optional(),
  profileImage: z.string().url('Profile image URL is invalid.').optional(),
  isActivate: z.enum(['Yes', 'blocked'], {
    errorMap: () => ({ message: 'Local guardian activation status is required and must be Yes or blocked.' }),
  }).optional(),
});

// Main Student schema
export const createStudentValidationSchema = z.object({
  body:  z.object({
    password: z.string().nonempty('Student ID is required.'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female'], { errorMap: () => ({ message: 'Gender is required and must be Male or Female.' }) }),
      age: z.number().nonnegative('Age must be a positive number.').int('Age must be an integer.'),
      dateOfBirth: z.string().nonempty('Date of birth is required.'),
      email: z
        .string()
        .nonempty('Email is required.')
        .email('Vhai tmr email Vul thik koro'),
      contactNumber: z.string().nonempty('Contact number is required.'),
      emergencyContactNumber: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Invalid blood group.' }),
      }).optional(),
      presentAddress: z.string().nonempty('Present address is required.'),
      permanentAddress: z.string().nonempty('Permanent address is required.'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema.optional(),
      admissionSemester: z.string(),
    })
  })
  
})
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: z.enum(['Male', 'Female'], {
          errorMap: () => ({
            message: 'Gender must be Male or Female.',
          }),
        }).optional(),
        age: z.number().nonnegative('Age must be a positive number.').int('Age must be an integer.').optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email('Invalid email format.').optional(),
        contactNumber: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({
            message: 'Invalid blood group.',
          }),
        }).optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
      })
      .optional(),
  }),
});
// Export the Zod schema
export const  studentValidation = {
createStudentValidationSchema,
updateStudentValidationSchema
};
