import "./main-b7be8d17.js";
const home = {
  template: ` <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <button type="button" class="btn btn-outline-secondary navbar-expand-lg" id="buttonInfo"><a href="#/information" class="text-decoration-none link-dark text-white">+ INFORMATION</a> </button>
      </div>
    </div>
  </div>
  
        
    `,
  script: () => {
    document.querySelector("footer").innerHTML = "";
    document.querySelector("#divGrande").classList = "container-fluid mainpage";
    document.querySelector("main").classList = "";
  }
};
export {
  home as default
};
