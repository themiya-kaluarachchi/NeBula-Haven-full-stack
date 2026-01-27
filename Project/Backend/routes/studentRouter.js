import express from 'express';

const studentRouter = express.Router();

studentRouter.get('/', 
    () => {
        console.log("GET request into student router");
    }
);

studentRouter.post('/', 
    () => {
        console.log("POST request into student router");
    }
);