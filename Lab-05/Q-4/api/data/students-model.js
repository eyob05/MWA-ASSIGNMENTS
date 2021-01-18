var mongoose=require("mongoose");
var {ObjectID}=require("mongodb")
var addressSchema=new mongoose.Schema({
    id:{
        type:ObjectID,
        required:false
    },
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
    GPA:{
        type:Number,
        min:0,
        max:4
    },
    addresses:[addressSchema]
   
})
mongoose.model("Student",studentSchema,"Students");