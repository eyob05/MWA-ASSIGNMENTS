import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: String = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  getStudent() {
    return this.http.get(this.baseUrl + "api/students/601c93e4113a9e1b210d197c");
  }

  getCourses() {
    return this.http.get(this.baseUrl + "api/students/601c93e4113a9e1b210d197c");
  }

  getAttendance() {

    return this.http.get(this.baseUrl + "api/students/601c93e4113a9e1b210d197c");
  }
  getAllStudents() {
    return this.http.get(this.baseUrl + "api/students");
  }
}
