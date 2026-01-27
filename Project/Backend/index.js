import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';



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

app.use('/students', studentRouter);


app.listen(5000, 
    () => {
        console.log("Server is running");
    }
);