const configurador = {
  template: `<h1>Aqui ira el configurador</h1>`,
  script: () => {
    console.log("Esta es la ventana del configurador");
    document.querySelector(".mainpage").classList = "mainpageAbout";
  }
};
export {
  configurador as default
};
