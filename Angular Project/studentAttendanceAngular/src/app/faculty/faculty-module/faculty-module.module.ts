import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FacultyComponentComponent } from '.././faculty-component/faculty-component.component';
import { StudentsComponent } from '.././students/students.component';
import { AttendanceComponent } from '.././attendance/attendance.component';
import { CoursesComponent } from '.././courses/courses.component';




@NgModule({
  declarations: [FacultyComponentComponent,StudentsComponent,AttendanceComponent,CoursesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:FacultyComponentComponent,children:[
        {path:"students",component:StudentsComponent},
        {path:'attendance',component:AttendanceComponent},
        {path:'courses',component:CoursesComponent}]}

    ])
  ]
})
export class FacultyModuleModule { }
