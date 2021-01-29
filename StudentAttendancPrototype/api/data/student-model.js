var mongoose=require("mongoose");
var studentSchema=new mongoose.Schema({
    studentId:{
        type:String,
        unique:true,
        required:true
    },
    qrCode:Image,
    firstName:String,
    lastName:String,
    attendance:{
                 status:String,
                 date:date
            }
    })
mongoose.model("STUDENT",studentSchema,"students");