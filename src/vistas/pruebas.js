import { createClient } from '@supabase/supabase-js'

export default {
    template: `<h1>Esto es la prueba de Supabase</h1>`,
    script: async ()=>{
        console.log('Esta es la vista para hacer pruebas del supabase');
        
        //Conexion con la base de datos

        const supabaseUrl = 'https://budmxnnwqhnbpwldbvmy.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZG14bm53cWhuYnB3bGRidm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTQxMTEsImV4cCI6MTk5NzQ5MDExMX0.ac_SpR-KvlsGW4cFmFlz-IwewKWis-ESc7ojhm_pyhg'
        const supabase = createClient(supabaseUrl, supabaseKey)

        console.log(supabase);

        //motores
        const leerTodosLosMotores = async()=>{
            
            let { data: motor, error } = await supabase
            .from('motor')
            .select('*')
            return motor
        }
        let motores = await leerTodosLosMotores()
        console.log(motores);

        //funcion para añadir usuarios
        const agregarUsuario = async ()=>{

            let { data, error } = await supabase.auth.signUp({
                email: 'redondobarrosoruben@fpllefia.com',
                password: 'ruben892003'
              })
        }

        //await agregarUsuario()
    }
}