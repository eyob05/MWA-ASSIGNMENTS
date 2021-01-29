var express=require("express");
var router=express.Router();
var studentcontroller=require("../controllers/student-controller");
var facultycontroller=require("../controllers/faculty-controller");

router.route("/studentlogin")
                        .get(studentcontroller.studentLogin);

router.route("/createStudent")
                        .post(studentcontroller.createNewStudent);

router.route("/studentmainpage")
                        .get(studentcontroller.getAllStudents);

router.route("/studentupdate/:studentId")
                        .put(studentcontroller.studentUpdate);

router.route("/studentdelete/:studentId")
                        .delete(studentcontroller.studentDelete);

router.route("/studentgetone/:studentId")
                        .get(studentcontroller.StudentGetOne);


// router.route("/facultylogin")
//                         .get(facultycontroller.facultyLogin);

// router.route("/facultymainpage")
//                         .get(facultycontroller.FacultyMainPage);

// router.route("/atendance")
//                         .get(facultycontroller.FacultyAtendance);

// router.route("/facultystudentupdate")
//                         .get(facultycontroller.FacultyStudentUpdate);

// router.route("/facultydeletestudent")
//                         .get(facultycontroller.FacultyDeleteStudent);

// router.route("/facultyAddstudent")
//                         .get(facultycontroller.FacultyAddStudent);


module.exports=router;

