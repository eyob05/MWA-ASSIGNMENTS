const { off } = require("process");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.getAllStudents = function(req, res){
    var offset = 0;
    var count = 5;
    const maxCount = 10;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        // if(count > 7){
        //     count = 7;
        // }
    };

    console.log(count);
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "QueryString offset and count should be numbers"})
        return;
    }

    if(count>maxCount){
        res.status(400).json({"message": "Count exceded the max number of 7"})
         return;
    }

    //using mongooose
    Student.find().skip(offset).limit(count).exec(function(err, Students){
        const response = {
            status: 200,
            message: Students
        }
        if(err){
            console.log("Error finding Studentsss ");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        }
    )
    
}
//Add new Student
module.exports.addNewStudent = function (req, res) {
    console.log("post to add a Student");
    //  if (req.body && req.body.title && req.body.price) {
        Student.create({
            studentId:req.body.studentId,
            qrCode:req.body.qrCode,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            course:req.body.course,
            attendance:req.body.attendance,
            //designers:req.body.designers

        },
        function(err,Students){
            var response= {
                status: 200,
                message: Students
            }
            if (err) {
                console.log("Error finding Student",err);
                response.status=500;
                response.message= err;
            }
            
            res.status(response.status).json(response.message);
        });
        // }else {
        //     console.log("data is missing from POST body")
        //     res.status(400).json({ error: "required data missing from POST" })
    //  }
}

    module.exports.UpdateStudent = function(req, res) {
    
        console.log("post to find ");
        var StudentId = req.params.StudentId;
        console.log(StudentId)
    
        Student.findById(StudentId).select("-review -publisher").exec(function (err, Students) {
            var response= {
                status: 200,
                message: Students
            }
            if (err) {
                console.log("Error finding Student",err);
                response.status=500;
                response.message= err;
    
            }else if(!Students) {
                response.status=404;
                response.message= {"message" : "Student ID not found"};
                } 
                if(response.status!==204){
                res.status(response.status).json(response.message);
            }
            else{
                Students.title=req.body.title;
                Students.price=parseInt(req.body.price);
                Students.rate=parseFloat(req.body.rate);
                Students.minPlayers=parseInt(req.body.minPlayers);
                Students.maxPlayers=parseInt(req.body.maxPlayers);
                Students.minAge=parseInt(req.body.minAge);
                Students.designers=req.body.designers;
                Students.save(function(err,Students){
                    if (err) {
                        console.log("Error finding Student",err);
                        response.status=500;
                        response.message= err;
                    }
                    console.log(response.message)
                    res.status(response.status).json(response.message)
                })
                
            }
            
        })   
        
    };

    module.exports.DeleteStudent = function(req, res) {
        console.log("delete find");
        var StudentId = req.params.StudentId;
    console.log(StudentId)
        Student.findOneAndDelete(StudentId).exec(function (err, deleteStudents) {
            var response= {
                status: 204,
                message: deleteStudents
            }
            if (err) {
                console.log("Error finding Student",err);
                response.status=500;
                response.message= err;
    
            }else if(!deleteStudents) {
                response.status=404;
                response.message= {"message" : "Student ID not found"};
                } 
                res.status(response.status).json(response.message)
                
        })
    
    };

module.exports.getOneStudent = function(req, res){
    const StudentId = req.params.studentId;

    console.log("Student ID is" , StudentId)

    Student.findById(StudentId).exec(function(err, Students){
        console.log(Students);
        const response = {
            status: 200,
            message: Students
        }
        if(err){
            console.log("Found Errors ", err);
            response.status = 500;
            response.message = err;
        }else if(!Students){
            response.status = 404;
            response.message = {"message" :"Student ID not found"};
        }
            res.status(response.status).json(response.message);  
     });
};