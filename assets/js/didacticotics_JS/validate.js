// Call the dataTables jQuery plugin
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio')
    validateUser(folio)
});


async function validateUser(folio){
    /* Loading feature */
    let load = document.getElementById("loaderContainer")
    let mainSection = document.getElementById("mainSection")
    let contentLoad = document.getElementById("contentLoad")
    contentLoad.style.display = "flex"
    mainSection.style.filter = "blur(2px)"
    load.style.display = "block"
    try{
        const request = await fetch('https://encurso.fly.dev/user/event201/api/validacion/'+folio, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        let response = await request.json()

        let content = `<div style="margin: 30px;" class="card">
                            <img id="eventImage" src="${response[0][4]}" class="card-img-top">
                            <div class="card-body">
                            <h5 class="card-title">${response[0][5]}</h5>
                            <p>Encurso certifica que:</p>
                            <p style="font-weight: bold" class="d-flex justify-content-center">Nombre: ${response[0][1]} ${response[0][2]} ${response[0][3]}</p>
                            <p>Asistio al evento y lo concluyo en su totalidad.</p>
                            </div>
                        </div>`

        document.getElementById("eventContent").innerHTML += content

        /* Loading feature */
        contentLoad.style.display = "none"
        load.style.display = "none"
        mainSection.style.filter = ""

    }catch(error){
        toastifyError("El usuario no se encuentra registrado en el evento", 3000)
        /* Loading feature */
        contentLoad.style.display = "none"
        load.style.display = "none"
        mainSection.style.filter = ""

    }

}