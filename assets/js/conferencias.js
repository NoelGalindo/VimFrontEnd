$(document).ready(function() {
    loadAvailableConferences()
});

async function loadAvailableConferences(){
    try{  
        let token = localStorage.getItem('token');
        const request = await fetch('http://localhost:8080/availabelConferences/conferences', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
      
        const response = await request.json();
        let listOfConferences = ""
        for(let conferences of response){
            listOfConferences += `<div class="col-md-6 col-lg-6 col-sm-12  p-1">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${response[0][1]}</h5>
                                            <p class="card-text">${response[0][2]}</p>
                                            <p class="card-text">Cupo Máximo: ${response[0][3]}</p>
                                            <a href="#" class="btn btn-primary">Registrarme</a>
                                        </div>
                                    </div>
                                </div>   `
        }
        document.getElementById("conferencesAvailable").outerHTML += listOfConferences
        toastifyCorrectLoad("Conferencias cargadas correctamente", 1000)
      }catch(Error){
          toastifyError("Error al cargar las conferencias", 1000)
      }
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