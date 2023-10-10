let form = document.getElementById('formCertificate')

form.addEventListener("submit", submitFormCertificate)

async function submitFormCertificate(e) {
    e.preventDefault()
    try {
        let data = {}
        data.folio = document.getElementById('folio').value
        data.email = document.getElementById('email').value

        const request = await fetch('http://localhost:8080/user/event201/api/generalData', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data) // Llama esa función para convertir en json.
        });

        let response = await request.json()
        let fullName = response.nombre + " " + response.apellido_p + " "+ response.apellido_m
        document.getElementById("nombrePersona").textContent = fullName
        let captura = document.getElementById('capture')
        captura.style.display = 'block'
        const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: response.folio,
            width: 240,
            height: 240,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
        });
        html2canvas(document.querySelector("#capture"), {
            allowTaint: true,
            useCors: true
        })
            .then(canvas => {
                saveAs(canvas.toDataURL(), 'Constancia.png');
                captura.style.display = 'none'
            });

    } catch (error) {
        toastifyError("Error al generar la constancia, revise los datos ingresados.", 3000)
    }

}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

function getHeaders(){
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    };
}