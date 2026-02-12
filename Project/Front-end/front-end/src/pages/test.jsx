import React, { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(10);
  const [status, setStatus] = useState("Online");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-amber-100 text-white flex  flex-col justify-center items-center gap-[25px]">
        <div className="flex justify-center items-center gap-[20px]">
          <button
            onClick={() => {
              console.log("Decreasing...");
              setCount(count - 1);
              console.log(count);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg"
          >
            -
          </button>
          <span className="text-accent text-5xl">{count}</span>
          <button
            onClick={() => {
              console.log("Increasing...");
              setCount(count + 1);
              console.log(count);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg"
          >
            +
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <span className="text-accent text-5xl">{status}</span>

          <div className="flex flex-row gap-[20px]">
            <button
              onClick={() => setStatus("Online")}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              Online
            </button>
            <button
              onClick={() => setStatus("Offline")}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              Offline
            </button>
            <button
              onClick={() => setStatus("Deactivated")}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              Deactivated
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
