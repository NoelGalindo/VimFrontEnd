$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  let linkCertificate = document.getElementById("linkImgCertificate")
  let listShowAllForms = document.getElementById("listShowAllForms")
  linkCertificate.href = "constancias.html?evento=" + id_evento
  listShowAllForms.href = "formularios.html?evento=" + id_evento

  // Getting the max number of registers admitted on the event
  eventMaxSize()
});

// Getting the max number of registers admitted on the event
async function eventMaxSize(){
  try{
      let token = localStorage.getItem('token');
      const urlParams = new URLSearchParams(window.location.search);
      const id_evento = urlParams.get('evento')
      
      const request = await fetch('https://encurso.fly.dev/formularios/api/eventMaxCapacity/'+ id_evento,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
      });
      const response = await request.text()
      document.getElementById("cupoMaximo").value = response
      document.getElementById("actualCapacity").value = response
    }
    catch(Error){
      toastifyError("Error al cargar la información.", 1500)
    }
  
}

let formCreteForm = document.getElementById("formCreateForm")
formCreteForm.addEventListener("submit", addRequest)

async function addRequest(e){
  e.preventDefault()
  /* Loading feature */
  let load = document.getElementById("loaderContainer")
  let mainSection = document.getElementById("mainSection")
  let sideMenu = document.getElementById("side-menu")
  let contentLoad = document.getElementById("contentLoad")

  try{
    // LOADING FEATURE STARTS
    contentLoad.style.display = "flex"
    mainSection.style.filter = "blur(2px)"
    sideMenu.style.filter = "blur(2px)"
    load.style.display = "block"

    let token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const id_evento = urlParams.get('evento')
    let datosGeneralosForm = {};
    datosGeneralosForm.id_evento = id_evento
    datosGeneralosForm.nombre_formulario = document.getElementById('nombreFormulario').value;
    datosGeneralosForm.informacion_formulario = document.getElementById('informacionFormulario').value;
    datosGeneralosForm.cupo_maximo = document.getElementById('cupoMaximo').value;
    datosGeneralosForm.contador_edicion = document.getElementById("numCampos").textContent
    datosGeneralosForm.numero_preguntas = document.getElementById("numCamposReales").textContent
    datosGeneralosForm.estructura_formulario = document.getElementById("formContent").innerHTML


    const request = await fetch('https://encurso.fly.dev/formularios/api/createForm', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosGeneralosForm) // Llama esa función para convertir en json.
    });

    /* Loading feature ends*/
    contentLoad.style.display = "none"
    load.style.display = "none"
    mainSection.style.filter = ""
    sideMenu.style.filter = ""

    // Toastify       
    toastifyAllGood("Formulario creado correctamente", 1000)
    // Reload after some time
    setTimeout(function() {
      window.location.href="formularios.html?evento="+id_evento
    }, 1300);
  }
  catch(Error){
    /* Loading feature ends*/
    contentLoad.style.display = "none"
    load.style.display = "none"
    mainSection.style.filter = ""
    sideMenu.style.filter = ""
    toastifyError("Error al crear el formulario", 1500)
  }

}

function toastifyAllGood(textT, durationT){ 
  Toastify({
    text: textT,
    duration: durationT,
    destination: "#",
    newWindow: false,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #09cd08, #0abf2b, #0b8928)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

function toastifyError(textT, durationT){
  Toastify({
    text: textT,
    duration: durationT,
    destination: "#",
    newWindow: false,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #830225, #e40e4f, #890b26)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}




