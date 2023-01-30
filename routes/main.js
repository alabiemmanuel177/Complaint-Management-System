const AdminRouter = require("./admin");
const LecturerRouter = require("./lecturer");
const StudentRouter = require("./student");
const AuthRouter = require("./auth");
const ComplaintRouter = require("./complaint");
const FacultyRouter = require("./faculty");
const mainRoute = require("express").Router();

mainRoute.use("/", AuthRouter);
mainRoute.use("/student", StudentRouter);
mainRoute.use("/admin", AdminRouter);
mainRoute.use("/lecturer", LecturerRouter);
mainRoute.use("/complaint", ComplaintRouter);
mainRoute.use("/faculty", FacultyRouter);

module.exports = mainRoute;
