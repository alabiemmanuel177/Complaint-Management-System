const router = require("express").Router();
const Comment = require("../models/Comment");

//CREATE COMMENT
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    return res.status(200).json(savedComment);
  } catch (err) {
    return res.status(500).json(err);
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