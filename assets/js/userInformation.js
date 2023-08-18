$(document).ready(function() {
    loadUserInformation()
});
  

async function loadUserInformation(){
  try{  
    let token = localStorage.getItem('token');
    const request = await fetch('http://localhost:8080/solicitud_form/userData', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+token
    },
    body: token // Se envia el token para obtener el usuario 
    });
  
    const response = await request.json();
    if(response.status === 403){
        throw new Error('Acceso prohibido');
    }
    // Load and set the information of the user the token is OK
    document.getElementById("txt-username").textContent += response.username;
    document.getElementById("txt-name").textContent = response.firstname+" "+response.lastname;
    localStorage.setItem("id_usuario", response.id)
    localStorage.setItem("username", response.username)

  }catch(Error){
      window.location.href = '../login.html'
  }
}
