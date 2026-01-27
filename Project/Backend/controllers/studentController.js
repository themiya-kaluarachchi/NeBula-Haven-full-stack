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
