import { Pedidos } from "../bd/pedidos";
import { Perfil } from "../bd/perfiles";
import { User } from "../bd/user";

export default {
    template: `
    <div class="mainOrders">
    <div class="tableProfile">
      <table class="table table-dark table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>User</th>
            <th>Email</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
                      
  </div>`,
    script: async()=>{
        console.log('Esta es la ventana de los pedidos');
        document.querySelector('#divGrande').classList = " mainOrders"

        const usuario = await User.getUser()

        if(usuario){
            try {
                const perfilUsuario = await Perfil.getByUserId(usuario.id)
                if(perfilUsuario.rol == 'admin'){
                    const pedidos = await Pedidos.getAll();
                    let html = '';
                    for (const elemento of pedidos) {
                    const perfil = await Perfil.getById(elemento.id_perfil);
                        html += `<tr>
                            <th scope="row">1</th>
                            <td>${elemento.numeroPedido}</td>
                            <td>${perfil.nombre}</td>
                            <td>${perfil.email}</td>
                            <td>Edinburgh</td>
                            <td>${elemento.precio}$</td>
                            <td>
                            <button  data-id="${elemento.id}" type="button" class="btn btn-danger ms-3 btnEliminar">Delete</button>
                            </td>
                        </tr>`;
                        }
                    console.log(html);
                    document.querySelector('tbody').innerHTML = html

                    let btnEliminar = document.querySelectorAll('.btnEliminar')

                    btnEliminar.forEach(async(boton)=>{ //para cada boton detecto si se hace click
                        boton.addEventListener('click', async(e)=>{
                           
                            let id = event.target.dataset.id //recojo el id que tiene el botón
                            try {
                                await Pedidos.borrar(id)
                                alert("Pedido eliminado")
                                window.location.href = '#/verPedidos' 

                            } catch (error) {
                                alert(error)
                            }
     
                        })
                        
                      })

                }
                else{
                    const pedidos = await Pedidos.getAllByPerfilId(perfilUsuario.id);
                    let html = '';
                    for (const elemento of pedidos) {
                    const perfil = await Perfil.getById(elemento.id_perfil);
                    html += `<tr>
                        <th scope="row">1</th>
                        <td>${elemento.numeroPedido}</td>
                        <td>${perfil.nombre}</td>
                        <td>${perfil.email}</td>
                        <td>Edinburgh</td>
                        <td>${elemento.precio}$</td>
                        <td>Bloqueado</td>
                    </tr>`;
                    }
                    document.querySelector('tbody').innerHTML = html
                }
            } catch (error) {
                
            }
        }
    }
}