import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-faculty-component',
  templateUrl: './faculty-component.component.html',
  styleUrls: ['./faculty-component.component.css']
})
export class FacultyComponentComponent implements OnInit {

  constructor(private route:Router,private service:StudentService) { }

  ngOnInit(): void {
    this.route.navigate(['/faculty/students'])
  }
  students(){
    this.route.navigate(['/faculty/students'])
  }
  studentsAttendance(){
    this.route.navigate(['/faculty/attendance'])
  }
  studentsCourses(){
    this.route.navigate(['/faculty/courses'])
  }
  
}
