import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-[50vh] bg-red-500">
        
        <Routes path="/">
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
          <Route path="/admin" element={<h1>Admin Page</h1>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
