var express=require("express");
var router=express.Router();
var studentcontroller=require("../controllers/student-controller");
var facultycontroller=require("../controllers/faculty-controller");

router.route("/studentlogin")
                        .get(studentcontroller.studentLogin);

router.route("/createStudent")
                        .get(studentcontroller.createNewStudent);

router.route("/studentmainpage")
                        .get(studentcontroller.StudentMainPage);

router.route("/studentupdate")
                        .get(studentcontroller.StudentUpdate);

router.route("/studentdelete")
                        .get(studentcontroller.StudentDelete);

router.route("/studentqrcode")
                        .get(studentcontroller.StudentQrcode);


router.route("/facultylogin")
                        .get(facultycontroller.facultyLogin);

router.route("/facultymainpage")
                        .get(facultycontroller.FacultyMainPage);

router.route("/atendance")
                        .get(facultycontroller.FacultyAtendance);

router.route("/facultystudentupdate")
                        .get(facultycontroller.FacultyStudentUpdate);

router.route("/facultydeletestudent")
                        .get(facultycontroller.FacultyDeleteStudent);

router.route("/facultyAddstudent")
                        .get(facultycontroller.FacultyAddStudent);


module.exports=router;

