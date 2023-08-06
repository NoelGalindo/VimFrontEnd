async function inicioSesion(){

let datos = {};
datos.username = document.getElementById('txtUsuario').value;
datos.password = document.getElementById('txtPassword').value;


  const request = await fetch('https://vim.fly.dev/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) // Llama esa función para convertir en json.
  });
  try{
    const response = await request.json();
    if(response.status === 403){
      throw new Error('Acceso prohibido');
    }
    localStorage.setItem("token", response.token)
    alert('Bienvenido')
    window.location.href = "dashboard_manager.html";
  }catch(Error){
    alert('Credenciales invalidas, favor de revisarlas')
  }
}