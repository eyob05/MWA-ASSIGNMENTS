var express=require("express");
require("./api/data/db.js");
var bodyParser=require("body-parser")
var routes= require("./api/routes");
var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.set("port",8000);
app.use("/api",routes);
var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listening to port "+port);
})