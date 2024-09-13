const express = require("express");
const coursesController = require("./courses.controller");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .delete(coursesController.deleteCourse)
  .patch(coursesController.updateCourse);

module.exports = router;
