require("./api/data/db");
var express = require("express");
var routes = require("./api/routes")
var path = require("path");
var bodyParser = require("body-parser");

const app = express();

app.set("port", 3000);

//app.use(bodyParser.json)
app.use(express.json())


app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/", routes);

var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
})

