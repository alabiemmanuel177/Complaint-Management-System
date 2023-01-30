const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
    },
    status: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    complaint: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
