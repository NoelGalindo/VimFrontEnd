let formulario = document.getElementById("formTest")
formulario.addEventListener("submit", testUploadFile)

async function testUploadFile(e){
    e.preventDefault()
    try{
        let documento = document.getElementById("archivo")

        const formData = new FormData()
        formData.append("file", documento.files[0])
        formData.append("fecha", "12/02/12")

        const request =  await fetch('http://localhost:8080/availabelEvents/api/uploadDocument', {
        method: 'POST',
        headers: {},
        body: formData // Replace with the data you want to send
        })
        const response = await request.text()
        console.log(response)
        

    }catch(Error){
        console.log("No es posible")
    }
}