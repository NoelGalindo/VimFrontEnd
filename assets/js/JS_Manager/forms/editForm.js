function optionSeeForm(id_formulario){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSeeContent'), {
        keyboard: false
      });
    modalCheckOption.show();
    getFormData(id_formulario)
}

async function getFormData(id_formulario){
    try{
      let token = localStorage.getItem('token');
      const request = await fetch('http://localhost:8080/formularios/api/getForm/' + id_formulario,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
      });
      const response = await request.json();
      if(response.status === 403){
        throw new Error('Acceso prohibido');
      }  
      document.getElementById('idFormulario').value = response.id_formulario
      document.getElementById('nombreFormulario').value = response.nombre_formulario
      document.getElementById('informacionFormulario').value = response.informacion_formulario
      document.getElementById("actualCapacity").value = response.cupo_maximo
      document.getElementById('cupoMaximo').value = response.cupo_maximo
      document.getElementById("numCamposReales").textContent = response.numero_preguntas
      document.getElementById("numCampos").textContent = response.contador_edicion
      let content = document.getElementById("formContent")
      content.innerHTML = response.estructura_formulario

      toastifyCorrectLoad("Información cargada correctamente", 1500)
      
    }catch(Error){
      toastifyError("Error al obtener el formulario", 1500)
    }
}

async function saveForm(){
  try{
    let token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const id_evento = urlParams.get('evento')
    let formEdit = {}
    formEdit.id_formulario = document.getElementById("idFormulario").value
    formEdit.id_evento = id_evento
    formEdit.nombre_formulario = document.getElementById('nombreFormulario').value;
    formEdit.informacion_formulario = document.getElementById('informacionFormulario').value;
    formEdit.cupo_maximo = document.getElementById('cupoMaximo').value;
    formEdit.contador_edicion = document.getElementById("numCampos").textContent
    formEdit.numero_preguntas = document.getElementById("numCamposReales").textContent
    formEdit.estructura_formulario = document.getElementById("formContent").innerHTML

    const request = await fetch('http://localhost:8080/formularios/api/updateForm', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEdit) // Llama esa función para convertir en json.
      });
      // Toastify
      toastifyAllGood("Formulario actualizado", 1500)

      /* Hide the modals */
      setTimeout(function() {
        location.reload();
      }, 1300);  
  }catch(Error){
    toastifyError("Error al guardar el formualrio", 1500)
  }
}

async function sendForm(id_formulario){
  try{
    let token = localStorage.getItem('token');
    let today = new Date();
    let form = {}
    form.id_formulario = id_formulario.value
    form.username = localStorage.getItem("username")
    form.date = today.toLocaleDateString('en-CA');
    form.estado = "PENDIENTE"

    const request = await fetch('http://localhost:8080/solicitud_form/api/sendForm', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form) // Llama esa función para convertir en json.
          });
    // Toastify       
    toastifyAllGood("Formulario enviado", 1000)
    // Reload after some time
    setTimeout(function() {
      location.reload();
    }, 1300);
    
  }catch(Error){
     toastifyError("Error al enviar el formualrio", 1500)
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
