import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());


const dbPath = path.join(__dirname, "db.json");


const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.get("/students", (req, res) => {
  const db = readData();
  res.status(200).json(db.students);
});


app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const db = readData();
  const newStudent = {
    id: db.students.length
      ? db.students[db.students.length - 1].id + 1
      : 1,
    name,
    course,
    year
  };

  db.students.push(newStudent);
  writeData(db);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});


app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;
  const db = readData();

  const student = db.students.find(s => s.id === Number(id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name) student.name = name;
  if (course) student.course = course;
  if (year) student.year = year;

  writeData(db);

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});


app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readData();

  const index = db.students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = db.students.splice(index, 1);
  writeData(db);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
