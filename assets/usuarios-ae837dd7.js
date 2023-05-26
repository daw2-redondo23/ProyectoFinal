import { U as User, P as Perfil } from "./main-5219a3af.js";
const usuarios = {
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
  script: async () => {
    console.log("Esta es la ventana para ver los usuarios");
    document.querySelector("#divGrande").classList = "mainOrders";
    document.querySelector("main").classList = "adminPanel";
    const usuario = await User.getUser();
    if (usuario) {
      try {
        const perfilUsuario = await Perfil.getByUserId(usuario.id);
        if (perfilUsuario.rol == "admin") {
          const usuarios2 = await Perfil.getAll();
          let tablaPerfiles = "";
          for (const element of usuarios2) {
            tablaPerfiles += `<tr>
                                            
                                            <td>${element.nombre}</td>
                                            <td>${element.apellidos}</td>
                                            <td>${element.email}</td>
                                            <td>${element.telefono}</td>
                                            <td>
                                                <button class="btn btn-primary ">Edit</button>
                                                <button data-id="${element.id}" class="btn btn-danger btnEliminar">Delete</button>
                                            </td>
                                        </tr>`;
          }
          ;
          document.querySelector("tbody").innerHTML = tablaPerfiles;
          let btnEliminar = document.querySelectorAll(".btnEliminar");
          btnEliminar.forEach(async (boton) => {
            boton.addEventListener("click", async (e) => {
              let id = event.target.dataset.id;
              try {
                await Perfil.delete(id);
                alert("Perfil Eliminado");
                window.location.href = "#/verUsuarios";
              } catch (error) {
                alert(error);
              }
            });
          });
        } else {
          let actualizarContador = function() {
            if (tiempoRestante === 0) {
              window.location.href = "ProyectoFinal/#/home";
            } else {
              tiempoRestante--;
              setTimeout(actualizarContador, 1e3);
            }
          };
          document.querySelector("main").innerHTML = `<h1 class="text-white">Acces Denied</h1>
                                                                <h5 class="text-white">Redirigiendo ... </h5>`;
          var tiempoRestante = 5;
          actualizarContador();
        }
      } catch (error) {
      }
    }
  }
};
export {
  usuarios as default
};
