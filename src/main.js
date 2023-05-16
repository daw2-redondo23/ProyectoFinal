
import header from "./componentes/header";
import { enrutador } from "./componentes/router";

import pruebas from "./vistas/pruebas";

document.querySelector('header').innerHTML = header.template
header.script()

enrutador.observadorRutas()
window.location = '/#/home'

//Supabase
// document.querySelector('main').innerHTML = pruebas.template
// pruebas.script()

