const footer = {
  template: `
        <p class="pb-5">® Phoenix - Developed by Ruben & Joel</p>
    `
};
const about = {
  template: `<section class="hero">
    <h1>About Us</h1>
    <p>Young automotive enthusiasts.</p>
  </section>
  <section class="features">
    <div class="f1 mx-5">
      <h2>Mission</h2>
      <p>Far exceed the expectations that our customers have together with satisfying the need.</p>
    </div>

    <div class="f2 mx-5">
      <h2>Vision</h2>
      <p>Our vision is to become market leaders with this model of selling automotive products and services.</p>
    </div>

    <div class="f3 mx-5">
      <h2>Values</h2>
      <p>We work with passion, integrity and professionalism to provide our clients with the best experience.</p>
    </div>
  </section>
  <h2 class="teamText">Our team</h2>
  <section class="team">
    <div class="d-flex personasTeam">
      <div class="member me-5 personasTeam1">
        <img src="img/ruben.jpg" alt="Miembro del equipo" id="facePic">
        <h3>Rubén</h3>
        <p>CEO & Functioning developer</p>
      </div>

      <div class="member personasTeam2">
        <img src="img/joel.jpg" alt="Miembro del equipo" id="facePic">
        <h3>Joel</h3>
        <p>CEO & Graphic developer</p>
      </div>
    </div> 
  </section>
  <section >
    <div class="contact1">
      <div class="container-contact1 shadow p-5 mb-5 rounded">
        <div class="contact1-pic js-tilt" data-tilt>
          <img src="img/img-01.png" alt="IMG">
        </div>
        <form class="contact1-form validate-form">
          <span class="contact1-form-title text-white">
            Contact Us 
          </span>
          <div class="wrap-input1 validate-input" data-validate = "Name is required">
            <input class="input1" type="text" name="name" placeholder="Name">
            <span class="shadow-input1"></span>
          </div>
          <div class="wrap-input1 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input1" type="text" name="email" placeholder="Email">
            <span class="shadow-input1"></span>
          </div>
          <div class="wrap-input1 validate-input" data-validate = "Message is required">
            <textarea class="input1" name="message" placeholder="Message"></textarea>
            <span class="shadow-input1"></span>
          </div>
          <div class="container-contact1-form-btn">
            <button class="contact1-form-btn" id="send">Send</button>
          </div>
        </form>
      </div>
    </div>



  
  </section>
  `,
  script: () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-23581568-13");
    document.querySelector("#send").addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "success",
        title: "Send it",
        text: "Your email has been sent successfully"
      });
    });
    document.querySelector("#divGrande").classList = "mainpageAbout";
    document.querySelector("footer").innerHTML = footer.template;
  }
};
export {
  about as default
};
