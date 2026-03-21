import React, { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-[400px] bg-primary rounded-2xl p-4 shadow-lg border border-gray-200">
      
      {/* Main Image */}
      <div className="w-full h-[400px] overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={images[activeImage]}
          alt=""
        />
      </div>

      {/* Thumbnails */}
      <div className="w-full mt-4 flex justify-center items-center gap-3 ">
        {images.map((img, index) => {
          return (
            <img
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-[80px] h-[80px] object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 
                ${
                  activeImage === index
                    ? "border-accent scale-105 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                }`}
              src={img}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}