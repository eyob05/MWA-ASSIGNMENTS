var express=require("express");
require("./api/data/db.js");
var routes= require("./api/routes");
var app=express();
app.set("port",3000);
app.use("/api",routes);
var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listening to port "+port);
})
