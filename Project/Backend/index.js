import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';



const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const connectionString = "REMOVED_MONGODB_URI";

 
mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 5000
}).then(
    () => {
        console.log("Connected to database");
    }
).catch(
    (error) => {
       console.error("Database connection failed:", error);
    }
);


app.get('/', 
    (req, res) => {
        Student.find().then(
            (data)=> {
                res.json(data);
            }
        ).catch(
            (error) => {
                console.error("Error retrieving students:", error);
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