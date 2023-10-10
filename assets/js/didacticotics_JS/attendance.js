let form = document.getElementById('formAttendance')

form.addEventListener("submit", submitFormAttendance)

async function submitFormAttendance(e){
    e.preventDefault()
    document.getElementById("validationSuccess").style.display = "none"
    document.getElementById("validationFailed").style.display = "none"
    let folio = document.getElementById("folio").value

    try{
        const request = await fetch('http://localhost:8080/user/event201/api/validateAttendance', {
        method: 'PUT',
        headers: getHeaders(),
        body: folio // Llama esa función para convertir en json.
        });

        let response = await request.text()
        if(response === "Exito"){
            document.getElementById("validationSuccess").style.display = "block"
        }else{
            document.getElementById("validationFailed").style.display = "block"
        }
    }catch(error){

    }

}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    };
}