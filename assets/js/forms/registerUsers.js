function seeRegisterUsers(formName){
    let modalSeeUsers = new bootstrap.Modal(document.getElementById('seeRegisterUsers'), {
        keyboard: false
      });
    document.getElementById("tableRegisterUsers").innerHTML = ""
    modalSeeUsers.show();
   getUsersData(formName.value)
}

async function getUsersData(formName){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/solicitud_form/api/getUsersData/' + formName,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
      });
      const users = await request.json();
      let listOfForms = "";
      for(user of users){
        let enableQrCode = `<button style="padding: revert;" title="Validar" value="${user.folio}/${formName}" onclick="validateRegisterUser(this)" class="btn btn-green btn-circle btn-sm m-1"><i class="bi bi-check-circle"></i></button>`
        let refuseUser = `<button style="padding: revert;" title="Eliminar" value="${user.folio}/${formName}" onclick="refuseRegisterUser(this)" class="btn btn-red btn-circle btn-sm"><i class="bi bi-x-circle"></i></button>`
        let formData = `<tr">
                            <td>${user.nombre}</td>
                            <td>${user.apellid_p}</td>
                            <td>${user.apellido_m}</td>
                            <td>${user.sexo}</td>
                            <td>${user.email}</td>
                            <td>${user.fecha}</td>
                            <td><a href="${user.voucher}" target="blank">${user.voucher}</td>
                            <td>${enableQrCode}${refuseUser}</td>
                        </tr>`;
        listOfForms += formData;
      }
      document.getElementById("tableRegisterUsers").innerHTML = listOfForms
      toastifyCorrectLoad("Usuarios cargados correctamente", 1000)
  }catch(Error){
    toastifyError("Error al mostrar los usuarios")
  }
  
}

/* Validate the information of the register user */
async function validateRegisterUser(data){
  try{
    let token = localStorage.getItem('token');
    let information = data.value.split('/')
    let folio = information[0]
    let tableName= information[1]
    let infoUser = {};
    infoUser.folio = folio
    infoUser.tableName = tableName
    
    const request = await fetch('http://localhost:8080/solicitud_form/api/validateRegisterUser', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser) // Llama esa función para convertir en json.
    });

    toastifyAllGood("Usuario validado correctamente", 1000)
    setTimeout(function() {
      location.reload();
    }, 1300);
  }catch(Error){
    toastifyError("Error al validar el usuario", 1000)
  }
  
  
}

/* Refuse the information if the user */
async function refuseRegisterUser(data){
  try{
    let token = localStorage.getItem('token');
    let information = data.value.split('/')
    let folio = information[0]
    let tableName= information[1]
    let infoUser = {};
    infoUser.folio = folio
    infoUser.tableName = tableName
    const request = await fetch('http://localhost:8080/solicitud_form/api/refuseRegisterUser', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser) // Llama esa función para convertir en json.
    });
    toastifyAllGood("Usuario eliminado correctamente", 1000)
    setTimeout(function() {
      location.reload();
    }, 1300);
  }catch(Error){
    toastifyError("Error al eliminar el usuario", 1000)
  }
  
  
}

function seeConfirmedUsers(data){
  let modalSeeUsers = new bootstrap.Modal(document.getElementById('seeConfirmedUsers'), {
      keyboard: false
    });
    document.getElementById("tableConfirmedUsers").innerHTML = ""
    modalSeeUsers.show();
  getConfirmedUsersData(data.value)
}

async function getConfirmedUsersData(tableName){
  try{
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/solicitud_form/api/getConfirmedUsersData/' + tableName,{
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    const users = await request.json();
    let listOfForms = "";
    for(user of users){
      let refuseUser = `<button style="padding: revert;" title="Eliminar" value="${user.folio}/${tableName}" onclick="refuseRegisterUser(this)" class="btn btn-red btn-circle btn-sm"><i class="bi bi-x-circle"></i></button>`
      let formData = `<tr">
                          <td>${user.nombre}</td>
                          <td>${user.apellid_p}</td>
                          <td>${user.apellido_m}</td>
                          <td>${user.sexo}</td>
                          <td>${user.email}</td>
                          <td>${user.fecha}</td>
                          <td><a href="${user.voucher}" target="blank">${user.voucher}</td>
                          <td>${user.asistencia}</td>
                          <td>${refuseUser}</td>
                      </tr>`;
      listOfForms += formData;
    }
    document.getElementById("tableConfirmedUsers").innerHTML = listOfForms
    toastifyCorrectLoad("Usuarios cargados correctamente", 1000)
  }catch(Error){
    toastifyError("Error al cargar los usuarios", 1000)
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