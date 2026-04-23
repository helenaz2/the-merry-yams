import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlusohtfshsnpitoimjk.supabase.co/rest/v1/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsdXNvaHRmc2hzbnBpdG9pbWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MDE4NTgsImV4cCI6MjA5MjQ3Nzg1OH0.Gl44xsBMOsD6p1Upp94rw75FFRCbMJ3KRE02SdMAG50'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)