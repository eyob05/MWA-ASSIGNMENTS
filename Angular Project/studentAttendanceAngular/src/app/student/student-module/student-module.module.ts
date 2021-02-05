import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentComponentComponent } from '.././student-component/student-component.component';
import { AddCourseComponent } from '.././add-course/add-course.component';
import { AttendanceComponent } from '.././attendance/attendance.component';
import { CoursesComponent } from '.././courses/courses.component';
import { StudentHomeComponent } from '.././student-home/student-home.component';

@NgModule({
  declarations: [StudentComponentComponent,AddCourseComponent,AttendanceComponent,CoursesComponent,StudentHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:StudentHomeComponent,children:[
      {path:"studentdetail",component:StudentComponentComponent},
      {path:'addcourse',component:AddCourseComponent},
      {path:'attendance',component:AttendanceComponent},
      {path:'course',component:CoursesComponent}]}
    ])
  ]
})
export class StudentModuleModule { }
