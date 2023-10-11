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

/* EJECUTAR ANTES DE HACER EL SUBMIT */
let form = document.getElementById('registerForm')

form.addEventListener("submit", registerForm)

function registerForm(e) {
    e.preventDefault()
    /* Loading feature */
    let load = document.getElementById("loaderContainer")
    let mainSection = document.getElementById("mainSection")
    let contentLoad = document.getElementById("contentLoad")
    contentLoad.style.display = "flex"
    mainSection.style.filter = "blur(2px)"
    load.style.display = "block"
    // Capturin all the information of the register user
    const register = {}
    register.id_evento = 201
    register.nombre = document.getElementById("name").value
    register.apellido_p = document.getElementById("lastName_P").value
    register.apellido_m = document.getElementById("lastName_M").value
    register.email = document.getElementById("email").value
    let categoryRadio = document.getElementsByName("Categoria")
    // Check which radio button is selected
    categoryRadio.forEach(rb => {
        if (rb.checked) {
            register.categoria = rb.value
        }
    });
    register.credencial
    // Get the selected option
    let selectedOptionEducation = document.getElementById("educationLevel").options[document.getElementById("educationLevel").selectedIndex];
    // Get the value of the selected option
    register.nivel_educativo = selectedOptionEducation.value;
    register.estado = document.getElementById("state").value
    register.institucion = document.getElementById("institution").value
    
    // Setting all the values to save the img
    let datetime = new Date();
    let file = document.getElementById('credentialImg');
    let form = new FormData();
    let name = datetime.toISOString().replace(".", "-")
    form.append("image", file.files[0], name)   
    // Step 1: Fetch data from an API
    fetch('https://api.imgbb.com/1/upload?key=0e26bd5ca0550f416134eca6bc11685d', {
        method: 'POST',
        headers: {

        },
        body: form // Replace with the data you want to send
    })
        .then(response => response.json())
        .then(dataFromFirstRequest => {
            // Step 2: Use data from the first fetch to make a second fetch
            register.credencial = dataFromFirstRequest.data.display_url
            let secondImage = document.getElementById('voucherImg')
            let secondForm = new FormData();
            let secondName = datetime.toISOString().replace(".", "-")
            secondForm.append("image", secondImage.files[0], secondName)
            return fetch('https://api.imgbb.com/1/upload?key=0e26bd5ca0550f416134eca6bc11685d', {
                method: 'POST',
                headers: {
                    
                },
                body: secondForm // Replace with the data you want to send
            });
        })
        .then(response => response.json())
        .then(dataFromSecondRequest => {
            // Step 3: Use data from the second fetch to make a third fetch
            register.voucher = dataFromSecondRequest.data.display_url
            return fetch('http://localhost:8080/user/event201/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register) // Replace with the data you want to send
            });;
        })
        .then(response => response.text())

        .then(state => {
            /* Loading feature */
            contentLoad.style.display = "none"
            load.style.display = "none"
            mainSection.style.filter = ""
            if(state === "Registrado"){
                let registerModal = new bootstrap.Modal(document.getElementById('modalUserRegister'), {
                    keyboard: false
                });
                registerModal.show();
            }else{
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

function reloadPage(){
    setTimeout(function() {
        location.reload();
      }, 1000);
}