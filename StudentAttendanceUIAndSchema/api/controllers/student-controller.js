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
