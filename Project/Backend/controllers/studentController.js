import Student from "../models/student.js";

export function getStudent(req, res) {
  Student.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error retrieving students:", error);
    });
}

export function createStudent(req, res) {

  if(req.user == null) {
    res.status(401).json(
      {
        message : "Authentication required"
      }
    )
    return;
  }

  if (req.user.role != "admin") {
    res.status(403).json(
      {
        message: "Authorization required: Admins only",
      }
    );
    return;
  }

  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  });
  student
    .save()
    .then(() => {
      res.json({
        message: "Student created successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "Creating student failed: " + error.message,
      });
    });
};
