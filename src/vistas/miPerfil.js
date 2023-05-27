import { Pedidos } from "../bd/pedidos";
import { Perfil } from "../bd/perfiles";
import { User } from "../bd/user";

export default {
    template: `<div class="container rounded mt-5 mb-5 generalProfile">
    <div class="row text-white">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold" id="nombrePerfil"></span><span class="text-white" id="emailPerfil"></span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5 text-white">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2 nombres">
                    <div class="col-md-6">
                        <label class="labels">Name</label>
                        <input id="nombrePerfilInput" type="text" class="form-control" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        <label class="labels">Surname</label>
                        <input id="apellidoPerfilInput" type="text" class="form-control" value="" disabled>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Email</label>
                        <input type="text" class="form-control" value="" disabled>
                    </div>
                </div>
                <div class="row mt-3 datosPersonales">
                    <h4>Extra information</h4>
                    <div class="col-md-12">
                        <label class="labels">Mobile Number</label>
                        <input id="telefonoPerfilInput" type="text" class="form-control" placeholder="enter phone number" value="">
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Address Line 1</label>
                        <input type="text" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12">
                        <label class="labels">Postcode</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12">
                        <label class="labels">State</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12">
                        <label class="labels">Area</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                </div>
                <div class="row mt-3 ciudad">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"><h4 id="tituloPedidos"></h4></div><br>
                <div id="pedidos">

                </div>
                
            </div>
        </div>
    </div>
</div>
</div>
</div>`,
    script: async()=>{
        console.log('Esta es la ventana del perfil');
        document.querySelector('#divGrande').classList = "mainpageAbout"
        document.querySelector('main').classList = "profile"

        try {
            const usuario = await User.getUser()
            console.log(usuario);
            
            const perfilUsuario = await Perfil.getByUserId(usuario.id)
            console.log(perfilUsuario);

            document.querySelector('#emailPerfil').innerHTML = perfilUsuario.email
            document.querySelector('#nombrePerfil').innerHTML = perfilUsuario.nombre
            document.querySelector('#nombrePerfilInput').value = perfilUsuario.nombre
            document.querySelector('#apellidoPerfilInput').value = perfilUsuario.apellidos 
            document.querySelector('#telefonoPerfilInput').value = perfilUsuario.telefono

            const pedidosUsuario = await Pedidos.getAllByPerfilId(perfilUsuario.id)
            console.log("Numero de pedidos", pedidosUsuario.length);
            document.querySelector('#tituloPedidos').innerHTML = "Orders " +pedidosUsuario.length
            console.log(pedidosUsuario);
            pedidosUsuario.forEach((pedido, i) => {
                
                document.querySelector('#pedidos').innerHTML += `<a href="#/verPedidos"> nºReferencia: #${pedido.numeroPedido}</a><br><br>`
            });

        } catch (error) {
            
        }
    }
}