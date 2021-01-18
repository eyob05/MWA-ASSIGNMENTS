var express=require("express");
const { Db } = require("mongodb");
require("./api/data/db.js");
var bodyParser=require("body-parser");
var routes= require("./api/routes/index");
var app=express();
 app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.set("port",5000);
app.use("/",routes);

var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listening to port "+port);
});