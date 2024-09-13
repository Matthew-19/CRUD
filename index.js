const express = require("express");

const app = express();
app.use(express.json());

let courses = [
  {
    id: 1,
    name: "course 1",
    price: 100,
  },
  {
    id: 2,
    name: "course 2",
    price: 200,
  },
];

app.get("/courses", (req, res) => {
  res.status(200).json(courses);
});

app.get("/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((course) => course.id === id);

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).json({ msg: "course not found" });
  }
});

app.post("/courses", (req, res) => {
  const name = req.body.name.length
    ? req.body.name
    : `course ${courses.length + 1}`;
  const price = +req.body.price;
  const id = courses.length + 1;
  const newCourse = {
    id: id,
    name: name,
    price: price,
  };

  if (isNaN(price))
    return res.status(400).json({ error: "price must be a number" });

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.delete("/courses/:id", (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) return res.status(400).json({ error: "id must be a number" });
  courses = courses.filter((course) => course.id !== id);
  res.status(200).json(courses);
});

app.patch("/courses/:id", (req, res) => {
  const id = +req.params.id;
  let name = req.body.name ? req.body.name : undefined;
  let price = req.body.price ? +req.body.price : undefined;

  let updatedCourse = courses.find((course) => course.id === id);
  if (!updatedCourse)
    return res.status(400).json({ error: "course not found" });

  if (name)
    if (name.length > 2) updatedCourse = { ...updatedCourse, name: name };
    else
      return res.status(400).json({ error: "name must be more than 2 chars" });

  if (price)
    if (isNaN(price))
      return res.status(400).json({ error: "price must be a number" });
    else updatedCourse = { ...updatedCourse, price: price };

  if (name === undefined && price === undefined)
    res.status(400).json({ error: "Need either name or price" });
  else {
    courses = courses.map((course) =>
      course.id === id ? updatedCourse : course
    );
    res.status(200).json(updatedCourse);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
