const usuarios = {
  template: `<h1>Aqui ira la vista de los usuarios</h1>`,
  script: () => {
    console.log("Esta es la ventana para ver los usuarios");
    document.querySelector(".mainpage").classList = "mainpageAbout";
  }
};
export {
  usuarios as default
};
