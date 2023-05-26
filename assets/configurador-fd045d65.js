import { s as supabase } from "./main-b7be8d17.js";
class Motor {
  //Mapping de las propiedades de la tabla motor
  constructor(id = null, created_at = null, fabricante = null, potencia = null, par = null, cilindrada = null, consumo = null, velocidadMax = null, aceleracion = null, numCilindros = null, img = null) {
    this.id = id;
    this.created_at = created_at;
    this.fabricante = fabricante;
    this.potencia = potencia;
    this.par = par;
    this.cilindrada = cilindrada;
    this.consumo = consumo;
    this.velocidadMax = velocidadMax;
    this.aceleracion = aceleracion;
    this.numCilindros = numCilindros;
    this.img = img;
  }
  static async getAll() {
    let { data: motor, error } = await supabase.from("motor").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return motor.map(({ id, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros, img }) => {
      return new Motor(id, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros, img);
    });
  }
  static async getById(id) {
    let { data: motor, error } = await supabase.from("motor").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Motor(motor.id, motor.created_at, motor.fabricante, motor.potencia, motor.par, motor.cilindrada, motor.consumo, motor.velocidadMax, motor.aceleracion, motor.numCilindros, motor.img);
  }
  //funcion para crear un motor
  static async crear(motorobjeto) {
    const { data, error } = await supabase.from("motor").insert(motorobjeto).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  static async borrar(id) {
    const { error } = await supabase.from("motor").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
class Rueda {
  //Mapping de las propiedades de la tabla ruedas
  constructor(id = null, created_at = null, pulgadas = null, medidas = null, ruido = null, fabricante = null) {
    this.id = id;
    this.created_at = created_at;
    this.pulgadas = pulgadas;
    this.medidas = medidas;
    this.ruido = ruido;
    this.fabricante = fabricante;
  }
  static async getAll() {
    let { data: ruedas, error } = await supabase.from("ruedas").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return ruedas.map(({ id, created_at, pulgadas, medidas, ruido, fabricante }) => {
      return new Rueda(id, created_at, pulgadas, medidas, ruido, fabricante);
    });
  }
  static async getById(id) {
    let { data: ruedas, error } = await supabase.from("ruedas").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Rueda(asiento.id, asiento.created_at, asiento.fabricante, asiento.material, asiento.color, asiento.modelo);
  }
  //funcion para crear un motor
  static async crear(ruedaObjeto) {
    const { data, error } = await supabase.from("ruedas").insert(ruedaObjeto).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  static async borrar(id) {
    const { error } = await supabase.from("asientos").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
const configurador = {
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
  script: async () => {
    console.log("Esta es la ventana del configurador");
    document.querySelector("#divGrande").classList = "bodyConfi";
    const motores = await Motor.getAll();
    let motoresOptions = `<option value="" selected disabled>-- Select Engine --</option>`;
    for (const motor of motores) {
      motoresOptions += `<option value="${motor.id}">V${motor.numCilindros} ${motor.consumo} liters</option>`;
    }
    document.querySelector("#engineSelect").innerHTML = motoresOptions;
    const selectMotor = document.querySelector("#engineSelect");
    selectMotor.addEventListener("change", async (event) => {
      let id = event.target.value;
      let motorApintar = await Motor.getById(id);
      console.log(motorApintar);
      selectedImage.src = `../img/${motorApintar.img}.png`;
      document.querySelector("#addCard").innerHTML = `
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
    });
    const neumaticos = await Rueda.getAll();
    let neumaticosOptions = `<option value="" selected disabled>-- Select Tires --</option>`;
    for (const rueda of neumaticos) {
      neumaticosOptions += `<option value="4">${rueda.pulgadas}" - ${rueda.fabricante}</option>`;
    }
    document.querySelector("#tireSelect").innerHTML = neumaticosOptions;
    document.querySelector(".mooverButton").addEventListener("click", () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successful purchase!",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
};
export {
  configurador as default
};
