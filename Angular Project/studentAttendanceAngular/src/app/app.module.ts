import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { StudentsComponent } from './faculty/students/students.component';
// import { AttendanceComponent } from './faculty/attendance/attendance.component';
// import { CoursesComponent } from './faculty/courses/courses.component';
// import { StudentHomeComponent } from './student/student-home/student-home.component';
// import { FacultyComponentComponent } from './faculty/faculty-component/faculty-component.component';
// import { StudentComponentComponent } from './student/student-component/student-component.component';
// import { AddCourseComponent } from './student/add-course/add-course.component';
//  import { AttendanceComponent } from './student/attendance/attendance.component';
// import { CoursesComponent } from './student/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    // StudentsComponent,
    // AttendanceComponent,
    // CoursesComponent
    // StudentHomeComponent,
    // AddCourseComponent,
    //  AttendanceComponent,
    // CoursesComponent
    // FacultyComponentComponent,
    // StudentComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"faculty", loadChildren: () => import("./faculty/faculty-module/faculty-module.module").then(m => m.FacultyModuleModule) },
      {path:"student", loadChildren: () => import("./student/student-module/student-module.module").then(m => m.StudentModuleModule) }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
