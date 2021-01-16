var mongoose = require("mongoose");

// const publisherSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
    
//     },
//     country: {
//         type: String,
//         required: false,

//     },
//      established: {
//          type: Date,
//          required: false,
//      },
//      location: {
//          required:false,
//         coordinates:{
//              type: [Number] // long (E/W), lat(N/S)
//             //  index: "2dshpere" //this will take the earth curvature into consideration

//          }
//      }
// });

const gameSchema = new mongoose.Schema({
     title: {
         type: String,
        //  required: true
     },
     price: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1 
    },
     minPlayers: {
         type: Number,
         min: 1,
         max: 10
     },
     maxPlayers: {
        type: Number,
        min: 1,
        max: 10
     },
     minAge: Number,
     designers: [String],
     publisher:{
         required:false,
         name:String,
         location:{
             coordinates:[Number]
             
         }
     }
     //publisher: publisherSchema
        
});

mongoose.model("Game", gameSchema, "games");  //if not provided then MongoDB name is Games