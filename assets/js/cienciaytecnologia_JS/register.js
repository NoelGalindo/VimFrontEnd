// Setting the actions to show the questions to each kind of asistant
const checkTypeParticipant = document.getElementsByName("typeAttendant")

// Add a change event listener to each radio button
checkTypeParticipant.forEach(radioButton => {
    radioButton.addEventListener("change", function () {
        if (this.checked) {
            const selectedValue = this.value
            switch (selectedValue) {
                case "profesores":
                    document.getElementById("questionsForTeachers").style.display = "block"
                    document.getElementById("questionsForGuests").style.display = "none"
                    break;
                case "invitados":
                    document.getElementById("questionsForTeachers").style.display = "none"
                    document.getElementById("questionsForGuests").style.display = "block"
                    break;
            }

        }
    });
});

// Action to show the image of the voucher
function readFile() {
    document.getElementById("imgSpace").style.display = "flex"
    if (!this.files || !this.files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function (evt) {
        document.querySelector("#img").src = evt.target.result;
    });

    FR.readAsDataURL(this.files[0]);

}

/* Mostrar la imagen del voucher de pago */
document.querySelector("#voucherImg").addEventListener("change", readFile);

// Getting the data to upload the information
/* EJECUTAR ANTES DE HACER EL SUBMIT */
let form = document.getElementById('registerForm')

form.addEventListener("submit", test)

function registerForm(e) {
    e.preventDefault()
    /* Loading feature */
    let load = document.getElementById("loaderContainer")
    let mainSection = document.getElementById("mainSection")
    let contentLoad = document.getElementById("contentLoad")
    contentLoad.style.display = "flex"
    mainSection.style.filter = "blur(2px)"
    load.style.display = "block"
    // Capturin all the information of the register user using FORMDATA
    const register = new FormData()
    register.append("nombre", document.getElementById("name").value)
    register.append("apellido_p", document.getElementById("lastName_P").value)
    register.append("apellido_m", document.getElementById("lastName_M").value)
    register.append("email", document.getElementById("email").value)
    register.append("nacimiento", document.getElementById("birthday").value)
    register.append("proyecto", document.getElementById("proyectDoc"))
    // Get the selected option
    let selectedOptionGender = document.getElementById("Gender").options[document.getElementById("Gender").selectedIndex];
    let selectedOptionGrade = document.getElementById("Grade").options[document.getElementById("Grade").selectedIndex];
    let selectedOptionGroup = document.getElementById("Group").options[document.getElementById("Group").selectedIndex];
    // Get the value of the selected option
    register.append("genero", selectedOptionGender.value)
    register.append("grado", selectedOptionGrade.value)
    register.append("grupo", selectedOptionGroup.value)
    // get the type of attendant

    register.credencial
    // Get the selected option
    let selectedOptionEducation = document.getElementById("educationLevel").options[document.getElementById("educationLevel").selectedIndex];
    // Get the value of the selected option
    register.nivel_educativo = selectedOptionEducation.value;
    register.estado = document.getElementById("state").value
    register.institucion = document.getElementById("institution").value

    // Setting all the values to save the voucher
    let datetime = new Date();
    let file = document.getElementById('voucherImg');
    let form = new FormData();
    let name = datetime.toISOString().replace(".", "-")
    form.append("image", file.files[0], name)
    // Step 1: Fetch data from an API
    fetch('https://api.imgbb.com/1/upload?key=0e26bd5ca0550f416134eca6bc11685d', {
        method: 'POST',
        headers: {},
        body: form // Replace with the data you want to send
    })
        .then(response => response.json())
        .then(dataFromFirstRequest => {
            // Step 2: Use data from the first fetch to make a second fetch
            register.append("voucher", dataFromFirstRequest.data.display_url)
            // Identifying wich part
            return fetch('https://api.imgbb.com/1/upload?key=0e26bd5ca0550f416134eca6bc11685d', {
                method: 'POST',
                headers: {

                },
                body: secondForm // Replace with the data you want to send
            });
        })
        .then(response => response.text())

        .then(state => {
            /* Loading feature */
            contentLoad.style.display = "none"
            load.style.display = "none"
            mainSection.style.filter = ""
            if (state === "Registrado") {
                let registerModal = new bootstrap.Modal(document.getElementById('modalUserRegister'), {
                    keyboard: false
                });
                registerModal.show();
            } else {
                document.getElementById("duplicatedMsj").style.display = "block"
                let duplicatedMsj = document.getElementById("registerForm")
                duplicatedMsj.scrollIntoView({ behavior: "smooth" })
            }


        })
        .catch(error => {
            contentLoad.style.display = "none"
            load.style.display = "none"
            mainSection.style.filter = ""
            let registerModalError = new bootstrap.Modal(document.getElementById('modalUserRegisterError'), {
                keyboard: false
            });
            registerModalError.show();

            console.log("Oops ah ocurrido un error")
        });

}

function reloadPage() {
    setTimeout(function () {
        location.reload();
    }, 1000);
}

function test(e) {
    e.preventDefault()
    const register = new FormData()
    register.append("nombre", document.getElementById("name").value)
    register.append("apellido_p", document.getElementById("lastName_P").value)
    register.append("apellido_m", document.getElementById("lastName_M").value)
    register.append("email", document.getElementById("email").value)
    register.append("nacimiento", document.getElementById("birthday").value)
    register.append("proyecto", document.getElementById("proyectDoc"))
    // Get the selected option
    let selectedOptionGender = document.getElementById("Gender").options[document.getElementById("Gender").selectedIndex];
    let selectedOptionGrade = document.getElementById("Grade").options[document.getElementById("Grade").selectedIndex];
    let selectedOptionGroup = document.getElementById("Group").options[document.getElementById("Group").selectedIndex];
    // Get the value of the selected option
    register.append("genero", selectedOptionGender.value)
    register.append("grado", selectedOptionGrade.value)
    register.append("grupo", selectedOptionGroup.value)

    register.append("vocuher", "imagen_url")

    // Check which type of attendant id registering to get the info
    const tipoParticipante = document.getElementsByName("typeAttendant")
    tipoParticipante.forEach(rb => {
        if (rb.checked) {
            let whichOne = rb.value
            switch(whichOne){
                case "profesores":
                    const grupoImpartido = document.getElementsByName("gradosImparte")
                    // Check which radio button is selected
                    grupoImpartido.forEach(rb => {
                        if (rb.checked) {
                            register.append("gradoImpartido", rb.value)
                            register.append("institution", "nada")
                        }
                    });
                    break;
                case "invitados":                    
                    register.append("gradoImpartido", "Nada")
                    register.append("institucion", document.getElementById("institution").value)
                    break;
            }
        }
    });

    for (const value of register.keys()) {
        console.log(value);
    }
    for (const value of register.values()) {
        console.log(value);
    }

}