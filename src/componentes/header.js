import { Perfil } from "../bd/perfiles";
import { supabase } from "../bd/supabase";
import { User } from "../bd/user";
export default {
    template: `<!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark p-3" id="navbarMenu">
      <div class="container-fluid">
        <a href="index.html"><img src="/img/logo2.png" alt="logo" id="logoEncabezado" class="m-2"></a>
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
              <a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Owner
              </a>
              <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
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
                <form id="formRegistro">
                    <div class="mb-3 mt-4">
                        <label for="nameInputRegistro" class="form-label">Name</label>
                        <input type="text" class="form-control bg-dark text-white" id="nameInputRegistro">
                    </div>
                    <div class="mb-3">
                        <label for="surnameInputRegistro" class="form-label">Surname</label>
                        <input type="text" class="form-control bg-dark text-white" id="surnameInputRegistro">
                    </div>
                    <div class="mb-3">
                        <label for="emailInputRegistro" class="form-label">Email address</label>
                        <input type="email" class="form-control bg-dark text-white" id="emailInputRegistro" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control bg-dark text-white" id="passwordInputRegistro">
                    </div>
                    <div class="mb-3 bg-dark">
                      <input type="tel" class="form-control bg-dark text-white" id="phone">
                    </div>
                    <button id="registerBtn" type="submit" class="btn btn-light mt-3">Register</button>
                    <p>Already a member? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login now</a></p>
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
                <form>
                    <div class="mb-3 mt-4">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control bg-dark text-white" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control bg-dark text-white" id="exampleInputPassword1">
                    </div>
                    <button id="loginBtn" type="submit" class="btn btn-light mt-3">LOGIN</button>
                    <p>Not a member? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Register now</a></p>
                </form>
            </div>
        </div>
      </div>
    </div>
    `,
    script:  () => {
        //Input de las banderas
            const phoneInputField = document.querySelector("#phone");
            const phoneInput = window.intlTelInput(phoneInputField, {
              utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", 
            });
            console.log(phoneInput);

            document.querySelector('.iti__country-list').classList += ' bg-dark'
          
          //Funcionalidad del registro
          document.querySelector('#formRegistro').addEventListener("submit", (e)=>{
            e.preventDefault()

            try {
              //creo el usuario con los datos del email y el password
              const user = {
                email: document.querySelector('#emailInputRegistro').value,
                password: document.querySelector('#passwordInputRegistro').value
              }
              //introduzco el usuario en la base de datos
              const nuevoUsuario =   User.create(user)
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

            } catch (error) {
                alert(error)
            }
            
          })

    }
}