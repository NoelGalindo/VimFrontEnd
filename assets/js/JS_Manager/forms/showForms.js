// Call the dataTables jQuery plugin
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  let createFormBtn = document.getElementById("createButton")
  let createFormBtnlist = document.getElementById("listCreateForm")
  let linkCertificate = document.getElementById("linkImgCertificate")
  createFormBtn.href = "crear_formularios.html?evento=" + id_evento
  createFormBtnlist.href = "crear_formularios.html?evento=" + id_evento
  linkCertificate.href = "constancias.html?evento=" + id_evento
  cargarFormularios(id_evento);
});

function noAvailable() {
  toastifyError("No es posible crear mas de un formulario.", 1500)
}

async function cargarFormularios(id_evento) {
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
    if (Object.keys(formularios).length) {
      let btnCreateForm = document.getElementById("createButton")
      btnCreateForm.href = "javascript: void(0)"
      btnCreateForm.style.display = "none"
      let createFormBtnlist = document.getElementById("listCreateForm")
      createFormBtnlist.href = "javascript: void(0)"
      createFormBtnlist.onclick = noAvailable
      let alert = `<div class="alert alert-warning" role="alert">
                    Despues de que se envíe el evento a revisión no se podra modificar.
                  </div>`
      document.getElementById("formSection").innerHTML += alert
    }
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
                            <div class="d-flex justify-content-end flex-sm-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row">
                              <button title="Editar" onclick="optionSeeForm(${form.id_formulario})" class="btn btn-blue m-1">Editar <i class="bi bi-pencil"></i></button>
                              <button title="Eliminar" onclick="deleteForm(${form.id_formulario})" class="btn btn-red m-1">Eliminar <i class="bi bi-trash"></i></button>
                            </div>
                          </div>
                      </div>`
    }
    toastifyCorrectLoad("Formularios cargados correctamente", 1000)
    document.getElementById("formSection").innerHTML += structure
  } catch (Error) {
    toastifyError("Error al cargar los formularios", 1000)
  }

}

async function deleteForm(id) {
  try {
    let token = localStorage.getItem('token');
    if (confirm('¿Desea eliminar este formulario? ')) {
      const request = await fetch('https://encurso.fly.dev/formularios/api/deleteForm/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      toastifyAllGood("Formulario eliminado", 1000)
      setTimeout(function () {
        location.reload();
      }, 1300);
    }
  } catch (Error) {
    toastifyError("Error al eliminar el formulario", 1000)
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