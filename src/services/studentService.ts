import { supabase } from '../supabaseClient';

export async function addStudent(student: any) {
  if (!supabase) {
    console.error('Supabase client not configured');
    return;
  }

  const { data, error } = await supabase
    .from('students')
    .insert([student]);

  if (error) {
    console.error('Error inserting student:', error.message);
  } else {
    console.log('Inserted student:', data);
  }
}