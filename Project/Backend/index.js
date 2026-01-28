import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';



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
app.use('/users', userRouter);


app.listen(5000, 
    () => {
        console.log("Server is running");
    }
);