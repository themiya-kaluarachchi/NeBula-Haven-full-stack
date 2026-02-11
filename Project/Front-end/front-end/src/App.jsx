import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  return (
    <>
      <div className="h-[700px] w-[700px] relative border-[5px] flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-yellow-300 flex flex-row justify-center items-center">
          <div className="w-[100px] h-[100px] bg-red-500"></div>
          <div className="w-[100px] h-[100px] absolute bottom-[10px] right-[10px] bg-blue-500"></div>
          <div className="w-[100px] h-[100px] bg-green-500"></div>
          <div className="w-[100px] h-[100px] fixed right-[10px] bottom-[10px] bg-pink-500"></div>
          <div className="w-[100px] h-[100px] bg-gray-500"></div>
          <button className="w-[20px] h-[20px] absolute top-[5px] right-[5px] bg-red-500 text-white flex justify-center items-center">X</button>
          <button className="text-white bg-green-500 fixed bottom-[0px] left-[0px] p-[5px]">Chat via Whatsapp</button>
        </div>
      </div>

      <div className="w-[300px] h-[300px] bg-pink-600 p-[10px] m-[20px]">
        <div className="w-[50px] h-[50px] bg-yellow-300"></div>
        <div className="w-[50px] h-[50px] bg-blue-700 m-[5px]"></div>
      </div>
    </>
  );
}

export default App;
