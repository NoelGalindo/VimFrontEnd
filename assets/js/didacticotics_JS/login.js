async function inicioSesionUsuario() {
    /* Loading feature */
    let load = document.getElementById("loaderContainer")
    let mainSection = document.getElementById("mainSection")
    let contentLoad = document.getElementById("contentLoad")
    try {
        contentLoad.style.display = "flex"
        mainSection.style.filter = "blur(2px)"
        load.style.display = "block"
        let datos = {};
        datos.folio = document.getElementById('txtFolio').value;
        datos.email = document.getElementById('txtEmail').value;


        const request = await fetch('https://encurso.fly.dev/user/event201/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos) // Llama esa función para convertir en json.
        });

        const response = await request.json();
        if (response.status === 403) {
            throw new Error('Acceso prohibido');
        }
        localStorage.setItem("token", response.token)
        localStorage.setItem("role", response.role)
        /* Loading feature */
        contentLoad.style.display = "none"
        load.style.display = "none"
        mainSection.style.filter = ""
        //Toastify
        toastifyAllGood("Bienvenido", 1000)

        setTimeout(() => {
            window.location.href = "gafete.html"
        }, 1300);

    } catch (Error) {
        /* Loading feature */
        contentLoad.style.display = "none"
        load.style.display = "none"
        mainSection.style.filter = ""
        toastifyError("Error al iniciar sesión", 1000)
    }

}

function toastifyAllGood(textT, durationT) {
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
        onClick: function () { } // Callback after click
    }).showToast();
}

function toastifyError(textT, durationT) {
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
        onClick: function () { } // Callback after click
    }).showToast();
}