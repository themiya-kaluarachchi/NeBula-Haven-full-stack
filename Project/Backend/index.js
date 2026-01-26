import express from 'express';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
  
app.get('/', 
    (req, res) => {
        console.log(req.body);
        console.log("Get request received");

        res.json(
            {
                message: "Get request successful"
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