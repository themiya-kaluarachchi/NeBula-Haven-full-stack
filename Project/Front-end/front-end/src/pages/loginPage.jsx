import axios from "axios";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await axios.post("http://localhost:5000/users/login", {
            email : email,
            password : password
        });
        console.log(response.data);
    }

    return (
        <div className="w-full h-full bg-[url('/bg-login8.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex items-center justify-center">
                <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-[20px]">
                    
                    <input onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }
                    } className="w-[400px] h-[40px] bg-primary" />
                    
                    <input onChange={
                        (e) => { 
                            setPassword(e.target.value);
                        }
                    } className="w-[400px] h-[40px] bg-primary" />
                    
                    <button onClick={login} className="w-[400px] h-[40px] bg-accent text-white rounded-lg">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}