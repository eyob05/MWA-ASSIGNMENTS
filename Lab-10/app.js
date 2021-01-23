var express = require("express");
const { Db } = require("mongodb");
require("./api/data/db.js");
var bodyParser = require("body-parser");
var routes = require("./api/routes/index.js");
var app = express();
var path = require("path");
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", 5000);

app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

var server = app.listen(app.get("port"), function () {
    var port = server.address().port;
    console.log("Listening to port " + port);
});
