const AdminRouter = require("./admin");
const LecturerRouter = require("./lecturer");
const StudentRouter = require("./student");
const AuthRouter = require("./auth");
const ComplaintRouter = require("./complaint");
const FacultyRouter = require("./faculty");
const CommentRouter = require("./comment")

const routes = ({ app, io }) => {
app.use("/", AuthRouter);
app.use("/student", StudentRouter);
app.use("/admin", AdminRouter);
app.use("/lecturer", LecturerRouter);
app.use("/complaint", ComplaintRouter);
app.use("/faculty", FacultyRouter);
app.use("/comment", CommentRouter);
}

module.exports = { routes };
