
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
  <h4>tecnologias: </h4>
  <div>
    <span class="about-tech-mark">Javascript</span>
    <span class="about-tech-mark">html/css</span> 
    <span class="about-tech-mark">React</span> 
    <span class="about-tech-mark">GraphQL</span>
    <span class="about-tech-mark">Apollo</span>
  </div>
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
  <h4>tecnologias: </h4>
  <div>
    <span class="about-tech-mark">Javascript</span>
    <span class="about-tech-mark">html/css</span> 
    <span class="about-tech-mark">Sass</span> 
    <span class="about-tech-mark">Bootstrap</span> 
    <span class="about-tech-mark">React</span> 
    <span class="about-tech-mark">Next</span> 
    <span class="about-tech-mark">Python/Flask</span>
    <span class="about-tech-mark">Firebase</span>
    <span class="about-tech-mark">sql</span>  
  </div>
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
  <h4>tecnologias:</h4>
  <div>
    <span class="about-tech-mark">adobe XD</span>
    <span class="about-tech-mark">figma</span> 
    <span class="about-tech-mark">illustrator</span> 
    <span class="about-tech-mark">photoshop</span>  
  </div>
`



//------------------------------------------------------
//menu button handdler event
let menuBtn = document.querySelector('#navbar-btn');
menuBtn.addEventListener('click', (e) =>{
  console.log(menuBtn.classList)
  if(menuBtn.classList == "show-menu"){
    menuBtn.classList.remove("show-menu");
  }else{
    menuBtn.classList.add("show-menu");
  }
})

 
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



//----------------------------------------------
let nav = document.querySelector('#nav');
let scrollY = window.scrollY;

window.addEventListener('scroll', () =>
{
    //nav hidden scroll
    if(scrollY > 10){
      nav.classList.add("hide-nav");
    }else{
      nav.classList.remove("hide-nav");
    }
    if(scrollY >  window.scrollY){
      nav.classList.remove("hide-nav");
    }

    //set scroll y position
    scrollY = window.scrollY
})