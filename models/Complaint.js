/* Creating a schema for the Complaint model. */
const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    status: {
      type: String,
      required: true,
      enum: ["Settled", "Pending", "Denied"],
      default: "Pending",
    },
    complaint: {
      type: String,
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
