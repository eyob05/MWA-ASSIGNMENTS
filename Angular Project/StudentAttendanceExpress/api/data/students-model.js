var mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
     attendDate: Date,
     status: String
});

const courseSchema = new mongoose.Schema({
    courseTitle: String,
    courseCode: String,
    startingDate:Date,
    endingDate:Date
});


const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
    },
    qrCode: String,
    firstName: String,
    lastName: String,
    course:[courseSchema],
    attendance:[attendanceSchema]
});
mongoose.model("Student", studentSchema, "students");  //if not provided then MongoDB name is students