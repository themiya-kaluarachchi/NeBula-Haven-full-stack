import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const connectionString = "REMOVED_MONGODB_URI";
  
mongoose.connect(connectionString);

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
    () => {
        console.log("Post request received");
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