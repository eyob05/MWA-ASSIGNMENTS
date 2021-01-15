var mongoose=require("mongoose");
var addressSchema=new mongoose.Schema({
    street:String,
    city:String,
    state:String,
        zipcode:String,
        
})



var studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gpa:{
        type:Number,
        min:0,
        max:4
    },
    adress:[addressSchema]
   
})
mongoose.model("Student",studentSchema,"Students");
