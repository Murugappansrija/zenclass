const mongoose = require("mongoose");


const StudentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentContactNumber: {
    type: String, 
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  primaryLanguage: {
    type: String,
    required: true,
  },
  secondaryLanguage: {
    type: String,
    required: false,
    default: null,
  },
  mentors: {
    type: Array, 
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("student", StudentSchema);