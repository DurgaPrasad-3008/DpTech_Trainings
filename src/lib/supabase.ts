import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gcaeplteagvasyxxqczz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYWVwbHRlYWd2YXN5eHhxY3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTM4NzgsImV4cCI6MjA3MDk4OTg3OH0.HGg_PZwLJBNIUVSBa9xSCL3oF4OLABuCTZet1N5t6FI"
// Check if both URL and key are properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co')

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials not found. Using localStorage fallback.')
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface Student {
  id?: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  gender: string
  address: string
  education: string
  date_of_birth: string
  course: string
  experience: string
  registration_date?: string
  created_at?: string
}