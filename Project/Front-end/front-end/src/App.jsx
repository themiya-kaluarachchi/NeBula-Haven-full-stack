import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./components/productCard";
import AdminPage from "./pages/adminPage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-[100vh] bg-red-500">
        
        <Routes path="/">
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
