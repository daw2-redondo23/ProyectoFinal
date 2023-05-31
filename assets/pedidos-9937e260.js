import { P as Pedidos } from "./pedidos-5fd3b848.js";
import { U as User, P as Perfil } from "./main-e0161a73.js";
const pedidos = {
  template: `
    <div class="mainOrders">
    <h1 class="text-center text-white my-5"># Orders</h1>
    <div class="tableProfile">
      <table class="table table-dark table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>User</th>
            <th>Email</th>
            <th>Address</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
                      
  </div>`,
  script: async () => {
    console.log("Esta es la ventana de los pedidos");
    document.querySelector("#divGrande").classList = " mainOrders";
    try {
      const usuario = await User.getUser();
      const perfilUsuario = await Perfil.getByUserId(usuario.id);
      if (perfilUsuario.rol == "admin") {
        const pedidos2 = await Pedidos.getAll();
        let html = "";
        for (const elemento of pedidos2) {
          const perfil = await Perfil.getById(elemento.id_perfil);
          html += `<tr>
                            <th scope="row">1</th>
                            <td>${elemento.numeroPedido}</td>
                            <td>${perfil.nombre}</td>
                            <td>${perfil.email}</td>
                            <td>${perfil.direccion}</td>
                            <td>
                            <button  data-id="${elemento.id}" type="button" class="btn btn-danger ms-3 btnEliminar">Delete</button>
                            </td>
                        </tr>`;
        }
        console.log(html);
        document.querySelector("tbody").innerHTML = html;
        let btnEliminar = document.querySelectorAll(".btnEliminar");
        btnEliminar.forEach(async (boton) => {
          boton.addEventListener("click", async (e) => {
            let id = event.target.dataset.id;
            let pedidoAborrar = await Pedidos.getById(id);
            try {
              await Pedidos.borrar(id);
              Swal.fire({
                icon: "success",
                title: `Pedido ${pedidoAborrar.numeroPedido} Eliminado`
              });
              window.location.href = "#/verPedidos";
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: `${error}`
              });
            }
          });
        });
      } else {
        const pedidos2 = await Pedidos.getAllByPerfilId(perfilUsuario.id);
        let html = "";
        for (const elemento of pedidos2) {
          const perfil = await Perfil.getById(elemento.id_perfil);
          html += `<tr>
                        <th scope="row">1</th>
                        <td>${elemento.numeroPedido}</td>
                        <td>${perfil.nombre}</td>
                        <td>${perfil.email}</td>
                        <td>${perfil.direccion}</td>
                        <td>Bloqueado</td>
                    </tr>`;
        }
        document.querySelector("tbody").innerHTML = html;
      }
    } catch (error) {
      let actualizarContador = function() {
        if (tiempoRestante === 0) {
          window.location.href = "#/home";
        } else {
          tiempoRestante--;
          setTimeout(actualizarContador, 1e3);
        }
      };
      console.log("No hay usuario");
      document.querySelector("main").innerHTML = `
                    <style>
                    
                    /*Error Acces denied*/
                    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Sedgwick+Ave+Display');

                    :root {
                    --font-display: 'Sedgwick Ave Display';
                    --font-sans-serif: 'IBM Plex Mono';
                    --box-shadow: 0px 21px 34px 0px rgba(0, 0, 0, 0.89);
                    --color-bg: linear-gradient(to bottom, rgba(35,37,38,1) 0%,rgba(32,38,40,1) 100%);
                    --scene-width: 800px;
                    --scene-height: 600px;    
                    --delay-base: 500ms;
                    --delay-added: 100ms;
                    --acc-back: cubic-bezier(0.390, 0.575, 0.565, 1.000);
                    }

                    *,
                    *:before,
                    *:after{
                    box-sizing:border-box;
                    
                    }

                    header{
                        display: none;
                    }
                    body{
                    width: 100vw; height: 100vh;
                    margin: 0;
                    padding: 0;
                    background: var(--color-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    overflow: hidden;
                    }

                    .scene{
                    position: relative;
                    width: var(--scene-width);
                    height: var(--scene-height);
                    margin-left: 25%;
                    display: flex;
                    align-items: center;
                    }



                    .text{
                    transition: transform 600ms var(--acc-back), opacity 100ms ease-in;
                    height: inherit;
                    width: 100%; 
                    height: 100%;
                    z-index: 7;
                    position: relative;
                    pointer-events: none;
                    margin-top:40%;
                    margin-left:-25%;
                    }

                    .scene .text{
                    opacity: 1;
                    transform: scale(.91);
                    }

                    @keyframes popInImg{
                    0%{
                    transform: skewY(5deg) scaleX(.89) scaleY(.89);
                    opacity: 0;
                    }
                    100%{
                    opacity: 1;    
                    }
                    }

                    .text span{
                    display: block;
                    font-family: var(--font-sans-serif);
                    text-align: center;
                    text-shadow: var(--box-shadow);
                    animation: popIn 600ms var(--acc-back) 1 forwards;
                    opacity: 0;
                    }

                    @keyframes popIn{
                    0%,13%{
                    transform: scaleX(.89) scaleY(.75);
                    opacity: 0;
                    }
                    100%{

                    opacity: 1;    
                    }
                    }

                    .bg-403{
                    font-size: 440px;
                    font-family: var(--font-display);
                    animation-delay: calc(var(--delay-base) + 2 * var(--delay-added));
                    z-index: 0;
                    background: linear-gradient(to top, rgba(32,38,40,0) 25%,rgba(49,57,61,1) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    transform: translateX(-25%) translateZ(-100px) skewY(-3deg);
                    position: absolute;
                    pointer-events: none;
                    transition: transform 1200ms var(--acc-back);
                    }

                    .msg{
                    bottom: -38px; right: -21px;
                    font-size: 34px;
                    animation-delay: calc(var(--delay-base) + 3 * var(--delay-added));
                    color: #8b8b8b;
                    margin-top: 144px;
                    letter-spacing: 2px;
                    }

                    .msg span{
                    transform: skewX(-13deg);
                    display: inline-block;
                    color: #fff;
                    letter-spacing: -1px;
                    }



                    .support a:focus,
                    .support a:active{
                    outline: none;
                    }

                    @media screen and (max-width: 539px){

                    }


                    .lock{
                    box-shadow: 32px 8px 0 0 #e4e4e4, 40px 8px 0 0 #e4e4e4, 48px 8px 0 0 #e4e4e4, 56px 8px 0 0 #e4e4e4, 24px 16px 0 0 #cbcbcb, 32px 16px 0 0 #cbcbcb, 40px 16px 0 0 #909090, 48px 16px 0 0 #909090, 56px 16px 0 0 #cbcbcb, 64px 16px 0 0 #e4e4e4, 16px 24px 0 0 #cbcbcb, 24px 24px 0 0 #cbcbcb, 32px 24px 0 0 #909090, 56px 24px 0 0 #909090, 64px 24px 0 0 #cbcbcb, 72px 24px 0 0 #e4e4e4, 16px 32px 0 0 #cbcbcb, 24px 32px 0 0 #909090, 64px 32px 0 0 #909090, 72px 32px 0 0 #cbcbcb, 16px 40px 0 0 #cbcbcb, 24px 40px 0 0 #909090, 64px 40px 0 0 #909090, 72px 40px 0 0 #cbcbcb, 16px 48px 0 0 #909090, 24px 48px 0 0 #909090, 64px 48px 0 0 #909090, 72px 48px 0 0 #909090, 8px 56px 0 0 #fbec79, 16px 56px 0 0 #fbec79, 24px 56px 0 0 #fbec79, 32px 56px 0 0 #fbec79, 40px 56px 0 0 #fbec79, 48px 56px 0 0 #fbec79, 56px 56px 0 0 #fbec79, 64px 56px 0 0 #fbec79, 72px 56px 0 0 #fbec79, 80px 56px 0 0 #fbec79, 8px 64px 0 0 #ffc107, 16px 64px 0 0 #ffc107, 24px 64px 0 0 #ffc107, 32px 64px 0 0 #ffc107, 40px 64px 0 0 #ffc107, 48px 64px 0 0 #ffc107, 56px 64px 0 0 #ffc107, 64px 64px 0 0 #ffc107, 72px 64px 0 0 #ffc107, 80px 64px 0 0 #ffc107, 8px 72px 0 0 #ffc107, 16px 72px 0 0 #ffc107, 24px 72px 0 0 #ffc107, 32px 72px 0 0 #ffc107, 40px 72px 0 0 #ffc107, 48px 72px 0 0 #ffc107, 56px 72px 0 0 #ffc107, 64px 72px 0 0 #ffc107, 72px 72px 0 0 #ffc107, 80px 72px 0 0 #ffc107, 8px 80px 0 0 #ff9800, 16px 80px 0 0 #ffc107, 24px 80px 0 0 #ffc107, 32px 80px 0 0 #ffc107, 40px 80px 0 0 #ffc107, 48px 80px 0 0 #ff9800, 56px 80px 0 0 #ff9800, 64px 80px 0 0 #ff9800, 72px 80px 0 0 #ff9800, 16px 88px 0 0 #ff9800, 24px 88px 0 0 #ff9800, 32px 88px 0 0 #ff9800, 40px 88px 0 0 #ff9800, 48px 88px 0 0 #ff9800, 56px 88px 0 0 #ff9800, 64px 88px 0 0 #ff9800, 72px 88px 0 0 #ff9800, 24px 96px 0 0 #ff9800, 32px 96px 0 0 #ff9800, 40px 96px 0 0 #ff9800, 48px 96px 0 0 #ff9800, 56px 96px 0 0 #ff9800, 64px 96px 0 0 #ff9800;
                    height: 8px;
                    width: 8px;
                    position: absolute;
                    left: calc(50% - 48px);
                    top: 0;
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                    pointer-events: none;
                    outline: 1px solid transparent;
                    margin-top:20%;
                    margin-left:-25%;
                    }
                        /*Loader*/
                        .redirectText{
                        padding-top: 5%;
                        }
                        .progress-loader {
                        top: 50%;
                        left: 50%;
                        position: absolute;
                        transform: translate(-50%, -50%);
                        width: 150px;
                        background: rgba(236, 236, 238, 0.253);
                        height: 10px;
                        border-radius: 7px;
                        margin-top: 10%;
                        }
                        
                        .progress {
                        width: 100%;
                        height: 10px;
                        border-radius: 7px;
                        background: rgb(255, 255, 255);
                        transition: 0.5s;
                        animation: loading_44 3s;
                        }
                        
                        @keyframes loading_44 {
                        0% {
                        width: 0%;
                        }
                        100% {
                        width: 100%;
                        }
                        }
                    </style>
                    <header></header>
                    <main>
                    <div class="scene">
                    <div class="overlay"></div>
                    <div class="overlay"></div>
                    <div class="overlay"></div>
                    <div class="overlay"></div>
                    <span class="bg-403">403</span>
                    <div class="text">
                    <span class="hero-text"></span>
                    <span class="msg">can't let <span>you</span> in.</span>
                    <span class="support">
                        <span class="redirectText">Redirecting....</span>
                        <div class="progress-loader mt-5">
                            <div class="progress"></div>
                        </div>
                    </span>
                    </div>
                    <div class="lock"></div>
                </div>
                    </main>
                    `;
      var tiempoRestante = 3;
      actualizarContador();
    }
  }
};
export {
  pedidos as default
};
