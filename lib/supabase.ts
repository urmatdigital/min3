import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahpsekminkajmfszfyou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocHNla21pbmtham1mc3pmeW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTQzMzQsImV4cCI6MjA0ODA3MDMzNH0.snE9TNBsAk-yeSZFJNvgjvrsFUCLQustDZXNvJU8S4Y';

export const supabase = createClient(supabaseUrl, supabaseKey);