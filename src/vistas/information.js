export default {
    template: `<section class="hero2">
    <h1>Discover the leak</h1>
    <p>mouse over here</p>
</section>
<section class="features">
  <div class="f1 mx-5">
    <h2>Power</h2>
    <p>Engines>800hp</p>
    <p>750Nm minimum</p>
  </div>

  <div class="f2 mx-5">
    <h2>Acceleration</h2>
    <p>0-100 Km/h in 2.4</p>
    <p>0-200 Km/h in 3.2</p>
  </div>

  <div class="f3 mx-5">
    <h2>Design</h2>
    <p>Powered by PORSCHE</p>
    <p>1 OF 1</p>
  </div>
</section>`,
    script: ()=>{
        console.log("Esta es la vista information");
        document.querySelector('#divGrande').classList = " mainPageAbout mainPageInfo"
    }
}