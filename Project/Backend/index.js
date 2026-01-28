import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
    (req, res, next) => {
        let token = req.header("Authorization")
        
        if(token != null) {
            token = token.replace("Bearer ", "")
            jwt.verify(token,"jwt-secret",
                (err, decoded) => {
                    if(decoded == null) {
                        res.json(
                            {
                                message : "Invalid Token"
                            }
                        )
                        return;
                    } else {
                        req.userData = decoded; 
                    }
                }
            ) 
        }
        next(); 
    }
)



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