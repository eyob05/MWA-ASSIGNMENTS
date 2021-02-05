var express = require("express");
var router = express.Router();
var studentcontrollers =require("../controllers/students-controllers");


router.route("/students")
                         .get(studentcontrollers.getAllStudents)
                         .post(studentcontrollers.addNewStudent);
router.route("/students/:studentId")
                                 .put(studentcontrollers.UpdateStudent)
                                 .get(studentcontrollers.getOneStudent)
                                 .delete(studentcontrollers.DeleteStudent);

module.exports=router;