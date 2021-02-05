import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent  {

  constructor(private service:StudentService,private route:Router,private activate:ActivatedRoute) { }
  public students;
  ngOnInit(): void {
    this.route.navigate(['/student/studentdetail'])
  }


  studentDetails(){
    this.route.navigate(['/student/studentdetail'])
  }


  addCourse(){
    console.log("addCourse")
  this.route.navigate(['/student/addcourse']).then(data=>{
    console.log("success")
  }).catch(err=>{
    console.log("failed")
    console.log(err);
  })
}
showAttendance(){
  console.log("showAttendance")
  this.route.navigate(['/student/attendance'])
}
showCourses(){
  console.log("showCurrentCourses")
  this.route.navigate(['/student/course'])

}

  }
