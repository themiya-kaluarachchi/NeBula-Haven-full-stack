import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';

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
                        req.user = decoded; 
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

app.use('/users', userRouter);
app.use('/products', productRouter);


app.listen(5000, 
    () => {
        console.log("Server is running on port 5000");
    }
);