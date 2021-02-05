import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
      public stu;
  constructor(private route:Router,private service:StudentService) { }

  ngOnInit(): void {
    
      console.log("entering method")
     this.service.getAttendance().subscribe(data=>{
       console.log(data)
       console.log("attendance recieved") 
       //console.log(data.firstName)
       this.stu=data;
     },err=>{console.log("error attendance")})
    }
  }
  

