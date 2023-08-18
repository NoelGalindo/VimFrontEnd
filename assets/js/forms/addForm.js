$(document).ready(function() {
  let path = window.location.protocol + '//' + window.location.host +'/conferencias/'
  document.getElementById("basic-addon3").innerHTML=path
});

async function addRequest(){
  try{
    let token = localStorage.getItem('token');
    let path = window.location.protocol + '//' + window.location.host +'/conferencias/'
    let datosGeneralosForm = {};
    datosGeneralosForm.username = localStorage.getItem("username")
    datosGeneralosForm.direccion_url = path+document.getElementById('direccionUrl').value;
    datosGeneralosForm.nombre_formulario = document.getElementById('nombreFormulario').value;
    datosGeneralosForm.informacion_formulario = document.getElementById('informacionFormulario').value;
    datosGeneralosForm.cupo_maximo = document.getElementById('cupoMaximo').value;
    datosGeneralosForm.contador_edicion = document.getElementById("numCampos").textContent
    datosGeneralosForm.numero_preguntas = document.getElementById("numCamposReales").textContent
    datosGeneralosForm.status = "Creado"
    datosGeneralosForm.estructura_formulario = document.getElementById("formContent").innerHTML


    const request = await fetch('http://localhost:8080/solicitud_form/api/agregarForm', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosGeneralosForm) // Llama esa función para convertir en json.
    });
    // Toastify       
    toastifyAllGood("Formulario creado correctamente", 1000)
    // Reload after some time
    setTimeout(function() {
      window.location.href="dashboard_manager.html"
    }, 1300);
  }
  catch(Error){
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




