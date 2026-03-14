import { createClient } from "@supabase/supabase-js";
import React, { useState } from "react";

const annonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdnpzZmlkY2dnd3lkZ3Z2dXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTM1MDAsImV4cCI6MjA4OTAyOTUwMH0.yrHfTm5sD3kku1YtGiGatuMOF3PUwEh7HLqGZYatlsI"
const supabaseUrl = "https://sjvzsfidcggwydgvvuuf.supabase.co"

const superbase = createClient(supabaseUrl, annonKey)

export default function TestPage() {

  const [file, setFile] = useState(null);

  function uploadImage() {
    superbase.storage.from("images").upload(file.name, file , {
      upsert: false,
      cacheControl: "3600",
    }).then(
      () => {
        const publicUrl = superbase.storage.from("images").getPublicUrl(file.name).data.publicUrl
        console.log(publicUrl);
      }
    )
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
