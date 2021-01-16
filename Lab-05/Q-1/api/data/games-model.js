var mongoose = require("mongoose");

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

     //publisher: publisherSchema
        
});

mongoose.model("Game", gameSchema, "games");  //if not provided then MongoDB name is Games