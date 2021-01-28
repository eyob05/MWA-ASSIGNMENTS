const path=require("path");

 const dispatchpage=function(pageName,res){
    const response={
        status:200,
        message:"home page"
    }
    res.status(response.status).sendFile(path.join(__dirname,"..","..","public","facultypages",pageName))

}
module.exports.facultyLogin=function(req,res){
 dispatchpage("facultylogin.html",res)
}
module.exports.FacultyStudentUpdate=function(req,res){
    dispatchpage("fucultyupdatestudent.html",res)
   }
   module.exports.FacultyMainPage=function(req,res){
    dispatchpage("facultymainpage.html",res)
   }
   module.exports.FacultyAtendance=function(req,res){
    dispatchpage("attendance.html",res)
   }
   module.exports.FacultyDeleteStudent=function(req,res){
    dispatchpage("facultydeleteaccount.html",res)
   }
   module.exports.FacultyAddStudent=function(req,res){
    dispatchpage("facultyaddstudent.html",res)
   }
