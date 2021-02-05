import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public courses;

  constructor(private backendService:StudentService,private router:Router,private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("inside Add Course")
    this.backendService.getCourses().subscribe(data=>{
      console.log("success")
      this.courses=data;
    })
  }

}
