async function addRequest(){

let datosGeneralosForm = {};
datosGeneralosForm.usuario = localStorage.usuario
datosGeneralosForm.direccion_url = "https://encurso.com/evento/"+document.getElementById('direccionUrl').value;
datosGeneralosForm.nombre_formulario = document.getElementById('nombreFormulario').value;
datosGeneralosForm.informacion_formulario = document.getElementById('informacionFormulario').value;
datosGeneralosForm.cupo_maximo = document.getElementById('cupoMaximo').value;
datosGeneralosForm.contador_edicion = document.getElementById("numCampos").textContent
datosGeneralosForm.numero_preguntas = document.getElementById("numCamposReales").textContent
datosGeneralosForm.status = "Creado"
datosGeneralosForm.estructura_formulario = document.getElementById("formContent").innerHTML


  const request = await fetch('api/agregarForm', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosGeneralosForm) // Llama esa función para convertir en json.
  });

  alert('Formulario creado correctamente');
  window.location.href="dashboard_admin.html";

}

function testRequest(){
    console.log("Nanana")
}



