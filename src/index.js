console.log(`
    __          __
  <(o )___    <(o )___   
 _ ( ._> /     ( ._> /
    "---'   _   "---'   _
      -
  Holla!
  Si te gusta este sitio puedes ver el codigo aqui 🚀
  ▷ https://github.com/Silvak/porfolio

  Tambien puedes contactarme en linkedin o via email 
  ▷ https://www.linkedin.com/in/jesus-e-silva 
  ▷ silvak.jeg@gmail.com

  
`);


//-----------------
const info1 = `
  <h3>Synergiart SL - Frontend Developer</h3>
  <p>feb. 2022 - actualidad</p>
  <ul>
    <li>Desarrollo de un admin panel en equipo para una plataforma de alimentacion</li>
    <li>Desarrollo de codigo sostenible y escalable</li>
    <li>Implementacion de wireframes y responsive</li>
    <li>configuracion de desplieges CI/CD</li>
  </ul>
`

const info2 = `
  <h3>Freelance - Desarrollador web </h3>
  <p>ene. 2020 - actualidad</p>
  <ul>
    <li>Creacion de aplicaiones responsive de dieferentes ambitos implementando backend y fronted</li>
    <li>Creaacion de landing pages</li>
    <li>Maquetar wireframes y implementar funcionalidades</li>
    <li>Creacion de backend</li>
    <li>Mantenimiento de webs</li>
    <li>Comunicacion con placas de desarrollo Iot - arduino</li>
  </ul>
`
const info3 = `
  <h3>Freelance - Diseño enfocado a web</h3>
  <p>abr. 2019 - oct. 2019</p>
  <ul>
    <li>Implemetacion de metodos creativos para el desarrollo de ideas sobre marca, nombre y recursos enfocados a web y RRSS</li>
    <li>Desarrollo de material gráfico</li>
    <li>Creacion de Marca y aplicacion de Mockup</li>
    <li>Diseño de wirerames y landing pages</li>
  </ul>
`

//------------------------------------------------------
//Jobs menu
let jobsList = document.querySelector('.jobs ul');
let jobsInfo = document.querySelector(".jobs-info-content");

jobsInfo.innerHTML = info1;

jobsList.addEventListener('click', (e)=>{
  for (let index = 0; index < jobsList.children.length; index++) {
    if(jobsList.children[index].classList.contains("active")){
      jobsList.children[index].classList.remove("active");
    }
  }
  switch (e.target.id) {
    case "exp-1":
      jobsInfo.innerHTML = info1;
      break;
    case "exp-2":
      jobsInfo.innerHTML = info2;
      break;
    case "exp-3":
      jobsInfo.innerHTML = info3;
      break;
    default:
      jobsInfo.innerHTML = info1;
      break;
  }
  e.target.classList.add("active")
})


//------------------------------------------------------
//menu button handdler event
let nav = document.querySelector('#nav');
let backArrow = document.querySelector('#back-arrow');
let scrollY = window.scrollY;
let menuBtn = document.querySelector('#navbar-btn');
let navdrop = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', (e) =>{
  if(navdrop.classList[1]){
    navdrop.classList.remove("show-menu");
  }else{
    navdrop.classList.add("show-menu");
  }
})


window.addEventListener('scroll', () =>
{
    //nav hidden scroll
    if(scrollY > 10 && !navdrop.classList[1]){
      nav.classList.add("hide-nav");
    }else{
      nav.classList.remove("hide-nav");
    }
    if(scrollY >  window.scrollY && !navdrop.classList[1]){
      nav.classList.remove("hide-nav");
    }

    //back-arrow
    if(scrollY > 800){
      backArrow.classList.remove("hide-back-arrow");
    }else{
      backArrow.classList.add("hide-back-arrow");
    }

    //set scroll y position
    scrollY = window.scrollY
})



/*------------------EMAIL-------------------*/
const form = document.querySelector(".contact-form");

async function handleSubmit(e) {
  e.preventDefault();
  var status = document.querySelector(".form-alert");
  var data = new FormData(e.target);
  fetch(e.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Mensaje enviado exitosamente!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Ocurrio un problema"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Ocurrio un problema al enviar el formulario."
  });
}
form.addEventListener("submit", handleSubmit)