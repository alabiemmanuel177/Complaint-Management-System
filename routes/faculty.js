const router = require("express").Router();
const Faculty = require("../models/Faculty");

//CREATE FACULTY
router.post("/", async (req, res) => {
  const newFaculty = new Faculty(req.body);
  try {
    const savedFaculty = await newFaculty.save();
    return res.status(200).json(savedFaculty);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE FACULTY
router.put("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedFaculty);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE FACULTY
router.delete("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    await faculty.delete();
    return res.status(200).json("Faculty has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET FACULTY
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    return res.status(200).json(faculty);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL FACULTY
router.get("/", async (req, res) => {
  try {
    let faculties;
    faculties = await Faculty.find();
    return res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PATCH FACULTY
router.patch("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, {
      $push: req.body,
    });
    return res.status(200).json(updatedFaculty);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
