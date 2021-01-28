var mongoose=require("mongoose");
var userSchema=new mongoose.Schema({
    studentId:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
mongoose.model("USER",userSchema,"users");