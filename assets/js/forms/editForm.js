function optionSeeForm(data){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSeeContent'), {
        keyboard: false
      });
      
    modalCheckOption.show();
    getFormData(data.value)
}

async function getFormData(id_formulario){
    const request = await fetch('api/getFormData/' + id_formulario,{
        method: 'GET',
        headers: getHeaders()
      });
      const valores = await request.json();
        
      if(valores != null){
        document.getElementById('id_formulario').value = valores.id_formulario
        const direccion_completa = valores.direccion_url.split('/')
        document.getElementById('direccionUrl').value = direccion_completa[direccion_completa.length - 1]
        document.getElementById('nombreFormulario').value = valores.nombre_formulario
        document.getElementById('informacionFormulario').value = valores.informacion_formulario
        document.getElementById('cupoMaximo').value = valores.cupo_maximo
        document.getElementById("numCamposReales").textContent = valores.numero_preguntas
        document.getElementById("numCampos").textContent = valores.contador_edicion
        let content = document.getElementById("formContent")
        content.innerHTML = valores.estructura_formulario
      }else{
        alert('Error')
      }
      

}

async function saveForm(){
    let formEdit = {}
    formEdit.id_formulario = document.getElementById("id_formulario").value
    formEdit.usuario = localStorage.usuario
    formEdit.direccion_url = "https://encurso.com/evento/"+document.getElementById('direccionUrl').value;
    formEdit.nombre_formulario = document.getElementById('nombreFormulario').value;
    formEdit.informacion_formulario = document.getElementById('informacionFormulario').value;
    formEdit.cupo_maximo = document.getElementById('cupoMaximo').value;
    formEdit.contador_edicion = document.getElementById("numCampos").textContent
    formEdit.numero_preguntas = document.getElementById("numCamposReales").textContent
    formEdit.estructura_formulario = document.getElementById("formContent").innerHTML

    const request = await fetch('api/changeForm', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEdit) // Llama esa función para convertir en json.
      });

      alert('Formulario actualizado correctamente');
      window.location.href="dashboard_admin.html";

}

async function sendForm(id_formulario){
  let today = new Date();
    let form = {}
    form.id_formulario = id_formulario.value
    form.usuario = localStorage.usuario
    form.date = today.toLocaleDateString('en-CA');

    const request = await fetch('api/sendForm', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form) // Llama esa función para convertir en json.
          });

          alert('Formulario enviado correctamente');
          window.location.href="dashboard_admin.html";

}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
    };
}