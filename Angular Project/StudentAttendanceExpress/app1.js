require("./api/data/db");
var express = require("express");
var routes = require("./api/routes")
var path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json())
app.set("port", 3000);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api", function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
     res.header("Access-Control-Allow-Headers","Origin,x-Requested-With,content-Type,Accept");
    next();
});
app.use("/api",routes)
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
})

