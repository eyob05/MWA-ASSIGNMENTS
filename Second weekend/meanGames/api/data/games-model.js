const { ObjectID } = require("mongodb");
var mongoose=require("mongoose");
var publisherSchema=new mongoose.Schema({
    name:String,
    country:{
        type:Number,
        required:false

    },
    established:{
        type:Date,
        required:false
    },
    // locationSchema.index({coords: '2dsphere'});
    location:{
        // address:String,
        coordinates:{
            type:[Number]
            // index="2dsphere"
        }
    }
})

var reviewSchema=new mongoose.Schema({
    
    id :{
        type: ObjectID,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:false
    },
    review:{
        type:String,
        required:false
    },
    createdOn:{
        type:Date,
        required:false
    }

})

var gameSchema=mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    price:Number,
    designers:[String],
    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    year:{
        type:Number,
        length:4
    },
    minAge:Number,
    location:{
        address:String,
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }


    },
    designers:[String],
    publisher:publisherSchema,
    reviews:[reviewSchema]
})
mongoose.model("Game",gameSchema,"games");