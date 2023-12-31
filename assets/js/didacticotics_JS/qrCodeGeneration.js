/* Ejecutar cuando se envia el formulario */
let form = document.getElementById('formGafete')

form.addEventListener("submit", submitFormGafete)

async function submitFormGafete(e){
    e.preventDefault()

    let data = {}
    data.folio = document.getElementById('folio').value
    data.email = document.getElementById('email').value
    
    const request = await fetch('http://localhost:8080/user/event201/api/generalData', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data) // Llama esa función para convertir en json.
      });
    
    try{
      let response = await request.json()
      if(response != null){
        document.getElementById("folioTxt").textContent = ""
        document.getElementById("nombreTxt").textContent = ""
        document.getElementById('qrcode').innerHTML = ""
        // Hide error msg
        document.getElementById("without-access").style.display = "none"
        // Show the access and let the user download the access card
        document.getElementById("with-acces").style.display = "block"
        document.getElementById("dowloadBtn").style.display = "block"

        // Set the values to the labels
        document.getElementById("folioTxt").textContent += response.folio
        document.getElementById("nombreTxt").textContent += response.nombre + " " + response.apellido_p + " " + response.apellido_m 
        const qrcode = new QRCode(document.getElementById('qrcode'), {
          text: ""+response.folio,
          width: 250,
          height: 250,
          colorDark : '#000',
          colorLight : '#fff',
          correctLevel : QRCode.CorrectLevel.H
        });
      }
    } catch(error){
      // hide the access and let the user download the access card
      document.getElementById("with-acces").style.display = "none"
      document.getElementById("dowloadBtn").style.display = "none"
      document.getElementById("without-access").style.display = "block"
    }
    
}

function downloadOnPdf(){
  html2pdf()
    // (C1) SET OPTIONS
    .set({
      margin: 1,
      filename: "gafete.pdf",
      image: { type: "png", quality: 0.8 },
      enableLinks : true,
      jsPDF: { format: "A4", orientation: "portrait" }
    })
 
    // (C2) GET CONTENT FROM SECTION
    .from(document.getElementById("with-acces"))
 
    // (C3) SAVE TO FILE
    .save();
}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    };
}