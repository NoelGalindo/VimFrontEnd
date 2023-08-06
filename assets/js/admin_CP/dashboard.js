// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadForms();
    actualizarUsername()
});

/* Load the forms that have been send */
function actualizarUsername(){
    document.getElementById("txt-username").textContent = localStorage.usuario;
}

async function loadForms(){
    const request = await fetch('api/activeForms', {
        method: 'GET',
        headers: getHeaders()
      });
      const formularios_activos = await request.json();
      
      let listOfForms = ""
      for(let form of formularios_activos){
        let seeFormBtn = `<button style="padding: revert;" value="${form.id_formulario}" title="Ver" onclick="seeFormStructure(this)" class="btn btn-blue btn-circle" ><i class="bi bi-eye-fill"></i></button>`
        let downloadFormBtn = `<button style="padding: revert;" value="${form.id_formulario}" title="Descagar formulario" onclick="downloadForm(this)" class="btn btn-yellow btn-circle m-1"><i class="bi bi-box-arrow-down"></i></button>`
        let formDone = `<button style="padding: revert;" value="${form.id_formulario}" title="Realizado" onclick="completeForm(this)" class="btn btn-green btn-circle "><i class="bi bi-check-circle-fill"></i></button>`
        let formData = `<tr">
                            <td>${form.id_formulario}</td>
                            <td>${form.usuario}</td>
                            <td>${form.date}</td>
                            <td>${seeFormBtn}${downloadFormBtn}${formDone}</td>
                        </tr>`;
        listOfForms += formData;
      }
      document.getElementById("contentTable").outerHTML += listOfForms
}

/* See the estructure of the form */
function seeFormStructure(data){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSeeContent'), {
        keyboard: false
      });
      
    modalCheckOption.show();
    getFormData(data.value)
}

async function getFormData(id_formulario){
    const request = await fetch('api/seeFormStructure/' + id_formulario, {
        method: 'GET',
        headers: getHeaders()
      });
      const formData = await request.json();
      console.log(formData)

      if(formData != null){
        const direccion_completa = formData.direccion_url.split('/')
        document.getElementById('direccionUrl').value = direccion_completa[direccion_completa.length - 1]
        document.getElementById('nombreFormulario').value = formData.nombre_formulario
        document.getElementById('informacionFormulario').value = formData.informacion_formulario
        document.getElementById('cupoMaximo').value = formData.cupo_maximo
        
        let content = document.getElementById("formContent")
        content.innerHTML = formData.estructura_formulario
      }else{
        alert('Error')
      }

}

/* Download the form in a txt file */
 async function downloadForm(data){
    let id_formulario = data.value
    const request = await fetch('api/downloadForm/' + id_formulario, {
        method: 'GET',
        headers: getHeaders()
      });
      const formData = await request.json();
      console.log(formData)

      if(formData != null){
        download("Formulario.html", formData.estructura_formulario)
      }else{
        alert('Error')
      }
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

/* Complete the form and change the state in the DB */
async function completeForm(data){
  let id_formulario = data.value
  const request = await fetch('api/completeForm', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: id_formulario // Llama esa función para convertir en json.
  });

  alert('Formulario completado correctamente');
  
}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
    };
  }