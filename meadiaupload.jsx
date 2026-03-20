
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jltipjurayempptahiun.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdGlwanVyYXllbXBwdGFoaXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzU3NDIsImV4cCI6MjA4OTU1MTc0Mn0.L_NCXDAUEOiOklPYpeqeF-mTyEJIoKkxdZ4LqHdYqV8";
const supabase = createClient(supabaseUrl, supabaseKey);

// SINGLE
export async function uploadMedia(file) {
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// MULTIPLE (🔥 FIXED)
export async function uploadMultipleMedia(files) {
  // ✅ ALWAYS CONVERT
  const fileArray = Array.from(files || []);

  if (!fileArray.length) return [];

  const results = [];

  for (const file of fileArray) {
    const url = await uploadMedia(file);
    results.push(url);
  }

  return results;
}