// Call the dataTables jQuery plugin
$(document).ready(function () {
  loadForm()
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  let linkCertificate = document.getElementById("linkImgCertificate")
  linkCertificate.href = "constancias.html?evento=" + id_evento
});

function optionSeeForm(id_formulario) {
  let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSeeContent'), {
    keyboard: false
  });

  modalCheckOption.show();
  getFormData(id_formulario)
}

async function loadForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('https://encurso.fly.dev/formularios/api/getAllForms', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: id_evento
    });
    const formularios = await request.json();

    let structure = "";
    for (let form of formularios) {
      structure += `<div class="card">
                      <div class="card-header">
                        <i>Encurso forms</i>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">${form.nombre_formulario}</h5>
                        <p class="card-text">${form.informacion_formulario}</p>
                        <p class="card-text"> Cupo máximo: ${form.cupo_maximo}</p>
                        <div class="d-flex justify-content-end flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row">
                          <button title="Editar" onclick="optionSeeForm(${form.id_formulario})" class="btn btn-blue m-1">Ver <i class="bi bi-eye"></i></button>
                        </div>
                      </div>
                    </div>`

    }

    let actions = `<div class="card">
                      <div class="card-header">
                        <i>Acciones</i>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-evenly flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row">
                          <button title="Confirmar usuarios" onclick="optionSeeRegisterUsers(${id_evento})" class="btn btn-green m-1">Confirmar usuarios</button>
                          <button title="Usuarios confirmados" onclick="optionSeeConfirmedUsers(${id_evento})" class="btn btn-blue m-1">Usuarios confirmados</button>
                          <button title="Descargar lista de asistencia" onclick="downloadAttendanceList(${id_evento})" class="btn btn-yellow m-1">Lista de asistencia</button>
                        </div>
                      </div>
                  </div>`

    toastifyCorrectLoad("Formularios cargados correctamente", 1000)
    document.getElementById("informationForm").innerHTML += structure
    document.getElementById("actionsForm").innerHTML += actions
  } catch (Error) {
    toastifyError("Error al cargar los formularios", 1000)
  }

}


async function getFormData(id_formulario) {
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('https://encurso.fly.dev/formularios/api/getForm/' + id_formulario, {
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
    document.getElementById('nombreFormulario').value = response.nombre_formulario
    document.getElementById('informacionFormulario').value = response.informacion_formulario
    document.getElementById('cupoMaximo').value = response.cupo_maximo

    let content = document.getElementById("formContent")
    content.innerHTML = response.estructura_formulario

    toastifyCorrectLoad("Información cargada correctamente", 1500)

  } catch (Error) {
    toastifyError("Error al obtener el formulario", 1500)
  }
}

function toastifyAllGood(textT, durationT) {
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
    onClick: function () { } // Callback after click
  }).showToast();
}

function toastifyCorrectLoad(textT, durationT) {
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
    onClick: function () { } // Callback after click
  }).showToast();
}

function toastifyError(textT, durationT) {
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
    onClick: function () { } // Callback after click
  }).showToast();
}