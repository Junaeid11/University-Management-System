import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRouter } from "../modules/User/user.route";
import { academicSemesterRoutes as AcademicSemesterRoutes } from "../modules/academicSemester/AC.route";
import { AcademicFacultyRoutes } from "../modules/AcademicFaculty/AF.route";
import { AcademicDepartmentRoutes } from "../modules/AcademicDepartment/AD.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { semesterRegistrationRoutes } from "../modules/SemesterRegistration/SR.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OC.route";
import { AuthRoute } from "../modules/Auth/auth.route";


const router = Router()
const moduleRoutes =[
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/students',
        route: StudentRoute
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes
    },
    {
        path: '/admins',
        route: AdminRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    },
    {
        path: '/auth',
        route: AuthRoute
    },
]


moduleRoutes.forEach(route =>{
    router.use(route.path, route.route)
})

export default router