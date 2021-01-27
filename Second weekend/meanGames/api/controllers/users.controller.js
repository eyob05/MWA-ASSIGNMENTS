var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
const { response } = require("express");

module.exports.register = function (req, res) {
  console.log("Registering user");
  var username = req.body.username;
  var name = req.body.name || null;
  var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(
    { username: username, name: name, password: password },
    function (err, user) {
      var response = {
        message: user,
        status: 200,
      };
      if (err) {
        response.message = err;
        response.status = 400;
      }else{
              console.log("user Created", user);
      res.status(response.status).json(response.message);
      }

    }
  );
};

module.exports.login = function (req, res) {
  console.log("Logging in user");
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }).exec(function (err, user) {
    var response = {
      message: user,
      status: 200,
    };
    if (err) {
      response.message = err;
      response.status = 400;
    } else if (!user) {
      response.message = { message: "Unauthorized" };
      response.status = 400;
    } else if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log("user found", user);
        var token = jwt.sign({ username: user.username }, "cs572", {
          expiresIn: 3600,
        });
        response.message = { success: true, token: token };
        response.status = 200;
      } else {
        response.message = { message: "Unauthorized" };
        response.status = 401;
      }
    }
    console.log("user found", user);
    res.status(response.status).json(response.message);
  });
};

module.exports.authenticate = function (req, res, next) {
  var headerExist = req.headers.authorization;
  var response = {
    message: "",
    status: "",
  };
  if (headerExist) {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "cs572", function (err, decoded) {
      if (err) {
        response.message = { message: "Unauthorized" };
        response.status = 401;
        res.status(response.status).json(response.message);
        
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    response.status = 403;
    response.message = { message: "No token provided" };
     res.status(response.status).json(response.message);
  }
 
};
