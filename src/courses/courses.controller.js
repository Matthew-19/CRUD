let { courses } = require("../courses/courses.data");
const Course = require("../../models/courses.model");

const queryProjection = { __v: false };

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, queryProjection);
    res.status(200).json({ status: "success", data: courses });
  } catch (err) {
    res.json({ status: "fail", data: err });
  }
};

const getCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id, queryProjection);
    res.status(200).json({ state: "success", data: course });
  } catch (err) {
    res.status(404).json({ state: "fail", data: err });
  }
};

const addCourse = async (req, res) => {
  try {
    const courses = await Course.find({}, queryProjection);
    const name = req.body.name.length
      ? req.body.name
      : `course ${courses.length + 1}`;
    const price = req.body.price;
    const newCourse = new Course({ name: name, price: price });
    await newCourse.save();

    res.status(201).json({ status: "success", data: newCourse });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (course) {
      await Course.deleteOne({ _id: id });
      res.status(200).json({
        status: "success",
        data: { msg: "course deleted successfully" },
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", data: { msg: "course does not exist!" } });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const oldCourse = await Course.findById(id);
    const updatedCourse = await Course.updateOne(
      { _id: id },
      {
        $set: {
          name: oldCourse.name,
          price: oldCourse.price,
          ...req.body,
        },
      }
    );
    res.status(200).json({ status: "success", data: updatedCourse });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  deleteCourse,
  updateCourse,
};
