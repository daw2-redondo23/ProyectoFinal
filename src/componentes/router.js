export const enrutador = {
  rutas: {
    home: import('../vistas/home'),
    about: import('../vistas/about'),
    configurador: import('../vistas/configurador'),
    miPerfil: import("../vistas/miPerfil"),
    verUsuarios: import("../vistas/usuarios"),
    verPedidos: import("../vistas/pedidos"),
    information: import("../vistas/information"),
  },
  router: async () => {
    const pathCompleto = window.location.hash;
    const path = pathCompleto.split('/')[1];
    const parametro = pathCompleto.split('/')[2];

    const componenteVista = await enrutador.rutas[path];
    
    if (componenteVista) {
      try {
        const vista = await componenteVista.default;
        
      
        if (vista) {
          console.log("ruta correcta");
          document.querySelector('main').innerHTML = vista.template;
          vista.script(parametro);

        } else {
          console.log("vista error");
          cargarVistaError404();
        }
      } catch (error) {
        console.log(error);
        cargarVistaError404();
      }
    } 
    else {
      console.log("vista error");
      cargarVistaError404();
    }
  },
  observadorRutas: () => {
    document.body.addEventListener('click', event => {
      const link = event.target;
      if (link.tagName === 'A') {
        event.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({ path: href }, '', href);
        enrutador.router();
      }
    });

    window.addEventListener('popstate', (e) => {
      console.log('evento popstate - Te estás moviendo por el historial');
      enrutador.router();
    });
  }
};

async function cargarVistaError404() {
  const error404 = await import('../vistas/error404');
  const vista = error404.default;
  document.querySelector('main').innerHTML = vista.template;

  vista.script();
}