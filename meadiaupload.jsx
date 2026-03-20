import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export default function MediaUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔹 Supabase client
  const supabase = createClient(
    "https://uscibyluognuwlsqkvll.supabase.co",
    "YOUR_PUBLIC_ANON_KEY"
  );

  // 🔹 Upload function
  async function handleFileUpload() {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      setUploading(true);

      const timeStamp = new Date().getTime();
      const newFileName = `${timeStamp}_${file.name}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(newFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(newFileName);

      toast.success("Uploaded successfully!");
      console.log("File URL:", data.publicUrl);

    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      
      <h1 className="text-2xl font-bold">Media Upload</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2"
      />

      <button
        onClick={handleFileUpload}
        disabled={uploading}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

    </div>
  );
}