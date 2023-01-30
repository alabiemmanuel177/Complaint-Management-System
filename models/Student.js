const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
    },
    otp: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    matricno: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
