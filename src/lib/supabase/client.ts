import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tuuufygsbgewcobhuwcc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dXVmeWdzYmdld2NvYmh1d2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MzAwNjAsImV4cCI6MjEwNzMwNjA2MH0.rSm0yS5_neLMjMbRjnyHIRvOM-uCIOim5UgkHsIJb9Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
