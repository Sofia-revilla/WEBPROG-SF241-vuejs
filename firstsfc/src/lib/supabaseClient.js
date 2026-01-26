import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// Match this to the name you used in Vercel!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)