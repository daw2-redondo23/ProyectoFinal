export default  {
    template: ` <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <button type="button" class="btn btn-outline-secondary navbar-expand-lg" id="buttonInfo">+ INFORMATION</button>
      </div>
    </div>
  </div>
  
        
    `,
    script: ()=>{
      document.querySelector('.mainpageAbout').classList = "container-fluid mainpage"
      document.querySelector('footer') = "a"
    }
}