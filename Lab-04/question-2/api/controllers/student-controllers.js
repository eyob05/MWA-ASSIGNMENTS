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
        console.log("Found games", students.length);
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