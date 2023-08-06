function seeRegisterUsers(data){
    let modalSeeUsers = new bootstrap.Modal(document.getElementById('seeRegisterUsers'), {
        keyboard: false
      });
      modalSeeUsers.show();
    getUsersData(data)
}

async function getUsersData(id_formulario){
    const request = await fetch('api/getUsersData/' + id_formulario,{
        method: 'GET',
        headers: getHeaders()
      });
      const users = await request.json();
      let listOfForms = "";
      for(user of users){
        let enableQrCode = `<button style="padding: revert;" title="Validar" value="${user.folio}" onclick="validateRegisterUser(this)" class="btn btn-green btn-circle btn-sm m-1"><i class="bi bi-check-circle"></i></button>`
        let refuseUser = `<button style="padding: revert;" title="Cancelar" value="${user.folio}" onclick="refuseRegisterUser(this)" class="btn btn-red btn-circle btn-sm"><i class="bi bi-x-circle"></i></button>`
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
}

/* Validate the information of the register user */
async function validateRegisterUser(data){
  let folio = data.value
  const request = await fetch('api/validateRegisterUser', {
    method: 'POST',
    headers: getHeaders(),
    body: folio // Llama esa función para convertir en json.
  });

  alert('Usuario validado correctamente');
  
}

/* Refuse the information if the user */
async function refuseRegisterUser(data){
  let folio = data.value
  const request = await fetch('api/refuseRegisterUser', {
    method: 'POST',
    headers: getHeaders(),
    body: folio // Llama esa función para convertir en json.
  });

  alert('Usuario eliminado correctamente');
  
}

function seeConfirmedUsers(data){
  let modalSeeUsers = new bootstrap.Modal(document.getElementById('seeConfirmedUsers'), {
      keyboard: false
    });
    modalSeeUsers.show();
  getConfirmedUsersData(data)
}

async function getConfirmedUsersData(id_formulario){
  const request = await fetch('api/getConfirmedUsersData/' + id_formulario,{
      method: 'GET',
      headers: getHeaders()
    });
    const users = await request.json();
    let listOfForms = "";
    for(user of users){
      let formData = `<tr">
                          <td>${user.nombre}</td>
                          <td>${user.apellid_p}</td>
                          <td>${user.apellido_m}</td>
                          <td>${user.sexo}</td>
                          <td>${user.email}</td>
                          <td>${user.fecha}</td>
                          <td><a href="${user.voucher}" target="blank">${user.voucher}</td>
                          <td>${user.asistencia}</td>
                      </tr>`;
      listOfForms += formData;
    }
    document.getElementById("tableConfirmedUsers").innerHTML = listOfForms
}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
    };
}