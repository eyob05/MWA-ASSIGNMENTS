var mongoose = require("mongoose");
var Student = mongoose.model("Student");
module.exports.studentsGetAll = function (req, res) {
  var offset = 0;
  var count = 3;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  if (count > 7) {
    count = 7;
  }
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count shoulb be numbers" });
    return;
  }

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, students) {
      if (err) {
        console.log("Found students", students.length);
        res.status(500).json(err);
      } else {
        console.log("Found students", students.length);
        res.json(students);
      }
    });
};
module.exports.studentGetOne = function (req, res) {
  var studentId = req.params.studentId; 
  console.log(studentId);
  Student.findById(studentId).exec(function (err, student) {
    var response = {
      status: 200,
      message: student,
    };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = { message: "Student ID not foud" };
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.studentUpdateOne = function (req, res) {
  var studentId = req.params.studentId;
  Student.findById(studentId)
    .select("-address")
    .exec(function (err, student) {
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
        res.status(response.status).json(respons.message);
      } else {
        student.name = req.body.name;
        student.GPA = parseFloat(req.body.GPA);
        student.save(function (err, updatedStudent) {
          response.message = updatedStudent;
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            res.status(response.status).json(response.message);
          }
        });
      }
    });
};

module.exports.studentsAddOne = function (req, res) {
  console.log("Post to add a student");
  if (req.body) {
    Student.create(
      {
        name: req.body.name,
        GPA: req.body.GPA
      },
      function (err, student) {
        const response = {
          status: 201,
          message: student,
        };
        if (err) {
          response.status = 400;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      }
    );
  } else {
    console.log("Data missing from POST body");
    res.status(400).json({ error: "Required data" });
  }
};

module.exports.studentsDeleteOne = function (req, res) {
  var studentId = req.params.studentId;
  console.log("DELETE studentId ", studentId);
  Student.findByIdAndRemove(studentId).exec(function (err, deletedStudent) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      response.status = response.message = { message: "Student ID not found" };
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
