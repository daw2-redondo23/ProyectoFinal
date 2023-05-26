import { Perfil } from "../bd/perfiles";
import { supabase } from "../bd/supabase";
import { User } from "../bd/user";
export default {
    template: `<!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark p-3" id="navbarMenu">
      <div class="container-fluid">
        <a href="#/home"><img src="/img/logo2.png" alt="logo" id="logoEncabezado" class="m-2"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link mx-2 active" aria-current="page" href="#/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-2" href="#/configurador">Configurator</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-2" href="#/about">About&nbspUs</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link mx-2 dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Owner
              </a>
              <ul id="listaOpciones" class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item bg-dark text-white" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a></li>
                <li><a class="dropdown-item bg-dark text-white" data-bs-toggle="modal" data-bs-target="#registerModal">Register</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      </nav>
    <!-- Navbar -->
    <!-- Modal Register-->
  <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="ModalFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="myform bg-dark">
                <h1 class="text-center">Register</h1>
                <form id="formRegistro" class="needs-validation" novalidate>
                    <div class="mb-3 mt-4">
                        <label for="nameInputRegistro" class="form-label">Name</label>
                        <input type="text" class="form-control bg-dark text-white" id="nameInputRegistro" pattern="[A-Za-z0-9]+" required>
                        <!-- mensaje si no valida -->
                          <div class="invalid-feedback">Incorrecto, solo se puede poner letras y números</div>
                    </div>
                    <div class="mb-3">
                        <label for="surnameInputRegistro" class="form-label">Surname</label>
                        <input type="text" class="form-control bg-dark text-white" id="surnameInputRegistro" pattern="[A-Za-z0-9]+" required>
                        <!-- mensaje si no valida -->
                          <div class="invalid-feedback pb-4">Incorrecto, solo se puede poner letras y números</div>
                    </div>
                    <div class="mb-3">
                        <label for="emailInputRegistro" class="form-label">Email address</label>
                        <input type="email" class="form-control bg-dark text-white" id="emailInputRegistro" aria-describedby="emailHelp" required>
                        <!-- mensaje si no valida -->
                          <div class="invalid-feedback">Incorrecto,el email es incorrecto</div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInputRegistro" class="form-label">Password</label>
                        <input type="password" class="form-control bg-dark text-white" id="passwordInputRegistro" minlength="6" pattern="(?=.*)(?=.*[a-z])(?=.*[A-Z]).{6,}" required> 
                        <!-- mensaje si no valida -->
                          <div class="invalid-feedback">Incorrecto, la contraseña solo puede tener letras, numeros <br> y tiene que tener un mínimo de 6 carácteres</div>

                    </div>
                    
                    <div class="mb-3 bg-dark pt-5">
                      <input type="tel" class="form-control bg-dark text-white" id="phone" required>
                    </div>
                    <button id="registerBtn" type="submit" class="btn btn-light mt-3" >Register</button>
                    <p>Already a member? <a href="" data-bs-toggle="modal" data-bs-target="#loginModal">Login now</a></p>

                </form>
            </div>
        </div>
      </div>
    </div>
</div>
   <!-- Modal Login-->
   <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="ModalFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="myform bg-dark">
                <h1 class="text-center">Login</h1>
                <form id="formLogin">
                    <div class="mb-3 mt-4">
                        <label for="emailInputLogin" class="form-label">Email address</label>
                        <input type="email" class="form-control bg-dark text-white" id="emailInputLogin" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="passwordInputLogin" class="form-label">Password</label>
                        <input type="password" class="form-control bg-dark text-white" id="passwordInputLogin">
                    </div>
                    <button id="loginBtn" type="submit" class="btn btn-light mt-3" data-bs-dismiss="modal">LOGIN</button>
                    <p>Not a member? <a href="" data-bs-toggle="modal" data-bs-target="#registerModal">Register now</a></p>
                </form>
            </div>
        </div>
      </div>
    </div>
    `,
    script:async() => {
        //Input de las banderas
            const phoneInputField = document.querySelector("#phone");
            const phoneInput = window.intlTelInput(phoneInputField, {
              utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", 
            });


            document.querySelector('.iti__country-list').classList += ' bg-dark'
          
            try {

            const usuario = await User.getUser()
            
            if(usuario){
              let perfilUsuario = await Perfil.getByUserId(usuario.id)
              if(perfilUsuario.rol == 'admin'){

                document.querySelector('#navbarDropdownMenuLink').innerHTML = 'Admin'
                let listaDesplegable = `
                                        <li><a href="/#/miPerfil" class="dropdown-item bg-dark text-white">Mi Perfil</a></li>
                                        <li><a href="/#/verUsuarios" class="dropdown-item bg-dark text-white">Ver Usuarios</a></li>
                                        <li><a href="/#/verPedidos" class="dropdown-item bg-dark text-white">Ver Pedidos</a></li>
                                        <li id="logout"><a class="dropdown-item bg-dark text-white">Logout</a></li> 
                                        `
              document.querySelector('#listaOpciones').innerHTML = listaDesplegable
              document.querySelector('#logout').addEventListener("click", async(e)=>{
                await User.logout()
                location.reload()
              })
                                
              }
              else{
   
                document.querySelector('#navbarDropdownMenuLink').innerHTML = perfilUsuario.nombre
                let listaPerfilLogeado = `<li><a href="/#/miPerfil" class="dropdown-item bg-dark text-white">Mi Perfil</a></li>
                                          <li><a href="/#/verPedidos" class="dropdown-item bg-dark text-white">Mis Pedidos</a></li>
                                          <li id="logout"><a class="dropdown-item bg-dark text-white">Logout</a></li> 
                                        `
                document.querySelector('#listaOpciones').innerHTML = listaPerfilLogeado
                document.querySelector('#logout').addEventListener("click", async(e)=>{
                await User.logout()
                location.reload()
                })
              }
              
            }
              
            } catch (error) {
               
            }
            
          //Funcionalidad del registro
          document.querySelector('#registerBtn').addEventListener("click", async(e) => {
            e.preventDefault();
            console.log("Hola");
            document.querySelector('#formRegistro').classList.add('was-validated');
            
            if (document.querySelector('#formRegistro').checkValidity()) {
             
              try {
                //creo el usuario con los datos del email y el password
                const user = {
                  email: document.querySelector('#emailInputRegistro').value,
                  password: document.querySelector('#passwordInputRegistro').value
                }
                //introduzco el usuario en la base de datos
                const nuevoUsuario =  await User.create(user)
                console.log(nuevoUsuario.id);
 
                //creo el perfil con los datos de los inputs
                const perfilNuevo = {
                    nombre: document.querySelector('#nameInputRegistro').value,
                    apellidos: document.querySelector('#surnameInputRegistro').value,
                   email: document.querySelector('#emailInputRegistro').value,
                    avatar: "avatar1.png",
                    user_id: nuevoUsuario.id,
                    telefono: document.querySelector('#phone').value
                }
 
                //introduzco el perfil en la base de datos
              
                await Perfil.create(perfilNuevo)
                alert("Tienes que confirmar el correo")
 
              } catch (error) {
                  alert(error)
              }
            }
          
          });
          
          
           

          //Funcionalidad del Login
          document.querySelector('#formLogin').addEventListener("submit", async(e)=>{
            e.preventDefault()
            
            

            try {
              let usuarioLogin = {
                email: document.querySelector('#emailInputLogin').value,
                password: document.querySelector('#passwordInputLogin').value
              }
              await User.login(usuarioLogin)
              location.reload()
            } catch (error) {
                alert(error)
            }
          })

    }
}