import { TSchedule } from "./OC.interface";



export const hasTimeConflict =(assignSchedules: TSchedule[], newSchedule: TSchedule) =>{
for(const schedule of assignSchedules){
    const existingStartTime = new Date(`01/01/2021 ${schedule.startTime}`)
    const existingEndTime = new Date(`01/01/2021 ${schedule.endTime}`)
    const newStartingTime = new Date(`01/01/2021 ${newSchedule.startTime}`)
     const newEndingTime = new Date(`01/01/2021 ${newSchedule.endTime}`)
 
     if(newStartingTime< existingEndTime && newEndingTime> existingStartTime){
         return true;
 
     }
 }
 return false;
}
