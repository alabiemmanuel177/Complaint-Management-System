const router = require("express").Router();
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const Lecturer = require("../models/Lecturer");

//REGISTER ADMIN
router.post("/register/admin", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email
    });
    const admin = await newAdmin.save();
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//REGISTER STUDENT
router.post("/register/student", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newStudent = new Student({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPass,
      level: req.body.level,
      otp: req.body.otp,
      email: req.body.email,
      matricno: req.body.matricno,
      status: req.body.status,
    });
    const student = await newStudent.save();
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//REGISTER LECTURER
router.post("/register/lecturer", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newLecturer = new Lecturer({
      name: req.body.name,
      password: hashedPass,
      faculty: req.body.department,
      email: req.body.email,
    });
    const lecturer = await newLecturer.save();
    return res.status(200).json(lecturer);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//LECTURER LOGIN
router.post("/login/lecturer", async (req, res) => {
  try {
    const lecturer = await Lecturer.findOne({ email: req.body.email });
    if (!lecturer) {
      return res.status(400).json("Wrong credential");
    }
    const validated = await bcrypt.compare(
      req.body.password,
      lecturer.password
    );
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }
    const { password, ...others } = lecturer._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//STUDENT LOGIN
router.post("/student/login", async (req, res) => {
  try {
    const student = await Student.findOne({ matricno: req.body.matricno });
    if (!student) {
      return res.status(400).json("No Student with this Matric No");
    }
    const validated = await bcrypt.compare(req.body.password, student.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }
    const { password, ...others } = student._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ADMIN LOGIN
router.post("/login/admin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json("Wrong credential");
    }
    const validated = await bcrypt.compare(req.body.password, admin.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }
    const { password, ...others } = admin._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
