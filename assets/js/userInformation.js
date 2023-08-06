// Execute the request when the page is loading
window.onload = function() {
    loadUserInformation()
};
  

async function actualizarUsername(){
    let token = localStorage.getItem('token');
    const request = await fetch('http://127.0.0.1:8080/solicitud_form/userData', {
    method: 'POST',
    headers: getHeaders(),
    body: token // Se envia el token para obtener el usuario 
    });
    try{
        const response = await request.json();
        if(response.status === 403){
            throw new Error('Acceso prohibido');
        }
        // Load and set the information of the user the token is OK
        document.getElementById("txt-username").textContent = response.username;
        document.getElementById("txt-name").textContent = response.firstname+" "+response.lastname;
        localStorage.setItem("id_usuario", response.id)
        
    }catch(Error){
        window.location.href = "../login.html";
    }
}

function getHeaders(){
    return {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
}