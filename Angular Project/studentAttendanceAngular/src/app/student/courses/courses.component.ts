import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
   public student;
  constructor(private route:Router, private service:StudentService) { }

  ngOnInit(): void {
 this.service.getCourses().subscribe(data=>{
   this.student=data;
 })
  }

}
