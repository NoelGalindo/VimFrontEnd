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
    const request = await fetch('http://localhost:8080/EventosEnviados/api/getPublishedEvents', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+token,
          'Accept': 'application/json'
        }
      });
      const response = await request.json();
      let size = response.length
      let listOfForms = ""
      for(let i = 0;i<size;i++){
        let seeFormBtn = `<button style="padding: revert;" value="${response[i][0]}" title="Ver" onclick="seeFormStructure(this)" class="btn btn-blue btn-circle" ><i class="bi bi-eye-fill"></i></button>`
        let formData = `<tr">
                            <td>${response[i][0]}</td>
                            <td>${response[i][1]}</td>
                            <td>${response[i][2]}</td>
                            <td>${seeFormBtn}</td>
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

async function getFormData(id_evento){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/EventosEnviados/api/getFormInformation/' + id_evento, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+token,
        'Accept': 'application/json'
      }
      });
    const formData = await request.json();

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