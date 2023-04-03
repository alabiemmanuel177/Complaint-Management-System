const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const Comment = require("../models/Comment");

// Post a comment on a complaint
router.post("/:id/comments", async (req, res) => {
  try {
    const { comment, student } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    const newComment = new Comment({
      comment,
      student,
      complaint: complaint._id,
    });
    await newComment.save();
    complaint.comments.push(newComment);
    await complaint.save();
    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//UPDATE COMMENTS
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedComment);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    let comment;
    comment = await Comment.find();
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate({
      path: "userId",
      model: req.query.userType === "student" ? Student : Lecturer,
    });

    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await comment.delete();
    return res.status(200).json("Comment has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
