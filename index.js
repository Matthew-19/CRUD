const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const coursesRouter = require("./src/courses/courses.services");
app.use("/api/courses", coursesRouter);

const db_uri = "mongodb://127.0.0.1:27017/courses";
mongoose
  .connect(db_uri)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("database connection err: ", err));

app.listen(5000, () => {
  console.log("listening on port 5000");
});
