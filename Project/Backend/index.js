import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
    (req, res, next) => {
        let token = req.header("Authorization")
        
        if(token != null) {
            token = token.replace("Bearer ", "")
            jwt.verify(token, process.env.JWT_SECRET,
                (err, decoded) => {
                    if(decoded == null) {
                        res.json(
                            {
                                message : "Invalid Token"
                            }
                        )
                        return;
                    } else {
                        req.user = decoded; 
                    }
                }
            ) 
        }
        next(); 
    }
)


const connectionString = process.env.MONGO_URI;

 
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

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.listen(5000, 
    () => {
        console.log("Server is running on port 5000");
    }
);