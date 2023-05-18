const miPerfil = {
  template: `<h1>Aqui ira la vsita del Perfil</h1>`,
  script: () => {
    console.log("Esta es la ventana del perfil");
    document.querySelector(".mainpage").classList = "mainpageAbout";
  }
};
export {
  miPerfil as default
};
