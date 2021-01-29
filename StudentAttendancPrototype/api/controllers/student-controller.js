const path=require("path");

 const dispatchpage=function(pageName,res){
    const response={
        status:200,
        message:"home page"
    }
    res.status(response.status).sendFile(path.join(__dirname,"..","..","public","studentpages",pageName))

}
module.exports.studentLogin=function(req,res){
 dispatchpage("index.html",res)
}
module.exports.createNewStudent=function(req,res){
    dispatchpage("createnewstudent.html",res)
   }
   module.exports.StudentMainPage=function(req,res){
    dispatchpage("studentmain.html",res)
   }
   module.exports.StudentUpdate=function(req,res){
    dispatchpage("updatestudent.html",res)
   }
   module.exports.StudentDelete=function(req,res){
    dispatchpage("deletedaccount.html",res)
   }
   module.exports.StudentQrcode=function(req,res){
    dispatchpage("qrcodeandnumber.html",res)
   }
   //-----------------------------------------------------------------------------------
   var Student=[{
    studentId:"110931",
    firstName:"eyob",
    lastName:"weldeyohannes",
    attendance:{
        status:"present",
        date:"2020-02-04"
   }
   },
   {
    studentId:"110956",
    firstName:"eyob",
    lastName:"weldeyohannes",
    attendance:{
        status:"present",
        date:"2020-02-04"
   }

}]
   module.exports.getAllStudents = function (req, res) {
             const response={
                 status:200,
                 message:Student
             }

res.status(response.status).json(response.message)
   }

   module.exports.createNewStudent = function (req, res) {
    const response={
        status:200,
        message:"Account Created Successfully"
    }
    console.log(req.body)
    const student={
         studentId: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        attendance: req.body.attendance
    }
    Student.push(student);

res.status(response.status).json(response.message)
}
module.exports.studentUpdate = function (req, res) {
    const studentId=req.params.studentId;
    
   const response={
          status:200,
        message:"Account Updated Successfully"
    }
    const oneStudent=Student.filter(stu=>stu.studentId==studentId);
   
  
        oneStudent.studentId=req.body.studentId,
        oneStudent.firstName=req.body.firstName,
        oneStudent.lastName=req.body.lastName,
        oneStudent.attendance=req.body.attendance
        console.log(oneStudent)
   Student.push(oneStudent);
   
res.status(response.status).json(oneStudent)
}
module.exports.StudentGetOne = function (req, res) {
    const studentId=req.params.studentId;
    const response={
        status:200,
        message:""
    }
    const oneStudent=Student.filter(stu=>stu.studentId==studentId);
    res.status(response.status).json(oneStudent)
}

module.exports.studentDelete = function (req, res) {
    const studentId=req.params.studentId;
    console.log(studentId)
    const response={
        status:200,
        message:"Student deleted successfully with id "+studentId
    }
    var index=-1;
    const oneStudent=Student.filter(stu=>{
        if(stu.studentId==studentId){
            index++;
        }
    });
    // Student.pop(oneStudent);
    delete Student[index];
    console.log(Student)
    res.status(response.status).json(response.message)
}
