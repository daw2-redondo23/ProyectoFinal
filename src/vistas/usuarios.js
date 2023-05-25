import { Perfil } from "../bd/perfiles";
import { User } from "../bd/user";

export default {
    template: `
                <h1 class="text-center text-white my-5">Administration</h1>
                <table class="table table-striped table-dark" id="TablaAdmin">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody> 
                    
                    </tbody>
                </table>`,
    script: async()=>{
        console.log('Esta es la ventana para ver los usuarios');
        document.querySelector('#divGrande').classList = "mainOrders"
        document.querySelector('main').classList = "adminPanel"

        const usuario = await User.getUser()
        if(usuario){
            try {
                const perfilUsuario = await Perfil.getByUserId(usuario.id)
                if(perfilUsuario.rol == 'admin'){

                   const usuarios = await Perfil.getAll()
                   let tablaPerfiles = '';
                    for(const element of usuarios){
                        tablaPerfiles += `<tr>
                                            
                                            <td>${element.nombre}</td>
                                            <td>${element.apellidos}</td>
                                            <td>${element.email}</td>
                                            <td>${element.telefono}</td>
                                            <td>
                                                <button class="btn btn-primary ">Edit</button>
                                                <button data-id="${element.id}" class="btn btn-danger btnEliminar">Delete</button>
                                            </td>
                                        </tr>`
                    };
                    document.querySelector('tbody').innerHTML = tablaPerfiles

                    let btnEliminar = document.querySelectorAll('.btnEliminar')

                    btnEliminar.forEach(async(boton)=>{ //para cada boton detecto si se hace click
                        boton.addEventListener('click', async(e)=>{
                           
                            let id = event.target.dataset.id //recojo el id que tiene el botón

                            try {
                                await Perfil.delete(id)
                            
                                alert("Perfil Eliminado")
                                window.location.href= '#/verUsuarios'
                               

                            } catch (error) {
                                alert(error)
                            }
                             
                            
                        })
                        
                      })
                }

                else{
                    document.querySelector('main').innerHTML= `<h1 class="text-white">Acces Denied</h1>
                                                                <h5 class="text-white">Redirigiendo ... </h5>`
                            // Tiempo en segundos para el temporizador
                            var tiempoRestante = 5;

                            // Función para actualizar el contador y redirigir
                            function actualizarContador() {
                                if (tiempoRestante === 0) {
                                // Redireccionar a la URL deseada
                                window.location.href = '#/home';
                                } else {
                                // Actualizar contador y esperar 1 segundo
                                tiempoRestante--;
                                setTimeout(actualizarContador, 1000);
                                }
                            }

                            // Iniciar el temporizador
                            actualizarContador();
                }
            } catch (error) {
                
            }
        }
    }
}