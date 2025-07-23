import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vbigmbuprkfmltyqempg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaWdtYnVwcmtmbWx0eXFlbXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNjgyNDIsImV4cCI6MjA2ODg0NDI0Mn0.Oysec2dtCKwAcS17a6MTMgoFG3aXb90NFqWAKjJHqrg";
export const supabase = createClient(supabaseUrl, supabaseKey);
