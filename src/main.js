import { footer } from "./componentes/footer";
import { header } from "./componentes/header";
import { home } from "./vistas/home";
import { pruebas } from "./vistas/pruebas";

document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = home.template
document.querySelector('footer').innerHTML = footer.template

//Supabase
document.querySelector('main').innerHTML = pruebas.template
pruebas.script()