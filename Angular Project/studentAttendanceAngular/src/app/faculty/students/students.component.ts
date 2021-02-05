import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students;
  constructor(private service:StudentService) { }

  ngOnInit(): void {
   this.service.getAllStudents().subscribe(data=>{
     this.students=data;
   })
  }

}
