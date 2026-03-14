import React, { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {

  const [file, setFile] = useState(null);

  async function uploadImage() {
    const link = await mediaUpload(file);
    console.log(link);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <input type="file" 
        onChange={
          (e) => {
            setFile(e.target.files[0]);
          }
        }
      />
      <button onClick={uploadImage} className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4">
        Upload
      </button>
    </div>
  );
}
