import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const connectionString = "REMOVED_MONGODB_URI";
 
mongoose.connect(connectionString).then(
    () => {
        console.log("Connected to database");
    }
).catch(
    (error) => {
       console.error("Database connection failed:", error.message);
    }
);


app.get('/', 
    (req, res) => {
        console.log(req.body);
        console.log("Get request received");

        let prefix = "Mr."
        if (req.body.gender == "female") {
            prefix = "Ms."
        }

        res.json(
            {
                message: "Hello " + prefix + " " + req.body.name
            }
        );
    }
);

app.post('/',  
    (req,res) => {
        const student = new Student(
            {
                name: req.body.name,
                age: req.body.age,
                city: req.body.city
            }
        );
        student.save().then(
            () => {
                res.json(
                    {
                        message: "Student created successfully"
                    }
                );
            }
        ).catch(
            (error) => {
                res.json(
                    {
                        message: "Creating student failed: " + error.message
                    }
                );
            }
        );
    }
);

app.delete('/', 
    () => {
        console.log("Delete request received");
    }   
);

app.listen(5000, 
    () => {
        console.log("Server is running");
    }
);