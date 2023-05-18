const pedidos = {
  template: `<h1>Aqui ira la vista de los pedidos</h1>`,
  script: () => {
    console.log("Esta es la ventana de los pedidos");
    document.querySelector(".mainpage").classList = "mainpageAbout";
  }
};
export {
  pedidos as default
};
