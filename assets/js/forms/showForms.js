// Call the dataTables jQuery plugin
$(document).ready(function() {
  let path = window.location.protocol + '//' + window.location.host +'/conferencias/'
  document.getElementById("basic-addon3").innerHTML=path
  actualizarUsername();
  cargarFormularios();
});


async function actualizarUsername(){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/solicitud_form/userData', {
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

async function cargarFormularios(){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/solicitud_form/api/FormulariosActivos', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'  
      },
      body: token
    });
    const formularios = await request.json();
  
    let listOfForms = "";
    for (let form of formularios){
      // Form under revisión
      if(form.status === "En revisión"){
        let drop = '<button title="Eliminar" onclick="eliminarFormulario('+form.id_formulario+')" class="btn btn-danger btn-circle btn-sm" disabled><i class="bi bi-trash"></i> </button>'
        let edit = '<button title="Editar" value="'+form.id_formulario+'" onclick="optionSeeForm(this)" class="btn btn-info btn-circle btn-sm m-1" disabled><i class="bi bi-pencil"></i></button>'
        let send = '<button title="Enviar" value="'+form.id_formulario+'" onclick="sendForm(this)" class="btn btn-success btn-circle btn-sm" disabled><i class="bi bi-send-plus"></i></button>'
        let formData = `<tr style="background-color: lightgoldenrodyellow;">
                            <td>${form.direccion_url}</td>
                            <td>${form.nombre_formulario}</td>
                            <td>${form.informacion_formulario}</td>
                            <td>${drop}${edit}${send}</td>
                            <td>${form.status}</td>
                        </tr>`;
        listOfForms += formData;
      }
      // Form ready to use
      if(form.status === "Listo"){
        let direccion_completa = form.direccion_url.split('/')
        let tableName = ""+direccion_completa[direccion_completa.length - 1]
        let checkbtn = '<button style="padding: revert;" value="'+tableName+'" title="Ver usuarios" onclick="seeRegisterUsers(this)" class="btn btn-green btn-circle btn-sm"><i class="bi bi-check-square"></i> </button>'
        let confirmedUsersBtn = '<button style="padding: revert;" value="'+tableName+'" title="Ver usuarios aceptados" onclick="seeConfirmedUsers(this)" class="btn btn-blue btn-circle btn-sm"><i class="bi bi-list-ul"></i> </button>'
        let formData = `<tr style="background-color: lightgreen;">
                            <td><a href="${form.direccion_url}" target="blank">${form.direccion_url}</a></td>
                            <td>${form.nombre_formulario}</td>
                            <td>${form.informacion_formulario}</td>
                            <td>${checkbtn}${confirmedUsersBtn}</td>
                            <td>${form.status}</td>
                        </tr>`;
        listOfForms += formData;
      }if(form.status==="Creado"){
        // Form created recently
        let drop = '<a href="#" title="Eliminar" onclick="eliminarFormulario('+form.id_formulario+')" class="btn btn-danger btn-circle btn-sm" ><i class="bi bi-trash"></i> </a>'
        let edit = '<button title="Editar" value="'+form.id_formulario+'" onclick="optionSeeForm(this)" class="btn btn-info btn-circle btn-sm m-1" ><i class="bi bi-pencil"></i></button>'
        let send = '<button title="Enviar" value="'+form.id_formulario+'" onclick="sendForm(this)" class="btn btn-success btn-circle btn-sm" ><i class="bi bi-send-plus"></i></button>'
        let formData = `<tr>
                            <td>${form.direccion_url}</td>
                            <td>${form.nombre_formulario}</td>
                            <td>${form.informacion_formulario}</td>
                            <td>${drop}${edit}${send}</td>
                            <td>${form.status}</td>
                        </tr>`;
        listOfForms += formData;
      }
    }
    toastifyCorrectLoad("Formularios cargados correctamente", 1000)
    document.getElementById("contentTable").outerHTML += listOfForms
  }catch(Error){
    toastifyError("Error al cargar los formularios", 1000)
  }
  
  }

  async function eliminarFormulario(id){
    try{
      let token = localStorage.getItem('token');
      if(confirm('¿Desea eliminar este formulario? ')){
          const request = await fetch('http://localhost:8080/solicitud_form/api/eliminarFormulario/'+id, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': 'Bearer '+token
                  }
                });
          toastifyAllGood("Formulario eliminado", 1000)
          setTimeout(function() {
            location.reload();
          }, 1300);
      }
    }catch(Error){
      toastifyError("Error al eliminar el formulario", 1000)
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