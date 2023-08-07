// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUserInformation()
    loadForms();
});

async function loadUserInformation(){
  try{  
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/admin/userData', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+token
    },
    body: token // Se envia el token para obtener el usuario 
    });
  
    const response = await request.json();
    if(response.status === 403){
        throw new Error('Acceso prohibido');
    }
    // Load and set the information of the user the token is OK
    document.getElementById("txt-username").textContent += response.username;
    document.getElementById("txt-name").textContent = response.firstname+" "+response.lastname;
    localStorage.setItem("id_usuario", response.id)
    localStorage.setItem("username", response.username)

  }catch(Error){
      window.location.href = '../login.html'
  }
}


async function loadForms(){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/admin/api/activeForms', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+token,
        }
      });
      const formularios_activos = await request.json();
      
      let listOfForms = ""
      for(let form of formularios_activos){
        let seeFormBtn = `<button style="padding: revert;" value="${form.id_formulario}" title="Ver" onclick="seeFormStructure(this)" class="btn btn-blue btn-circle" ><i class="bi bi-eye-fill"></i></button>`
        let downloadFormBtn = `<button style="padding: revert;" value="${form.id_formulario}" title="Descagar formulario" onclick="downloadForm(this)" class="btn btn-yellow btn-circle m-1"><i class="bi bi-box-arrow-down"></i></button>`
        let formDone = `<button style="padding: revert;" value="${form.id_formulario}" title="Realizado" onclick="completeForm(this)" class="btn btn-green btn-circle "><i class="bi bi-check-circle-fill"></i></button>`
        let formData = `<tr">
                            <td>${form.id_formulario}</td>
                            <td>${form.username}</td>
                            <td>${form.date}</td>
                            <td>${seeFormBtn}${downloadFormBtn}${formDone}</td>
                        </tr>`;
        listOfForms += formData;
      }
      document.getElementById("contentTable").outerHTML += listOfForms
      toastifyCorrectLoad("Formularios cargados correctamente", 1000)
  }catch(Error){
      toastifyError("Error al cargar los formularios", 1000)
  }
    
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
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/admin/api/seeFormStructure/' + id_formulario, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+token,
        'Accept': 'application/json'
      }
      });
    const formData = await request.json();
    console.log(formData)

    const direccion_completa = formData.direccion_url.split('/')
    document.getElementById('direccionUrl').value = direccion_completa[direccion_completa.length - 1]
    document.getElementById('nombreFormulario').value = formData.nombre_formulario
    document.getElementById('informacionFormulario').value = formData.informacion_formulario
    document.getElementById('cupoMaximo').value = formData.cupo_maximo
          
    let content = document.getElementById("formContent")
    content.innerHTML = formData.estructura_formulario
    toastifyCorrectLoad("Información cargada correctamente", 1000)
        
  }catch(Error){
    toastifyError("Error al cargar la información", 1000)
  }

}

/* Download the form in a txt file */
async function downloadForm(data){
  try{
    let id_formulario = data.value
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/admin/api/downloadForm/' + id_formulario, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+token,
          'Accept': 'application/json'
        }
      });
      const formData = await request.json();
      toastifyAllGood("Descargando", 1000)
      download("Formulario.html", formData.estructura_formulario)
      
  }catch(Error){
    toastifyError("Ocurrio un error al descargar la información", 1000)
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
  try{  
    let token = localStorage.getItem('token');
    let id_formulario = data.value
    const request = await fetch('http://localhost:8080/admin/completeForm', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+token
    },
    body: id_formulario // Se envia el token para obtener el usuario 
    });
  
    const response = await request.json();
    if(response.status === 403){
        throw new Error('Acceso prohibido');
    }
    
    toastifyAllGood("Formulario publicado correctamente", 1000)
  }catch(Error){
      toastifyError("Error al publicar el formulario", 1000)
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

  function toastifyCorrectLoad(textT, durationT){ 
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
        background: "linear-gradient(to right, #1ab7dc, #0abfb7, #09839d)",
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