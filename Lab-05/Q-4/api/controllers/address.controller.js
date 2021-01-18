var mongoose=require("mongoose");
var Student=mongoose.model("Student");

module.exports.addressGetAll = function (req, res) {
var studentId=req.params.studentId;
Student.findById(studentId).select("addresses").exec(function(err,doc){
    res.status(200).json(doc.addresses);
})
  };


  module.exports.addressGetOne = function (req, res) {
    var studentId = req.params.studentId;
    var addressId=req.params.addressId;
    console.log("GET addressId "+addressId+ " for Student "+studentId);
    Student.findById(studentId).select("addresses").exec(function (err, addresses) {
      console.log(addresses);
      var address=addresses.addresses.id(addressId);
        var response = {
        status: 200,
        message: address,
      };
      if (err) {
        console.log("Error finding address");
        response.status = 500;
        response.message = err;
      } else if (!address) {
        response.status = 404;
        response.message = { message: "Address ID not foud" };
      }
      res.status(response.status).json(response.message);
    });
  };


var _addAddress = function (req, res, student) {
  let address={
    city :req.body.city,
    state:req.body.state,
    zipcode:parseInt(req.body.zipcode),
    street:req.body.street,
  }
console.log(address);
  student.addresses.push(address);
  console.log(student.addresses)

  student.save(function (err, updatedStudent) {
    var response = {
        status: 200,
        message: []
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedStudent.addresses;
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.addressAdd = function (req, res) {
  console.log("Post to add a address");
  var studentId = req.params.studentId;
  Student.findById(studentId)
    .select("addresses")
    .exec(function (err, student) {
      var response = { status: 200, message: [] };
      if (err) {
        console.log("Error finding student");
        response.status = 500;
        response.message = err;
      } else if (!student) {
        console.log("Student id not found in database", studentId);
        response.status = 404;
        response.message = { message: "Student ID not found" };
      }
      if (student) {
        _addAddress(req, res, student);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

var _updateAddress = function (req, res, student) {
  var addressId=req.params.addressId;
  var address=student.addresses.id(addressId);
  address.city = req.body.city;
  address.state=req.body.state;
  address.zipcode=parseInt(req.body.zipcode);
  address.street=req.body.street;
  student.save(function (err, updateStudent) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addressUpdate = function (req, res) {
  var studentId = req.params.studentId;
  console.log("PUT studentId ", studentId);
  Student.findById(studentId).select("addresses").exec(function(err,student){
      var response = { status: 204 };
      if (err) {
        console.log("Error finding student");
        response.status = 500;
        response.message = err;
      } else if (!student) {
        response.status = 404;
        response.message = { message: "Student ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updateAddress(req, res, student);
      }
    });
};

var _deleteAddress = function (req, res, student) {
  var addressId=req.params.addressId;
  student.addresses.id(addressId).remove();
  student.save(function (err, student) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.addressDelete = function (req, res) {
  var studentId = req.params.studentId;
  console.log("PUT studentId", studentId);
  Student.findById(studentId).select("addresses").exec(function(err,student){
      var response = { status: 204 };
      if (err) {
        console.log("Error finding student");
        response.status = 500;
        response.message = err;
      } else if (!student) {
        response.status = 404;
        response.message = { message: "Student ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deleteAddress(req, res, student);
      }
    });
};
