import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      const user = response.data.user;
      if (user.role == 'admin') {
        console.log("Admin logged in", user);
        navigate("/admin");
      } else {
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-login8.jpg')" }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 p-16 items-center justify-center">
        <div className="max-w-md text-white">
          <img
            src="/logo2.png"
            alt="Nebula Haven"
            className="w-48 mb-8 drop-shadow-2xl"
          />

          <h1 className="text-5xl font-bold mb-6 tracking-wide drop-shadow-lg">
            Nebula Haven
          </h1>

          {/* UPDATED: Customer-focused copy */}
          <p className="text-lg leading-relaxed text-white/90 drop-shadow-md">
            Premium cosmetic picks, thoughtfully sourced. Sign in to explore our
            latest collections, track your orders, and discover beauty essentials 
            curated just for you.
          </p>
        </div>
      </div>

      {/* Right Glass Login Panel */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          <div className="relative p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            
            {/* Soft glow effects (Aura) */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-4 mb-8">
              <img
                src="/logo2.png"
                alt="Nebula Haven"
                className="w-20 drop-shadow-lg lg:hidden"
              />
              <h2 className="text-3xl font-semibold text-white tracking-wide">
                Welcome back
              </h2>
              <p className="text-sm text-white/80 text-center font-light">
                Sign in to your account to continue your beauty journey
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-5">
              
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/20 transition-all duration-300 shadow-inner"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/20 transition-all duration-300 shadow-inner"
              />

              <button
                onClick={login}
                className="w-full h-12 mt-2 rounded-xl font-semibold text-white bg-accent transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/50 active:scale-[0.98]"
              >
                Login
              </button>

              <div className="flex justify-between text-sm text-white/80 mt-2 font-light">
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Forgot password?
                </a>
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Create account
                </a>
              </div>

              <p className="text-xs text-center text-white/50 mt-4 font-light">
                By continuing you agree to our Terms & Privacy.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-white/60 font-light tracking-wide">
            © {new Date().getFullYear()} Nebula Haven
          </div>
        </div>
      </div>
    </div>
  );
}