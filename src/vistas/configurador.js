import { Motor } from "../bd/motor";
import { Rueda } from "../bd/ruedas";

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

            <h6 class="text-white mt-5 titulitos">Spoiler</h6>
            <select id="aleronSelect" class="form-select mt-5 bg-dark text-white" aria-label="Default select example" onchange="handleChange(this)">
              <option value="" selected disabled>-- Select Spoiler --</option>
              <option value="7">Low</option>
              <option value="8">High</option>
              <option value="9">No</option>
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
        console.log('Esta es la ventana del configurador');
        document.querySelector('#divGrande').classList = "bodyConfi"
        

        //genero options a partir de la base de datos

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
            console.log(motorApintar);
            selectedImage.src = `../img/${motorApintar.img}.png`
            document.querySelector('#addCard').innerHTML=`
                <div class="cardSetting">
                <div class="card2">
                        <h5 class="text-white primerH1">By<p>Phoenix</p></h5>
                        <h5 class="text-white">Power<p>${motorApintar.potencia} hp</p></h5>
                        <h5 class="text-white">Pair<p>${motorApintar.par} Nm</p></h5>
                        <h5 class="text-white">Displacement<p>${motorApintar.cilindrada} cc</p></h5>
                        <h5 class="text-white">MaxSpeed<p>${motorApintar.velocidadMax} km/h</p></h5>
                        <h5 class="text-white">Acceleration(0-100 km/h)<p>${motorApintar.aceleracion} s</p></h5>
                        <h5 class="text-white">Consumption<p>${motorApintar.consumo} L/100km</p></h5>  
                    </div></div>`;
            
        })

        //neumaticos
        const neumaticos = await Rueda.getAll()
        let neumaticosOptions = `<option value="" selected disabled>-- Select Tires --</option>`
        for(const rueda of neumaticos){
            neumaticosOptions += `<option value="4">${rueda.pulgadas}" - ${rueda.fabricante}</option>`
        }
        document.querySelector('#tireSelect').innerHTML = neumaticosOptions

        
        

        function handleChange(selectElement) {
            let selectedValue = selectElement.value;
            let selectedImage = document.getElementById('selectedImage');
            
            if (selectedValue === '1') {
              selectedImage.src = '/img/v8cad.png';
              
              selectElement.selectedIndex =0 ;
            } else if (selectedValue === '2') {
              selectedImage.src = '/img/v10cad.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
            } else if (selectedValue === '3') {
              selectedImage.src = '/img/v12cad.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
            } else if(selectedValue === '4'){
              selectedImage.src = '/img/tire1.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
            }else if(selectedValue === '5'){
              selectedImage.src = '/img/tire2.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
          }else if(selectedValue === '6'){
              selectedImage.src = '/img/tire3.jpg';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
            }else if(selectedValue === '7'){
              selectedImage.src = '/img/al1.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
          }else if(selectedValue === '8'){
              selectedImage.src = '/img/al2.png';
              document.querySelector('#addCard').innerHTML=`<div class="cardSetting">
          <div class="card2"></div></div>`;
        }else if(selectedValue === '9'){
              selectedImage.src = '/img/no.png';
              document.querySelector('#addCard').innerHTML=``;
            }}
  
            
        document.querySelector('.mooverButton').addEventListener("click",()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successful purchase!',
            showConfirmButton: false,
            timer: 1500
  })
        });
    }
}