import {createClient} from '@supabase/supabase-js'

export const supabaseUrl = 'https://lckaahzyblehagnchovg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2FhaHp5YmxlaGFnbmNob3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNDk1MzYsImV4cCI6MjAxNTgyNTUzNn0.qMZFpyZYdGn0lC9O58_cGH_VZXr2B6nSew4h-qkNApc'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase