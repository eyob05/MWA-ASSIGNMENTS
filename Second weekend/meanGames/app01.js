var express=require("express");
require("./api/data/db.js");
var path=require("path");
var bodyParser=require("body-parser")
var routes= require("./api/routes");
var app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));

app.set("port",3000);
app.use("/api",routes);

var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listening to port "+port);
})