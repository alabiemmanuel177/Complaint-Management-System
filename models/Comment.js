const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Student", "Lecturer"],
      required: true,
    },
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
