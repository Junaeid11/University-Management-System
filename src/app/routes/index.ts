import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRouter } from "../modules/User/user.route";
import { academicSemesterRoutes as AcademicSemesterRoutes } from "../modules/academicSemester/AC.route";
import { AcademicFacultyRoutes } from "../modules/AcademicFaculty/AF.route";
import { AcademicDepartmentRoutes } from "../modules/AcademicDepartment/AD.route";


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
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
]


moduleRoutes.forEach(route =>{
    router.use(route.path, route.route)
})

export default router