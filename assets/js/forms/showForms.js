// Call the dataTables jQuery plugin
$(document).ready(function() {
    actualizarUsername();
    cargarFormularios();
});

async function actualizarUsername(){
  let token = localStorage.getItem('token');
  const request = await fetch('http://127.0.0.1:8080/solicitud_form/userData', {
  method: 'POST',
  headers: getHeaders(),
  body: token // Se envia el token para obtener el usuario 
  });
  try{
      const response = await request.json();
      if(response.status === 403){
          throw new Error('Acceso prohibido');
      }
      // Load and set the information of the user the token is OK
      document.getElementById("txt-username").textContent = response.username;
      document.getElementById("txt-name").textContent = response.firstname+" "+response.lastname;
      localStorage.setItem("id_usuario", response.id)
      
  }catch(Error){
      window.location.href = 'login.html'
  }
}

async function cargarFormularios(){
    let token = localStorage.getItem('token');
    const request = await fetch('http://127.0.0.1:8080/solicitud_form/api/FormulariosActivos', {
      method: 'POST',
      headers: getHeaders(),
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
        let checkbtn = '<button style="padding: revert;" title="Ver usuarios" onclick="seeRegisterUsers('+form.id_formulario+')" class="btn btn-green btn-circle btn-sm"><i class="bi bi-check-square"></i> </button>'
        let confirmedUsersBtn = '<button style="padding: revert;" title="Ver usuarios aceptados" onclick="seeConfirmedUsers('+form.id_formulario+')" class="btn btn-blue btn-circle btn-sm"><i class="bi bi-list-ul"></i> </button>'
        let formData = `<tr style="background-color: lightgreen;">
                            <td><a href="#" target="blank">${form.direccion_url}</a></td>
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
    document.getElementById("contentTable").outerHTML += listOfForms
  
  }

  function getHeaders(){
    return {
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
  }


  async function eliminarFormulario(id){

      if(confirm('¿Desea eliminar este formulario? '+ id)){
          const request = await fetch('api/eliminarFormulario/'+id, {
                  method: 'DELETE',
                  headers: getHeaders()
                });
          location.reload(); // Actualiza la página.
      }

  }