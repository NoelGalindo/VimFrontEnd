/* Opening the modal and making the reques to load the users that will be validated */
function optionSeeRegisterUsers(id_evento) {
  let modalSeeRegisterUsers = new bootstrap.Modal(document.getElementById('seeRegisterUsers'), {
    keyboard: false
  });
  getInformationRegisterUsers(id_evento)
  modalSeeRegisterUsers.show();
}

async function getInformationRegisterUsers(id_evento) {
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/formularios/api/administration/getRegisterUsers/' + id_evento, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    const response = await request.json();
    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }
    if (response.length === 0) {
      document.getElementById("tableRegisterUsers").innerHTML = `<h2 style="font-weight: bold; text-align: center;">Sin registros</h2>`
    } else {
      document.getElementById("tableRegisterUsers").innerHTML = jsonToTable(response)
    }

  } catch (Error) {
    toastifyError("Error al obtener el formulario", 1500)
  }
}

function jsonToTable(jsonData) {
  let tableHtml = `<table class="table table-striped"><tr>`;

  // Create headers from the first object in the JSON
  for (let key in jsonData[0]) {
    tableHtml += "<th>" + key + "</th>";
  }
  tableHtml += "<th> Acciones </th>"
  tableHtml += "</tr>";

  // Add data rows
  for (let i = 0; i < jsonData.length; i++) {
    tableHtml += "<tr>";
    for (let key in jsonData[i]) {
      if (typeof jsonData[i][key] === "object") {
        // Handle nested objects only once
        let nestedKeys = Object.keys(jsonData[i][key]);
        let nestedData = Object.values(jsonData[i][key]);

        tableHtml += "<td><table>";
        for (let j = 0; j < nestedKeys.length; j++) {
          tableHtml += "<tr>";
          tableHtml += "<th>" + nestedKeys[j] + "</th>";
          tableHtml += "<td>" + nestedData[j] + "</td>";
          tableHtml += "</tr>";
        }
        tableHtml += "</table></td>";
      } else {
        tableHtml += "<td>" + jsonData[i][key] + "</td>";
      }
    }
    tableHtml += `<td>
                                    <button style="padding: revert" class="btn btn-green" onclick="acceptUser(${jsonData[i].id_evento}.${jsonData[i].folio})"><i class="bi bi-check-circle-fill"></i></button>
                                    <button style="padding: revert" class="btn btn-red" onclick="refusetUser(${jsonData[i].id_evento}.${jsonData[i].folio})"><i class="bi bi-x-circle-fill"></i></button>
                            </td>`
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";
  return tableHtml;
}

async function acceptUser(data) {
  try {
    /* Loading feature */
    let load = document.getElementById("loaderContainer")
    let mainSection = document.getElementById("mainSection")
    let contentLoad = document.getElementById("contentLoad")
    contentLoad.style.display = "flex"
    mainSection.style.filter = "blur(2px)"
    load.style.display = "block"

    let info = data.toString().split(".")
    const datos = {}
    datos.id_evento = info[0]
    datos.folio = info[1]
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/formularios/api/administration/confirmUser', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    const response = await request.text();
    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }
    /* Loading feature ends*/
    contentLoad.style.display = "none"
    load.style.display = "none"
    mainSection.style.filter = ""
    toastifyAllGood("Validado correctamente", 1000)
    getInformationRegisterUsers(datos.id_evento)
  } catch (Error) {
    /* Loading feature ends*/
    contentLoad.style.display = "none"
    load.style.display = "none"
    mainSection.style.filter = ""
    toastifyError("Error al obtener el formulario", 1500)
  }
}

async function refusetUser(data) {
  try {
    let info = data.toString().split(".")
    const datos = {}
    datos.id_evento = info[0]
    datos.folio = info[1]
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/formularios/api/administration/refuseUser', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    const response = await request.text();
    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }

    toastifyAllGood("Eliminado correctamente", 1000)
    getInformationRegisterUsers(datos.id_evento)
  } catch (Error) {
    toastifyError("Error al obtener el formulario", 1500)
  }
}

/* Opening the modal and making the request to see the users that are validated */
function optionSeeConfirmedUsers(id_evento) {
  let modalSeeConfirmedUsers = new bootstrap.Modal(document.getElementById('seeConfirmedUsers'), {
    keyboard: false
  });
  getInformationConfirmedUsers(id_evento)
  modalSeeConfirmedUsers.show();
}

async function getInformationConfirmedUsers(id_evento) {
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/formularios/api/administration/getConfirmedUsers/' + id_evento, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    const response = await request.json();
    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }

    if (response.length === 0) {
      document.getElementById("tableConfirmedUsers").innerHTML = `<h2 style="font-weight: bold; text-align: center;">Sin registros</h2>`
    } else {
      document.getElementById("tableConfirmedUsers").innerHTML = jsonToTableConfirmed(response)
    }


  } catch (Error) {
    toastifyError("Error al obtener el formulario", 1500)
  }
}

function jsonToTableConfirmed(jsonData) {
  let tableHtml = `<table class="table table-striped"><tr>`;

  // Create headers from the first object in the JSON
  for (let key in jsonData[0]) {
    tableHtml += "<th>" + key + "</th>";
  }
  tableHtml += "</tr>";

  // Add data rows
  for (let i = 0; i < jsonData.length; i++) {
    tableHtml += "<tr>";
    for (let key in jsonData[i]) {
      if (typeof jsonData[i][key] === "object") {
        // Handle nested objects only once
        let nestedKeys = Object.keys(jsonData[i][key]);
        let nestedData = Object.values(jsonData[i][key]);

        tableHtml += "<td><table>";
        for (let j = 0; j < nestedKeys.length; j++) {
          tableHtml += "<tr>";
          tableHtml += "<th>" + nestedKeys[j] + "</th>";
          tableHtml += "<td>" + nestedData[j] + "</td>";
          tableHtml += "</tr>";
        }
        tableHtml += "</table></td>";
      } else {
        tableHtml += "<td>" + jsonData[i][key] + "</td>";
      }
    }

    tableHtml += "</tr>";
  }
  tableHtml += "</table>";
  return tableHtml;
}

function downloadAttendanceList(id_evento) {
  let token = localStorage.getItem('token');

  /* Loading feature */
  let load = document.getElementById("loaderContainer")
  let mainSection = document.getElementById("mainSection")
  let contentLoad = document.getElementById("contentLoad")

  contentLoad.style.display = "flex"
  mainSection.style.filter = "blur(2px)"
  load.style.display = "block"

  fetch('http://localhost:8080/formularios/api/administration/downloadAttendanceExcel/' + id_evento,{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }) // Replace with your actual API endpoint
    .then(response => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error('Failed to fetch the Excel file');
      }
    })
    .then(blob => {
      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'asistencia.xlsx'; // Set the desired file name
      document.body.appendChild(a);
      contentLoad.style.display = "none"
      load.style.display = "none"
      mainSection.style.filter = ""
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error(error);
      // Handle the error here
      contentLoad.style.display = "none"
      load.style.display = "none"
      mainSection.style.filter = ""
    });

}