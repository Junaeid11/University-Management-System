export type TUser = {
    id: string;
    password: string;
    needChangePassword: boolean;
    role: 'admin' | 'faculty' | 'student';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}
export type NewUser = {
    id: string;
    password: string;
    role: 'admin' | 'faculty' | 'student' ;
    isDeleted: boolean;

}