/* Add input values */
function addInput(){
    let formContent = document.getElementById("formContent")
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
                            <div class="col-md-11">
                                <label style="font-weight: bold;">${inputName}:</label>
                                <input type="${dataType}" name="nombre[]" class="form-text form-control">
                            </div>
                            <!--Eliminar-->
                            <div class="col-md-1 align-self-center">
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
function addName(){
    let formContent = document.getElementById("formContent")
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
                                    <div class="col-md-1 align-self-center">
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
function addOptionCheckBox(){
    let optionCheck = document.getElementById("nameOption").value
    let idPrincipal = document.getElementById("divName").value
    let idDivSeleccion = "divSeleccion_" + idPrincipal.charAt(idPrincipal.length - 1)
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
function addSelect(){
    let formContent = document.getElementById("formContent")
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

    let selectMainStructure = `<div style="padding: 1rem;" class="col-10">
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
                                        <select class="form-control" name="pets" id="${idSeleccion}">
                                            <option value="">-- Selecciona una opción --</option>
                                            
                                        </select>
                                    </div>

                                    <!--Tipo de dato-->
                                    <div class="col-md-4">
                                        <button type="button" value="${idDiv}" onclick="openModalOptionSelect(this)" class="btn btn-secondary btn-sm">Agregar opción</button>
                                    </div>

                                    <!--Eliminar-->
                                    <div class="col-md-1 align-self-center">
                                        <button class="btn btn-danger rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>

                                </div>
                            </div><br>`

    divPadre.innerHTML += selectMainStructure
    formContent.appendChild(divPadre)
                        
    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
    /* Hide the modals */
    let myModalEl = document.getElementById('modalAddSelect');
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    document.getElementById("nameSelect").value = ""
}

/* Open Modal Options CheckBox */
function openModalOptionSelect(datos){
    let modalCheckOption = new bootstrap.Modal(document.getElementById('modalSelectOption'), {
        keyboard: false
      });
      
    modalCheckOption.show();
    document.getElementById("divName").value = datos.value
    
}

/* Add the select option to the main content */
function addOptionSelect(){
    let optionSelect = document.getElementById("nameOptionSelect").value
    let idPrincipal = document.getElementById("divName").value
    let idDivSeleccion = "SelectNumber_" + idPrincipal.charAt(idPrincipal.length - 1)
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