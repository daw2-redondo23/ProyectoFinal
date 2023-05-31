import { Asiento } from "../bd/asientos";
import { Coche } from "../bd/coche";
import { Motor } from "../bd/motor";
import { Pedidos } from "../bd/pedidos";
import { Perfil } from "../bd/perfiles";
import { Rueda } from "../bd/ruedas";
import { User } from "../bd/user";
import footer from "../componentes/footer";


export default {
    template: `<section>
    <div class="contact1">
      <div class="container-contact2 shadow p-5 mb-5 rounded">
        <div class="totConf d-flex">
          <div class="container inputConfig p-5 text-center">
            <h6 class="text-white titulitos">Engine</h6>
            <select id="engineSelect" class="form-select mt-5 bg-dark text-white w-100" aria-label="Default select example">
          
            </select>

            <h6 class="text-white mt-5 titulitos">Tire</h6>
            <select id="tireSelect" class="form-select mt-5 bg-dark text-white" aria-label="Default select example">

            </select>

            <h6 class="text-white mt-5 titulitos">Seat</h6>
            <select id="seatSelect" class="form-select mt-5 bg-dark text-white" aria-label="Default select example">

            </select>

            <h6 class="text-white mt-5 titulitos">Spoiler</h6>
            <select id="aleronSelect" class="form-select mt-5 bg-dark text-white" aria-label="Default select example">
              <option value="" selected disabled>-- Select Spoiler --</option>
              <option value="low">Low</option>
              <option value="high">High</option>
              <option value="no">No</option>
            </select>

            <div class="moverBtn">
              <button type="button" class="button mooverButton">
              <span class="button__text">Shop now</span>
              <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
            </div>
          </div>
          <img id="selectedImage" src="/img/918.png" alt="imagenes" class="seleccionador" />
        </div>
        <div id="addCard">
        </div>
      </div>
    </div>
  </section>`,
    script: async()=>{
        document.querySelector('footer').innerHTML = footer.template
        document.querySelector('#configurator').classList.add("active");
        document.querySelector('#home').classList="nav-link mx-2";
        document.querySelector('#about').classList="nav-link mx-2";
        console.log('Esta es la ventana del configurador');
        document.querySelector('#divGrande').classList = "bodyConfi"
        try {
          const usuario = await User.getUser()

          let valorMotor = 0
          let valorRueda = 0
          let valorAsiento = 0
          let valorAleron = 'null'
        //genero options y su funcionalidad a partir de la base de datos

        //motores
        const motores = await Motor.getAll()
        let motoresOptions = `<option value="" selected disabled>-- Select Engine --</option>`
        for(const motor of motores){
            motoresOptions += `<option value="${motor.id}">V${motor.numCilindros} ${motor.consumo} liters</option>`
        }
        document.querySelector('#engineSelect').innerHTML = motoresOptions

        const selectMotor = document.querySelector('#engineSelect')
        selectMotor.addEventListener("change", async(event)=>{
            let id = event.target.value
            let motorApintar = await Motor.getById(id)
            valorMotor = id
            console.log(motorApintar);
            selectedImage.src = `../img/${motorApintar.img}.png`
            document.querySelector('#addCard').innerHTML=`
                <div class="cardSetting shadow">
                  <div class="card2">
                    <h5 class="text-white primerH1">By<p>Phoenix</p></h5>
                    <h5 class="text-white">Power<p>${motorApintar.potencia} hp</p></h5>
                    <h5 class="text-white">Pair<p>${motorApintar.par} Nm</p></h5>
                    <h5 class="text-white">Displacement<p>${motorApintar.cilindrada} cc</p></h5>
                    <h5 class="text-white">MaxSpeed<p>${motorApintar.velocidadMax} km/h</p></h5>
                    <h5 class="text-white">Acceleration(0-100 km/h)<p>${motorApintar.aceleracion} s</p></h5>
                    <h5 class="text-white">Consumption<p>${motorApintar.consumo} L/100km</p></h5>  
                  </div>
                </div>`;
        })

        //neumaticos
        const neumaticos = await Rueda.getAll()
        let neumaticosOptions = `<option value="" selected disabled>-- Select Tires --</option>`
        for(const rueda of neumaticos){
            neumaticosOptions += `<option value="${rueda.id}">${rueda.pulgadas} - ${rueda.fabricante}</option>`
        }

        document.querySelector('#tireSelect').innerHTML = neumaticosOptions

        const selectNeumaticos = document.querySelector('#tireSelect');
        selectNeumaticos.addEventListener("change", async(event)=>{
          let id = event.target.value;
          const neumaticoApintar = await Rueda.getById(id)
          valorRueda = id
          console.log(neumaticoApintar);
          selectedImage.src = `../img/${neumaticoApintar.img}.png`
          document.querySelector('#addCard').innerHTML=`
                <div class="cardSetting shadow">
                  <div class="card2">
                    <h5 class="text-white primerH1">By<p>Phoenix</p></h5>
                    <h5 class="text-white">Inches<p>${neumaticoApintar.pulgadas}</p></h5>
                    <h5 class="text-white">Measures<p>${neumaticoApintar.medidas}</p></h5>
                    <h5 class="text-white">Noise<p>${neumaticoApintar.ruido} </p></h5>
                    <h5 class="text-white">Manufacturer<p>${neumaticoApintar.fabricante}</p></h5>
                  </div>
                </div>`;

        })

        //asientos
        const asientos = await Asiento.getAll()
        let asientoOptions = `<option value="" selected disabled>-- Select Seat --</option>`
        for(const asiento of asientos){
            asientoOptions += `<option value="${asiento.id}">${asiento.modelo} ${asiento.color} of ${asiento.material} - ${asiento.fabricante}</option>`
        }

        document.querySelector('#seatSelect').innerHTML = asientoOptions

        const selectAsientos = document.querySelector('#seatSelect');
        selectAsientos.addEventListener("change", async(event)=>{
          let id = event.target.value;
          const asientoApintar = await Asiento.getById(id)
          valorAsiento = id
          console.log(asientoApintar);
          selectedImage.src = `../img/${asientoApintar.img}.png`
          document.querySelector('#addCard').innerHTML=`
                <div class="cardSetting shadow">
                  <div class="card2">
                    <h5 class="text-white primerH1">By<p>Phoenix</p></h5>
                    <h5 class="text-white">Manufacturer<p>${asientoApintar.fabricante}</p></h5>
                    <h5 class="text-white">Material<p>${asientoApintar.material}</p></h5>
                    <h5 class="text-white">Colour<p>${asientoApintar.color}</p></h5>
                    <h5 class="text-white">Model<p>${asientoApintar.modelo}</p></h5>
                  </div>
                </div>`;

        })
      
        //aleron

        const selectAleron = document.querySelector('#aleronSelect');
        selectAleron.addEventListener("change", (e)=>{
          document.querySelector('#addCard').innerHTML= ``
          let id = event.target.value
          valorAleron = id
          selectedImage.src = `../img/${id}.png`
          
        })

  
            
        document.querySelector('.mooverButton').addEventListener("click", async()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successful purchase!',
            showConfirmButton: false,
            timer: 1500
          })

          if(valorMotor > 0){
            if(valorRueda > 0){
              if(valorAsiento > 0){
                if(valorAleron != 'null'){
                  console.log(valorAleron, valorAsiento, valorMotor, valorRueda);
                  const cocheAcrear = {
                    asiento: valorAsiento,
                    motor: valorMotor,
                    neumatico: valorRueda,
                    aleron: valorAleron
                  }
                  const cocheCreado = await Coche.crear(cocheAcrear)
                  let idCoche = cocheCreado[0].id
                  const perfilUsuario = await Perfil.getByUserId(usuario.id)
                  const pedidoAcrear = {
                    created_at: new Date().toISOString().split('T')[0],
                    id_coche: idCoche,
                    id_perfil: perfilUsuario.id,
                    precio: 0
                  }
                  const pedidoCreado = await Pedidos.crear(pedidoAcrear)
                  console.log(pedidoCreado);
                }
                else{
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Spoiler Missing!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              }
              else{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Seat Missing!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            }
            else{
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Tire Missing!',
                showConfirmButton: false,
                timer: 1500
              })
            }
           
          }
          else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Motor Missing!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          
        });
          
        } catch (error) {
          console.log("No hay usuario");
          document.querySelector('main').innerHTML= `
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
                    `
                            // Tiempo en segundos para el temporizador
                            var tiempoRestante = 3;

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
    
        
    }
}