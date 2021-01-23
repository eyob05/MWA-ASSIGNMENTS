const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipcode: String
});
var jobSchema = new mongoose.Schema({
    title: String,
    salary: String,
    description: String,
    experience: String,
    skills: [String],
    postDate: Date,
    location: locationSchema
});
mongoose.model("JOB", jobSchema, "jobs");