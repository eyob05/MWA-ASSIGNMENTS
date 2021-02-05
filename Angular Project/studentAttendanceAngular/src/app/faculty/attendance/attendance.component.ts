import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
 public student;
 public dto={name:String, absents:Number};
  constructor(private service:StudentService) { }

  ngOnInit(): void {
  this.service.getAllStudents().subscribe(data=>{
    this.student=data;
    
    
  //     for(let i=0;i<this.student.length;i++){
  //       const ob={
  //         firstName:'simon'
  //       }
  //           stu[i]={"name:9};
  //     }
  //   const studentAttendance={name:this.student.name, absentdays:7};
  // })
  
  })
  }
}
