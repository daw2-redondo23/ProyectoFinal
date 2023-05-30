import "./main-301683d2.js";
const home = {
  template: ` <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 homeButton">
        <button type="button" class="btn btn-outline-secondary navbar-expand-lg" id="buttonInfo"><a href="#/information" class="text-decoration-none link-dark text-white">+ INFORMATION</a> </button>
      </div>
    </div>
  </div>
  
        
    `,
  script: () => {
    document.querySelector("footer").innerHTML = "";
    document.querySelector("#home").classList.add("active");
    document.querySelector("#configurator").classList = "nav-link mx-2";
    document.querySelector("#about").classList = "nav-link mx-2";
    document.querySelector("#divGrande").classList = "mainpage";
    document.querySelector("main").classList = "";
  }
};
export {
  home as default
};
