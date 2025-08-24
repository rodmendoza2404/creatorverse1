import { createClient } from "@supabase/supabase-js";


const URL = "https://usdpsjwyvbaxhfracsub.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZHBzand5dmJheGhmcmFjc3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzIxNjAsImV4cCI6MjA3MTY0ODE2MH0.9E_g_X2rN4ZogcIpp6Sc7pkwdQxD_InZIZe6OKg8_Tk";

export const supabase = createClient(URL, API_KEY);