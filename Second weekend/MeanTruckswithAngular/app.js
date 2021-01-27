var express = require("express");
// const { Db } = require("mongodb");
require("./api/data/db.js");
var bodyParser = require("body-parser");
var routes = require("./api/routes/index");
var app = express();
var path = require("path");
app.use(express.json())
app.set("port", 8080);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));
app.use("/", routes);

var server = app.listen(app.get("port"), function () {
    var port = server.address().port;
    console.log("Listening to port " + port);
});