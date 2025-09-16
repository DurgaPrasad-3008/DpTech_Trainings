import { supabase } from '../lib/supabase'

export async function addStudent(student: any) {
  if (!supabase) {
    console.error('Supabase client not configured')
    return
  }

  const { data, error } = await supabase
    .from('students') // 👈 make sure your Supabase table name is correct
    .insert([student])

  if (error) {
    console.error('Error inserting student:', error.message)
  } else {
    console.log('Inserted student:', data)
  }
}
