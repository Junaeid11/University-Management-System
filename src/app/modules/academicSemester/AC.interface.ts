type TMonth ={
    name: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December',
}


export type TAcademicSemester = {
    name: 'Autumn' |'Summer' | 'Fall' ,
    code: '01' | '02' | '03',
    year: string,
    startMonth: TMonth;
    endMonth: TMonth;
}
export type TAcademicSemesterNameCodeName ={
    [key: string]: string
}
export const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeName = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
} 