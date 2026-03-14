import { createClient } from "@supabase/supabase-js"

const annonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdnpzZmlkY2dnd3lkZ3Z2dXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTM1MDAsImV4cCI6MjA4OTAyOTUwMH0.yrHfTm5sD3kku1YtGiGatuMOF3PUwEh7HLqGZYatlsI"
const supabaseUrl = "https://sjvzsfidcggwydgvvuuf.supabase.co"

const superbase = createClient(supabaseUrl, annonKey)

// superbase.storage.from("images").upload(file.name, file , {
//       upsert: false,
//       cacheControl: "3600",
//     }).then(
//       () => {
//         const publicUrl = superbase.storage.from("images").getPublicUrl(file.name).data.publicUrl
//         console.log(publicUrl);
//       }
//     )

export default function mediaUpload(file) {
    return new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected");
            } else {
                const timeStamp = new Date().getTime();
                const fileName = timeStamp+file.name;

                superbase.storage.from("images").upload(fileName, file , {
                    upsert: false,
                    cacheControl: "3600",
                }).then (() => {
                    const publicUrl = superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);
                }).catch (
                    () => {
                        reject("Upload failed");
                    }
                )
            }
        }
    )
}

