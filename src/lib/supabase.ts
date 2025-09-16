import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

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