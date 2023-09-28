$(document).ready(function() {
    let buttonsSection = document.getElementById("mainButtons")
    let section = 'generalQuestions';
    let structure = `<div class="row">
                        
                            <div class="col-sm-6 col-md-3 col-lg-3">
                                <h6 style="font-weight: bold;">Entrada</h6>
                                <button style="width:100%" type="button" class="btn btn-blue" onclick="openInputtModal('${section}')">Añadir 
                                    <i class="bi bi-plus-circle"></i></button>
                            </div>
                            <div class="col-sm-6 col-md-3 col-lg-3">
                                <h6 style="font-weight: bold;">Opción multiple</h6>
                                <button style="width:100%" type="button" class="btn btn-blue" onclick="openCheckModal('${section}')">Añadir 
                                    <i class="bi bi-plus-circle"></i></button>
                            </div>
                            <div class="col-sm-6 col-md-3 col-lg-3">
                                <h6 style="font-weight: bold;">Selección</h6>
                                <button style="width:100%" type="button" class="btn btn-blue" onclick="openSelectModal('${section}')" >Añadir 
                                    <i class="bi bi-plus-circle"></i></button>
                            </div>

                            <div class="col-sm-6 col-md-3 col-lg-3">
                                <h6 style="font-weight: bold;">Número de campos: </h6>
                                <h6 id="numCamposReales">0</h6>
                                <h6 style="display: none;" id="numCampos">0</h6>

                            </div>

                        
                    </div>`
    buttonsSection.innerHTML += structure
    
});

/* Getting the forms into a variables to detectec when they are submit */
let formInput = document.getElementById("formInput")
formInput.addEventListener("submit", addInput)

let formChecks = document.getElementById("formChecks")
formChecks.addEventListener("submit", addName)

let formSelect = document.getElementById("formSelect")
formSelect.addEventListener("submit", addSelect)

let formSpecificQuestions = document.getElementById("formSpecificQuestions")
formSpecificQuestions.addEventListener("submit", addNewParticipant)

// Options of aggregate more
let formCheckOptiion = document.getElementById("formCheckOption")
formCheckOptiion.addEventListener("submit", addOptionCheckBox)

let formSelectOption = document.getElementById("formSelectOption")
formSelectOption.addEventListener("submit", addOptionSelect)

/* Opening the modals to add the diferent options */
function openInputtModal(name){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalInputs'), {
        keyboard: false
    });
    document.getElementById("txt_contentName").value = name
    modalCheckOption.show();
}

function openCheckModal(name){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalCheck'), {
        keyboard: false
    });
    document.getElementById("txt_contentNameC").value = name
    modalCheckOption.show();
}

function openSelectModal(name){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalAddSelect'), {
        keyboard: false
    });  
    document.getElementById("txt_contentNameS").value = name
    modalCheckOption.show();
}

function openSpecialType(name){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSpecificQuestions'), {
        keyboard: false
    });  
    modalCheckOption.show();
}

/* Add input values */
function addInput(e){
    e.preventDefault()
    let formContentName = document.getElementById("txt_contentName").value
    let formContent = document.getElementById(formContentName)
    /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++
    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs
    /* Datos del input  */
    let inputName = document.getElementById("inputName").value
    let dataType = document.getElementById("dataType").value
    let divPadre = document.createElement('div')
    divPadre.classList.add("row")
    divPadre.id = idDiv

    let inputHTML = `<div style="padding: 1rem;" class="col-10">
                        <div class="row">
                            <!--Nombre del campo-->
                            <div class="col-md-11 col-sm-11 col-lg-11">
                                <label style="font-weight: bold;">${inputName}:</label>
                                <input type="${dataType}" class="form-text form-control">
                            </div>
                            <!--Eliminar-->
                            <div style="display: flex;justify-content: center;" class="col-md-1 col-sm-1 col-lg-1 align-self-center">
                                <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                            </div>
                        </div>
                    </div><br>`
    
    divPadre.innerHTML += inputHTML
    formContent.appendChild(divPadre)
    
    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
    /* Hide the modals */
    let myModalEl = document.getElementById('modalInputs');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("inputName").value = ""
    
}

/* Add CheckBox */
function addName(e){
    e.preventDefault()
    let formContentName = document.getElementById("txt_contentNameC").value
    let formContent = document.getElementById(formContentName)
    /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++

    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs
    let idDivSeleccion = "divSeleccion_" + contadorInputs;

    /* Datos del input  */
    let inputName = document.getElementById("nameInput").value

    let divPadre = document.createElement('div')
    divPadre.classList.add("row")
    divPadre.id = idDiv

    let checkMainStructure = `<div style="padding: 1rem;" class="col-10">
                                <div class="row">
                                    <!--Nombre del campo-->
                                    <div class="col-md-7">
                                        <label style="font-weight: bold;">${inputName}:</label>
                                    </div>
                                    
                                    <!--Tipo de dato-->
                                    <div class="col-md-4">
                                        <button type="button" value="${idDiv}" onclick="agregarOpcion(this)" class="btn btn-secondary btn-sm">Agregar opción</button>
                                    </div>

                                    <!--Eliminar-->
                                    <div style="display: flex;justify-content: center;" class="col-md-1 align-self-center">
                                        <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div id="${idDivSeleccion}" class="col-md-11">
                                        
                                    </div>
                                </div>
                            </div><br>`

    divPadre.innerHTML += checkMainStructure
    formContent.appendChild(divPadre)
                        
    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
    /* Hide the modals */
    let myModalEl = document.getElementById('modalCheck');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("nameInput").value = ""
}

/* Open Modal Options CheckBox */
function agregarOpcion(datos){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalCheckOption'), {
        keyboard: false
      });
      
    modalCheckOption.show();
    document.getElementById("divName").value = datos.value
    
}

/* Add the option to the main content */
function addOptionCheckBox(e){
    e.preventDefault()
    let optionCheck = document.getElementById("nameOption").value
    let idPrincipal = document.getElementById("divName").value
    let targetId = idPrincipal.split('_')
    let idDivSeleccion = "divSeleccion_" + targetId[1]
    let elementoPadre = document.getElementById(idDivSeleccion)
    let divPadreCheckBox = document.createElement("div")
    divPadreCheckBox.innerHTML += `<input type="checkbox"> <label>${optionCheck}</labe> <br>`
    elementoPadre.appendChild(divPadreCheckBox)
    /* Hide the modals */
    let myModalEl = document.getElementById('modalCheckOption');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("nameOption").value = ""
}

/* Add select */
function addSelect(e){
    e.preventDefault()
    let formContentName = document.getElementById("txt_contentNameS").value
    let formContent = document.getElementById(formContentName)
    /* Obtener el estado del chackbox */
    let checkBox = document.getElementById("checkBoxPremadeData").checked

    /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++

    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs
    let idSeleccion = "SelectNumber_" + contadorInputs;

    /* Datos del input  */
    let selectName = document.getElementById("nameSelect").value

    let divPadre = document.createElement('div')
    divPadre.classList.add("row")
    divPadre.id = idDiv
    let selectMainStructure=""
    /* Actions to do if the checbox is checked */
    if(checkBox === true){
        let specificData = document.getElementById("inputSpecificData").value 
        selectMainStructure = `<div style="padding: 1rem;" class="col-10">
                                        <div class="row">
                                            <!--Nombre del campo-->
                                            <div class="col-md-11">
                                                <label style="font-weight: bold;">${selectName}:</label>
                                                <br>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <!-- Select -->
                                            <div class="col-md-7">
                                                <select class="form-control" id="${idSeleccion}">
                                                    <option value="">-- Selecciona una opción --</option> 
                                                </select>
                                                <p>${specificData}</p>
                                            </div>

                                            <!--Tipo de dato-->
                                            <div class="col-md-4">
                                                <button type="button" value="${idDiv}" onclick="openModalOptionSelect(this)" class="btn btn-secondary btn-sm">Agregar opción</button>
                                            </div>

                                            <!--Eliminar-->
                                            <div style="display: flex;justify-content: center;" class="col-md-1 align-self-center">
                                                <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                            </div>

                                        </div>
                                    </div><br>`
    }
    if(checkBox === false){
        selectMainStructure = `<div style="padding: 1rem;" class="col-10">
                                <div class="row">
                                    <!--Nombre del campo-->
                                    <div class="col-md-11">
                                        <label style="font-weight: bold;">${selectName}:</label>
                                        <br>
                                    </div>
                                </div>
                                <div class="row">
                                    <!-- Select -->
                                    <div class="col-md-7">
                                        <select class="form-control" id="${idSeleccion}">
                                            <option value="">-- Selecciona una opción --</option>
                                            
                                        </select>
                                    </div>

                                    <!--Tipo de dato-->
                                    <div class="col-md-4">
                                        <button type="button" value="${idDiv}" onclick="openModalOptionSelect(this)" class="btn btn-secondary btn-sm">Agregar opción</button>
                                    </div>

                                    <!--Eliminar-->
                                    <div style="display: flex;justify-content: center;" class="col-md-1 align-self-center">
                                        <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>

                                </div>
                            </div><br>`
    }
    

    divPadre.innerHTML += selectMainStructure
    formContent.appendChild(divPadre)
                        
    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
    /* Hide the modals */
    let myModalEl = document.getElementById('modalAddSelect');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("nameSelect").value = ""
    document.getElementById("inputSpecificData").value = ""
    document.getElementById("checkBoxPremadeData").click()
}

/* Add an input to specify what kind of values he wants */
let checBoxData = document.getElementById("checkBoxPremadeData")
checBoxData.addEventListener('change', e => {
    if(e.target.checked === true) {
      let labelSpecificData = document.getElementById("labelSpecificData")
      let inputSpecificData = document.getElementById("inputSpecificData")

      labelSpecificData.style.display = "block"
      inputSpecificData.style.display = "block"
      inputSpecificData.required = true
    }
    if(e.target.checked === false) {
      let labelSpecificData = document.getElementById("labelSpecificData")
      let inputSpecificData = document.getElementById("inputSpecificData")

      labelSpecificData.style.display = "none"
      inputSpecificData.style.display = "none"
      inputSpecificData.required = false
      }
  });

/* Open Modal Options CheckBox */
function openModalOptionSelect(datos){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSelectOption'), {
        keyboard: false
      });
      
    modalCheckOption.show();
    document.getElementById("divName").value = datos.value
    
}

/* Add the select option to the main content */
function addOptionSelect(e){
    e.preventDefault()
    let optionSelect = document.getElementById("nameOptionSelect").value
    let idPrincipal = document.getElementById("divName").value
    let targetId = idPrincipal.split('_')
    let idDivSeleccion = "SelectNumber_" + targetId[1]
    let elementoPadre = document.getElementById(idDivSeleccion)
    elementoPadre.add(new Option(optionSelect))
    /* Hide the modals */
    let myModalEl = document.getElementById('modalSelectOption');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("nameOptionSelect").value = ""
}

/* Eliminar campos formulario */
function eliminar(valor){
    /* Disminuimos el contador de campos */
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    contadorInputsReales--
    let id_div = valor.value
    let divEliminar = document.getElementById(id_div)

    divEliminar.parentNode.removeChild(divEliminar)
    document.getElementById("numCamposReales").textContent = contadorInputsReales
}

/* Eliminar tipo de participante del formulario */
function eliminarParticipante(valor){
    /* Disminuimos el contador de campos */
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    contadorInputsReales--
    let id_div = valor.value
    let divEliminar = document.getElementById(id_div)
    const numDiv = id_div.split('_')
    let nameDiv = "divCapacit_"+numDiv[1]
    let capacityValue = document.getElementById(nameDiv).value
    let actualCapacity = document.getElementById("actualCapacity").value
    document.getElementById("actualCapacity").value = Number(capacityValue)+Number(actualCapacity)
    divEliminar.parentNode.removeChild(divEliminar)
    document.getElementById("numCamposReales").textContent = contadorInputsReales
}

/* Add new type of assistant */
function addNewParticipant(e){
    e.preventDefault()
    /* Getting the value of the desired quantity of assistants */
    let Capacity = document.getElementById("actualCapacity").value
    let requestCapacity = document.getElementById("requestedCapacity").value
    if((Capacity-requestCapacity)>=0){
        /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++
    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs
    let divCapacity = "divCapacit_"+contadorInputs
    let newAttendance = document.getElementById("kindOfParticipant").value
    let divId = "Div_" + newAttendance.replaceAll(" ", "_")
    let formContent = document.getElementById("specifiedQuestions")
    let structure = `<!-- Content of the form -->
                    <div id="${idDiv}" class="card">
                        <h5 style="display: flex; justify-content: space-between; background-color: lightgray;" class="card-header"><b>${newAttendance}</b> <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminarParticipante(this)"><i class="bi bi-x-circle-fill"></i></button></h5>
                        <div class="card-body">
                            <div class="row">
                                
                                    <div class="col-sm-6 col-md-4 col-lg-4">
                                        <h6 style="font-weight: bold;">Entrada</h6>
                                        <button style="width:100%" type="button" class="btn btn-blue" onclick="openInputtModal('${divId}')">Añadir 
                                            <i class="bi bi-plus-circle"></i></button>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-4">
                                        <h6 style="font-weight: bold;">Opción multiple</h6>
                                        <button style="width:100%" type="button" class="btn btn-blue" onclick="openCheckModal('${divId}')">Añadir 
                                            <i class="bi bi-plus-circle"></i></button>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-4">
                                        <h6 style="font-weight: bold;">Selección</h6>
                                        <button style="width:100%" type="button" class="btn btn-blue" onclick="openSelectModal('${divId}')" >Añadir 
                                            <i class="bi bi-plus-circle"></i></button>
                                    </div>
                        </div>
                        <hr>
                            <div id="${divId}">
                                
                            </div>
                            <div style="display: flex; justify-content: end;">
                                <p><b>Asistentes:</b> ${requestCapacity}</p>
                                <input id="${divCapacity}" value="${requestCapacity}" type="hidden">
                            </div>
                        </div>
                    </div><br>`
    formContent.innerHTML += structure
    /* Hide the modals */
    let myModalEl = document.getElementById('modalSpecificQuestions');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
    document.getElementById("kindOfParticipant").value = ""
    document.getElementById("actualCapacity").value = ""
    document.getElementById("requestedCapacity").value = ""
    document.getElementById("actualCapacity").value = Capacity-requestCapacity
    }else{
        toastifyError("No es posible sobrepasar la capacidad máxima de asistencia.", 3000)
    }
    

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
