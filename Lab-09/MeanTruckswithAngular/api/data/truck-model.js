var mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    firstName:String,
        
         
    
    lastName: {
        type: String,
         //required: false,
      },
     birthDate: {
         type: Date,
          //required: false,
     },
     address: {
        //required: false,
        street:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
            length:2
        },
        zipcode:{
            type:String,
            max:5,
            min:5
        }
    }
});

const truckSchema = new mongoose.Schema({
    vinNumber: {
        type: Number,
        required: false
    },
    model: {
       type: String,
       required: false
   },
   year: {
       type: String,
       required: false
   },
    mileage: {
        type: Number,
       required:false
    },
    color: {
       type: String,
     required:false
    },
    owner: ownerSchema
    
    });
mongoose.model("Truck", truckSchema, "Trucks");  //if not provided then MongoDB name is Games

