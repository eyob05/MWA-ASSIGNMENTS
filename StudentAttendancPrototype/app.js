var express = require("express");
var path = require("path");
const routes=require("./api/routes")
var app = express();
var bodyParser=require("body-parser");
app.set("port", 5000);
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use("/api",routes)
app.use(express.static(path.join(__dirname, "public")));
var server = app.listen(app.get("port"), function () {
    var port = server.address().port;
    console.log("Listening to port " + port);
});