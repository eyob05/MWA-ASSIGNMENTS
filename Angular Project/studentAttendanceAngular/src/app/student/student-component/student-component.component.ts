import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnInit {
  public students;

  constructor(private service:StudentService,private route:Router) { }

  ngOnInit(): void {
    this.service.getStudent().subscribe(data=>{
      console.log("success")
      this.students=data;
      console.log(data)
    })
  }
//   addCourse(){
//     console.log("addCourse")
//   this.route.navigate(['/student/addcourse']).then(data=>{
//     console.log("success")
//   }).catch(err=>{
//     console.log("failed")
//     console.log(err);
//   })
// }

// showCurrentCourses(){
//   console.log("showCurrentCourses")
//   this.route.navigate(['/student/course'])

// }

}
