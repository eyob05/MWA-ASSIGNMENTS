var mongoose=require("mongoose");
var addressSchema=new mongoose.Schema({
    street:String,
    city:String,
    state:{
        type:String,
        length:2
    },
    zipcode:{
        type:Number,
        length:5
    }
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
    address:[addressSchema]
   
})
mongoose.model("Student",studentSchema,"Students");
