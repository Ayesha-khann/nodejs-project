const express = require("express");

const app = express();

app.use(express.json());

const student = [
  { id: 1, name: "student 1", EmailID: "eamil" },
  { id: 2, name: "student 2", EmailID: "eamil" },
  { id: 3, name: "student 3", EmailID: "eamil" },
  { id: 4, name: "student 4", EmailID: "eamil" },
];

app.get("/", (req, res) => {
  res.send(student);
});
//Student
app.get("/api/student", (req, res) => {
  res.send(student);
});

//GEt
app.get("/api/student/:id", (req, res) => {
  const stud = student.find((c) => c.id === parseInt(req.params.id));
  if (!stud)
    return res
      .status(404)
      .send("The student with the given ID was not found. ");
  res.send(stud);
});

//POST
app.post("/api/student", (req, res) => {
  const { error } = validationStudent(req.bodt);
  if (error) return res.status(400).send(error.details[0].messge);

  const stud = {
    id: student.length + 1,
    name: req.body.name,
  };
  student.push(stud);
  res.send(stud);
});
//PUT
app.put("/api/student/:id", (req, res) => {
  const stud = student.find((c) => c.id === parseInt(req.params.id));
  if (!stud)
    return res
      .status(404)
      .send("The student with the given ID was not found. ");

  const { error } = validationStudent(req.bodt);
  if (error) return res.status(400).send(error.details[0].messge);

  stud.name = req.body.name;
  res.send(stud);
});

//DELETE
app.delete("/api/student/:id", (req, res) => {
  const stud = student.find((c) => c.id === parseInt(req.params.id));
  if (!stud) return;
  res.status(404).send("The student with the given ID was not found. ");
  const index = student.indexOf(stud);
  student.splice(index, 1);
  res.send(stud);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
