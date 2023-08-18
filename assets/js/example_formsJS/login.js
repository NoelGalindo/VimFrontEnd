async function inicioSesionUsuario(){
    try{
        let datos = {};
        datos.folio = document.getElementById('txtFolio').value;
        datos.email = document.getElementById('txtEmail').value;
      
      
        const request = await fetch('http://localhost:8080/user/exampleForm/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos) // Llama esa función para convertir en json.
        });
          
        const response = await request.json();
        if(response.status === 403){
             throw new Error('Acceso prohibido');
         }
         localStorage.setItem("token", response.token)
         localStorage.setItem("role", response.role)
      
        //Toastify
        toastifyAllGood("Bienvenido", 1000)
      
         setTimeout(() => {
            window.location.href="gafete.html"
         }, 1300);
              
                   
            
    }catch(Error){
          toastifyError("Error al iniciar sesión", 1000)
    }
      
}

function toastifyAllGood(textT, durationT){ 
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