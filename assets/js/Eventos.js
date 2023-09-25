$(document).ready(function() {
    loadAvailableConferences()
});

async function loadAvailableConferences(){
    try{  
        /* Loading feature */ 
        let load = document.getElementById("loaderContainer")
        let mainSection = document.getElementById("mainSection")
        let footerSection = document.getElementById("footerContent")
        let contentLoad = document.getElementById("contentLoad")
        mainSection.style.filter = "blur(2px)"
        footerSection.style.filter = "blur(2px)"
        load.style.display = "block"
        
        let token = localStorage.getItem('token');
        const request = await fetch('http://localhost:8080/availabelEvents/apiEvents', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
      
        const response = await request.json();
        /* Loading feature */
        load.style.display = "none"
        contentLoad.style.display = "none"
        mainSection.style.filter = ""
        footerSection.style.filter = ""

        let numbConference = 0;
        let listOfConferences = ""
        for(let conferences of response){
            listOfConferences += `
                                <div class="col-sm-12 col-md-6 col-lg-6 mb-4">
                                    <div class="card h-100">
                                        <img src="${response[numbConference][4]}" class="card-img-top" alt="..." width="100%" height="100%">
                                        <div class="card-body ">
                                        <h5 class="card-title">${response[numbConference][1]}</h5>
                                        <p class="card-text">${response[numbConference][2]}</p>
                                        <p class="card-text">Cupo Máximo: ${response[numbConference][3]}</p>
                                        <div style="display: flex; justify-content: space-between;">
                                        <a href="${response[numbConference][0]}" class="btn btn-primary">Ir al registro</a>
                                        </div>
                                        
                                        </div>
                                    </div>
                                </div>`
            numbConference++;
        }
        document.getElementById("conferencesAvailable").innerHTML += listOfConferences
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