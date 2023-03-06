const router = require("express").Router();
const Complaint = require("../models/Complaint");
const Student = require("../models/Student");

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

//route to get complaint for a particular student
router.get("/:studentId/complaints", async (req, res) => {
  try {
    // Get the student ID from the request parameters
    const { studentId } = req.params;

    // Find the student
    const student = await Student.findById(studentId);
    // If the student is not found, return an error
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    //Find Complaint by student
    const studentComplaint = await Complaint.find({ student: studentId });

    return res.json({
      student: student,
      complaint: studentComplaint,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route to accepct complaint
router.patch("/:id/accept", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "Settled" },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).send({ error: "Complaint not found" });
    }
    res.send(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

// PATCH route to update the status of a complaint to "Denied"
router.patch("/:id/deny", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "Denied" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).send({ error: "Complaint not found" });
    }

    res.send(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
