$(document).ready(function () {
  checkCertificate()
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  let listShowAllForms = document.getElementById("listShowAllForms")
  let listCreateForm = document.getElementById("listCreateForm")
  listShowAllForms.href = "formularios.html?evento=" + id_evento
  listCreateForm.href = "crear_formularios.html?evento=" + id_evento
});

async function checkCertificate() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  try {
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/eventos/api/getCertificate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: id_evento
    });
    const response = await request.text();
    if (response !== "NO CONTENT") {

      const mediaQuery = window.matchMedia('(max-width: 450px)')
      if (mediaQuery.matches) {
        const qrcode = new QRCode(document.getElementById('qrcode'), {
          text: "Información que ira en el QR",
          width: 60,
          height: 60,
          colorDark: '#000',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        const qrcode = new QRCode(document.getElementById('qrcode'), {
          text: "Información que ira en el QR",
          width: 70,
          height: 70,
          colorDark: '#000',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.H
        });
      }
      document.getElementById("visualizeCertificate").style.display = "block"
      document.getElementById("certificateImg").src = response
    }
    toastifyCorrectLoad("Formularios cargados correctamente", 1000)
    //document.getElementById("informationForm").innerHTML += structure
  } catch (Error) {
    toastifyError("Error al cargar los formularios", 1000)
  }
}

function uploadCertificateImg() {
  let token = localStorage.getItem('token');
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get('evento')
  // CREATING THE FORM DATA TO SEND THE INFORMATION
  let file = document.getElementById("certificateImage")
  let form = new FormData();
  form.append("id_evento", id_evento)
  form.append("imagen_constancia", file.files[0])

  // First fetch request with POST
  fetch('http://localhost:8080/eventos/api/certificateUrl', {
    method: 'PUT', // Or 'GET' or other HTTP methods
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: form // Replace with the data you want to send
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toastifyAllGood("Constancia subida correctamente", 1000)
      setTimeout(function () {
        location.reload();
      }, 1300);
    })
    .catch(error => {
      toastifyError("Error al crear el evento", 1000)
    })

}

/* Opening the modals to add the cerficate */
function openCertificateModal(name) {
  let modalCheckOption = new bootstrap.Modal(document.getElementById('certificateModal'), {
    keyboard: false
  });
  modalCheckOption.show();
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