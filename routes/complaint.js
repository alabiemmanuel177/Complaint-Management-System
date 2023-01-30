const router = require("express").Router();
const Complaint = require("../models/Complaint");

//CREATE COMPLAINTS
router.post("/", async (req, res) => {
  const newComplaint = new Complaint(req.body);
  try {
    const savedComplaint = await newComplaint.save();
    return res.status(200).json(savedComplaint);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE COMPLAINTS
router.put("/:id", async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedComplaint);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE COMPLAINTS
router.delete("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    await complaint.delete();
    return res.status(200).json("Complaint has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET COMPLAINTS
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL COMPLAINTS
router.get("/", async (req, res) => {
  try {
    let complaints;
    complaints = await Complaint.find();
    return res.status(200).json(complaints);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//PATCH COMPLAINTS
router.patch("/:id", async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, {
      $push: req.body,
    });
    return res.status(200).json(updatedComplaint);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
