const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Lecturer = require("../models/Lecturer");

//UPDATE LECTURER
router.put("/:id", async (req, res) => {
  if (req.body.lecturerId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedLecturer = await Lecturer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedLecturer);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can only update your account!");
  }
});

//DELETE LECTURER
router.delete("/:id", async (req, res) => {
  if (req.body.lecturerId === req.params.id) {
    try {
      const lecturer = await Lecturer.findById(req.params.id);
      try {
        await Lecturer.findByIdAndDelete(req.params.id);
        return res.status(200).json("Lecturer has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch {
      return res.status(404).json("Lecturer Cannot be found!");
    }
  } else {
    return res.status(401).json("You can only delete your account!");
  }
});

//GET LECTURER
router.get("/:id", async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    const { password, ...others } = lecturer._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//CHANGE PASSWORD Lecturer
router.post("/change-password", async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    const lecturer = await Lecturer.findOne({ _id: id });

    const isMatch = await bcrypt.compare(oldPassword, lecturer.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    lecturer.password = await bcrypt.hash(newPassword, salt);

    await lecturer.save();
    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
