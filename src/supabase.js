import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wjcxvsmeviuuwfpthwlg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3h2c21ldml1dXdmcHRod2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NDA0MzQsImV4cCI6MjA0NjMxNjQzNH0.DZPwMffgkU4ruiZvXaj1TCaZttt8LS-waTw9x0-Zh8k"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;