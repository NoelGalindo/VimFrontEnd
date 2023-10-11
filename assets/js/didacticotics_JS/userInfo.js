// Call the dataTables jQuery plugin
$(document).ready(function() {
    getUserInfo()
});

async function getUserInfo(){
    try{
        let token = localStorage.getItem('token');
        const request = await fetch('http://localhost:8080/user/event201/api/userInfo', {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        
        const response = await request.json();
        if(response.status === 403){
            throw new Error('Acceso prohibido');
        }
        // Load and set the information of the user the token is OK
        document.getElementById("txtUsername").textContent += response.email;
        document.getElementById("txtName").textContent = response.nombre+" "+response.apellido_p+" "+response.apellido_m;
        localStorage.setItem("id_usuario", response.id)
        localStorage.setItem("username", response.username)
    }catch(Error){
        window.location.href = "login.html"
    }
}