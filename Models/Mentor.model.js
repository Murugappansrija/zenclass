
const mongoose = require('mongoose')


const MentorSchema = mongoose.Schema({
  
    mentorName: {
      type: String,
      required: true,
    },
    mentorEmail: {
      type: String,
      required: true,
    },
    mentorContactNumber: {
      type: String, 
      required: true,
    },
    skills: {
      type: Array,
      required: false,
      default: null,
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
  });
  
  module.exports = mongoose.model("mentor", MentorSchema);