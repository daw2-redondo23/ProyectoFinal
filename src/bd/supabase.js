import { createClient } from '@supabase/supabase-js'

//conexion supabase
const supabaseUrl = 'https://budmxnnwqhnbpwldbvmy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZG14bm53cWhuYnB3bGRidm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTQxMTEsImV4cCI6MTk5NzQ5MDExMX0.ac_SpR-KvlsGW4cFmFlz-IwewKWis-ESc7ojhm_pyhg'

export const supabase = createClient(supabaseUrl, supabaseKey)