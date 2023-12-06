// Call the dataTables jQuery plugin
$(document).ready(function () {
  let path = window.location.protocol + '//' + window.location.host + '/eventos/'
  document.getElementById("basic-addon3").innerHTML = path
  actualizarUsername();
  getAllEvents();
});

async function actualizarUsername() {
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('https://encurso.fly.dev/eventos/userData', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: token // Se envia el token para obtener el usuario 
    });

    const response = await request.json();
    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }
    // Load and set the information of the user the token is OK
    document.getElementById("txt-username").textContent += response.username;
    document.getElementById("txt-name").textContent = response.firstname + " " + response.lastname;
    localStorage.setItem("id_usuario", response.id)
    localStorage.setItem("username", response.username)
  } catch (Error) {
    window.location.href = '../login.html'
  }
}

function openCreatEventModal() {
  let modalCheckOption = new bootstrap.Modal(document.getElementById('modalCreateEvent'), {
    keyboard: false
  });

  modalCheckOption.show();
}

/* Ejecutar cuando se envia el formulario */
let form = document.getElementById('eventForm')

form.addEventListener("submit", submitForm)

// CREAR EL EVENTO
function submitForm(e) {
  let token = localStorage.getItem('token');
  e.preventDefault()

  // Objecto con los valores
  let path = window.location.protocol + '//' + window.location.host + '/eventos/'
  let nameWithOutSpaces = document.getElementById('direccionUrl').value
  let file = document.getElementById('imagenEvento');

  // Create the formdata to send the values
  const formData = new FormData()
  formData.append("username", localStorage.getItem("username"))
  formData.append("direccion_url", path + nameWithOutSpaces.replaceAll(' ', ''))
  formData.append("nombre_evento", document.getElementById("nombreEvento").value)
  formData.append("informacion_evento", document.getElementById("informacionEvento").value)
  formData.append("cupo_maximo", document.getElementById("cupoEvento").value)
  formData.append("banner", file.files[0])

  // SE CREA EL FETCH PARA ENVIAR LA INFORMACION AL SERVIDOR

  // First fetch request with POST
  fetch('https://encurso.fly.dev/eventos/api/addEvent', {
    method: 'POST', // Or 'GET' or other HTTP methods
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: formData // ENVIAMOS EL FORM DATA PARA PROCESAR LA PETICION
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // What we would do if everything was ok
      toastifyAllGood("Evento creado correctamente", 1000)
      setTimeout(function () {
        location.reload();
      }, 1300);
    })
    .catch(error => {
      toastifyError("Error al crear el evento", 1000)
    })

}


// OBTENER TODOS LOS EVENTOS
async function getAllEvents() {
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('https://encurso.fly.dev/eventos/api/getEvents', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: token
    });
    const response = await request.json();
    if (Object.keys(response).length) {
      let btnCreateEvent = document.getElementById("btnCreateEvent")
      btnCreateEvent.disabled = true
      btnCreateEvent.style.display = "none"
      let alert = `<br><div class="alert alert-info" role="alert">
                    Solo es posible la creación de un evento.
                  </div>`
      document.getElementById("cantCreateMoreEvents").innerHTML += alert
    }

    if (response.status === 403) {
      throw new Error('Acceso prohibido');
    }
    let availableEvents = document.getElementById('availableEvents')
    let structure = ""
    for (events of response) {
      switch (events.status) {
        case "Creado":
          structure += `<div class="col-md-8 col-sm-12 col-lg-8 mb-4">
                      <div class="card h-100">
                          <img src="${events.imagen_evento}" class="card-img-top" alt="..." width="100%" height="100%">
                          <div class="card-body ">
                            <h5 class="card-title">${events.nombre_evento}</h5>
                            <p class="card-text">${events.informacion_evento}</p>
                            <p class="card-text"><small class="text-muted">URL: ${events.direccion_url}</small></p>
                            <div style="display: flex; justify-content: space-between;">
                            <button onclick="eliminarEvento(${events.id_evento})" class="btn-red">Eliminar</button>
                            <button onclick="sendEvent(${events.id_evento})" class="btn btn-yellow">Enviar</button>
                            <a href="formularios.html?evento=${events.id_evento}" class="btn-green">Formulario</a>
                            </div>
                            
                          </div>
                      </div>
                  </div>`
          break
        case "En revision":
          structure += `<div class="col-md-8 col-sm-12 col-lg-8 mb-4">
                      <div class="card h-100">
                          <img src="${events.imagen_evento}" class="card-img-top" alt="..." width="100%" height="100%">
                          <div class="card-body ">
                            <h5 class="card-title">${events.nombre_evento}</h5>
                            <p class="card-text">${events.informacion_evento}</p>
                            <p class="card-text"><small class="text-muted">URL: ${events.direccion_url}</small></p>
                            <div style="display: flex; justify-content: space-between;">
                            <button onclick="eliminarEvento(${events.id_evento})" class="btn btn-red">Eliminar</button>
                            </div>
                            
                          </div>
                      </div>
                  </div>`
          break
        case "Publicado":
          structure += `<div class="col-md-8 col-sm-12 col-lg-8 mb-4">
                      <div class="card h-100">
                          <img src="${events.imagen_evento}" class="card-img-top" alt="..." width="100%" height="100%">
                          <div class="card-body ">
                            <h5 class="card-title">${events.nombre_evento}</h5>
                            <p class="card-text">${events.informacion_evento}</p>
                            <p class="card-text"><small class="text-muted">URL: ${events.direccion_url}</small></p>
                            <div style="display: flex; justify-content: space-between;">
                            <button onclick="eliminarEvento(${events.id_evento})" class="btn-red">Eliminar</button>
                            <a href="administracion.html?evento=${events.id_evento}" class="btn-green">Administrar</a>
                            </div>
                            
                          </div>
                      </div>
                  </div>`
          break
      }

    }
    availableEvents.innerHTML += structure

  } catch (Error) {
    console.log("Error")
  }
}

// SEND TO REVIEW THE EVENT
async function sendEvent(id_evento) {
  let token = localStorage.getItem('token');
  try {
    const request = await fetch('https://encurso.fly.dev/eventos/api/sendEvent', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: id_evento // Llama esa función para convertir en json.
    });
    // Toastify
    toastifyAllGood("Formulario enviado a revisión correctamente", 1500)
    setTimeout(function () {
      location.reload();
    }, 1300);
  } catch (Error) {
    toastifyError('Error al enviar el formulario a revisión', 1000)
  }
}

// ELIMINAR EVENTO
async function eliminarEvento(id) {
  try {
    let token = localStorage.getItem('token');
    if (confirm('¿Desea eliminar este formulario? ')) {
      const request = await fetch('https://encurso.fly.dev/eventos/api/deleteEvent/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      toastifyAllGood("Evento eliminado", 1000)
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