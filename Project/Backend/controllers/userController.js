import User from "../models/user.js";

function createUser(req, res) {
    const user = new User(
        req.body
    );
    user.save()
    .then(
        () => {
            res.json({ 
                message: "User created successfully" 
            });
        })
    .catch(
        () => {
            res.json({ 
                message: "Creating user failed"
            });
        }
    );
}