import Student from "../models/student.js";

export async function getStudent(req, res) {
  
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json(
      {
         message: "Failed to retrieve students: " + error.message
      }
    );
  }
  

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
