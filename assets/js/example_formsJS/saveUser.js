function readFile() {
  
  if (!this.files || !this.files[0]) return;
      
    const FR = new FileReader();
      
    FR.addEventListener("load", function(evt) {
      document.querySelector("#img").src= evt.target.result;
    }); 
      
    FR.readAsDataURL(this.files[0]);
    
}
  
/* Mostrar la imagen del voucher de pago */
document.querySelector("#myImage").addEventListener("change", readFile);

/* Ejecutar cuando se envia el formulario */
let form = document.getElementById('form')

form.addEventListener("submit", submitForm)

function submitForm(e){
  e.preventDefault()
  // Objecto con los valores
  const data = {}
  data.nombre = document.getElementById("nombre").value
  data.apellid_p = document.getElementById("apellido_p").value
  data.apellido_m = document.getElementById("apelldio_m").value
  data.sexo = document.getElementById("sexo_S").value
  data.email = document.getElementById("email_i").value
  data.fecha = document.getElementById("fecha").value

  // Setting all the values to save the img
  let datetime = new Date();
  let file = document.getElementById('myImage');
  let form = new FormData();
  form.append("image", file.files[0], datetime.toISOString())
  
  saveImage(form).then((result) => {
    data.voucher = result.data.display_url
    registerUserExample(data)
  })
.catch(console.error)
  
}

// Send the data to be save
async function registerUserExample(data){
  const request = await fetch('api/registerUserExampleForm', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data) // Llama esa función para convertir en json.
  });

  alert('Usuario registrado correctamente');

}

// Calling the API to save the Image in the server
async function saveImage(form){
  const request = await fetch('https://api.imgbb.com/1/upload?key=0e26bd5ca0550f416134eca6bc11685d', {
    method: 'POST',
    headers: {
      
    },
    body: form
  });

   return await request.json()

}

function getHeaders(){
  return {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.token
  };
}
