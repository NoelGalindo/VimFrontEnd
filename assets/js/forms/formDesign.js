function insertarInputsModal() {

    /* Se obtiene el contenedor donde se agregara el input */
    let formContent = document.getElementById("formContent")
    /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++

    let numeroCampo = contadorInputs;
    let numeroCampoReal = contadorInputsReales

    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs

    /* Variables para asignar nombres a los inputs */
    let idInputNombre = "inputNombre_" + contadorInputs;
    let idInputDestino = "inputDestino_" + contadorInputs;
    let idSelect = "selectTipo_" + contadorInputs;

    let divPadre = document.createElement('div')
    divPadre.classList.add("row")
    divPadre.id = idDiv

    let template = `<div style="padding: 1rem;" class="col-10">
                                <div class="row">
                                    <!--Nombre del campo-->
                                    <div class="col-md-7">
                                        <label style="font-weight: bold;">Nombre del campo:</label>
                                        <input id="${idInputNombre}" type="text" onkeyup="asignarTexto(event)" name="nombre[]" class="form-text form-control" type="text">
                                    </div>
                                    
                                    <!--Tipo de dato-->
                                    <div class="col-md-4">
                                        <label style="font-weight: bold;">Tipo de dato:</label>
                                        <select id="${idSelect}" name="tipo[]" onchange="cambiarTipo(this)" class="form-text form-select">
                                            <option value="text">Texto</option>
                                            <option value="number">Número</option>
                                            <option value="date">Fecha</option>
                                            <option value="file">Documento/Imagen</option>
                                        </select>
                                    </div>

                                    <!--Eliminar-->
                                    <div class="col-md-1 align-self-center">
                                        <button class="btn btn-primary rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-11">
                                        <br>
                                        <input id="${idInputDestino}" class="form-control" disabled>
                                    </div>
                                </div>
                            </div><br>`

    divPadre.innerHTML += template
    formContent.appendChild(divPadre)

    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
}

/* Insertar campos de opción multiple */
function insertarOpcionMultipleModal(){
    /* Se obtiene el contenedor donde se agregara el input */
    let formContent = document.getElementById("formContent")
    /* Se obtiene el numero de campos que se llevan */
    let contadorInputs = document.getElementById("numCampos").textContent
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    /* Se aumenta el valor para empezar con el numero 1 */
    contadorInputs++;
    contadorInputsReales++

    let numeroCampo = contadorInputs;
    let numeroCampoReal = contadorInputsReales

    /* Variable para asignar un id al div de los campos */
    let idDiv = "divNum_" + contadorInputs

    /* Variables para asignar nombres a los inputs */
    let idInputNombre = "inputNombre_" + contadorInputs;
    let idInputDestino = "inputDestino_" + contadorInputs;
    let idDivSeleccion = "divSeleccion_" + contadorInputs;

    let divPadre = document.createElement('div')
    divPadre.classList.add("row")
    divPadre.id = idDiv

    let template = `<div style="padding: 1rem;" class="col-10">
                                <div class="row">
                                    <!--Nombre del campo-->
                                    <div class="col-md-7">
                                        <label style="font-weight: bold;">Nombre del campo:</label>
                                        <input id="${idInputNombre}" type="text" onkeyup="asignarTexto(event)" name="nombre[]" class="form-text form-control" type="text">
                                    </div>
                                    
                                    <!--Tipo de dato-->
                                    <div class="col-md-4">
                                        <br>
                                        <button type="button" value="${idDiv}" onclick="agregarOpcion(this)" class="btn btn-secondary">Agregar opción</button>
                                    </div>

                                    <!--Eliminar-->
                                    <div class="col-md-1 align-self-center">
                                        <button class="btn btn-primary rounded-circle btn-sm" value="${idDiv}" title="Eliminar" type="button" onclick="eliminar(this)"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div id="${idDivSeleccion}" class="col-md-11">
                                        <br>
                                        
                                    </div>
                                </div>
                            </div><br>`

    divPadre.innerHTML += template
    formContent.appendChild(divPadre)

    document.getElementById("numCampos").textContent = contadorInputs
    document.getElementById("numCamposReales").textContent = contadorInputsReales
}

/* Agregar opciones checkbox al formulario */
function agregarOpcion(datos){
    let idPrincipal = datos.value
    let idDivSeleccion = "divSeleccion_" + idPrincipal.charAt(idPrincipal.length - 1)
    let elementoPadre = document.getElementById(idDivSeleccion)
    let divPadreCheckBox = document.createElement("div")
    divPadreCheckBox.innerHTML += `<input type="checkbox"> <input placeholder="Valor input"> <br>`
    elementoPadre.appendChild(divPadreCheckBox)
}

function imprimirTest(){
    let print = document.getElementById("formContent")
    console.log(print)
}


/* Asignar texto al campo destino */
function asignarTexto(val) {
    let idInputNombre = val.target.id
    let idInputDestino = "inputDestino_" + idInputNombre.charAt(idInputNombre.length - 1)
    document.getElementById(idInputNombre).value = val.target.value
    let testOnKey = document.getElementById(idInputNombre).value
    document.getElementById(idInputDestino).value = testOnKey
}

/* Eliminar campos formulario */
function eliminar(valor){
    /* Disminuimos el contador de campos */
    let contadorInputsReales = document.getElementById("numCamposReales").textContent
    contadorInputsReales--
    let id_div = valor.value
    let content_main = document.getElementById("formContent")
    let divEliminar = document.getElementById(id_div)

    divEliminar.parentNode.removeChild(divEliminar)
    document.getElementById("numCamposReales").textContent = contadorInputsReales
}

/* Cambiar tipo de entrada del input de muestra */
function cambiarTipo(val){
    let idSelect = val.id
    let idInputDestino = "inputDestino_" + idSelect.charAt(idSelect.length - 1)
    let input = document.getElementById(idInputDestino)
    switch (val.value){
        case 'text':
            input.type = 'text'
            break;
        case 'number':
            input.type = 'number'
            break;
        case 'date':
            input.type = 'date'
            break;
        case 'file':
            input.type = 'file'
            break;
    }
}

function testImprimir(){
    let nameInputs = document.getElementsByName("nombre[]")
    for(let i = 0; i<nameInputs.length; i++){
        console.log(nameInputs[i].id)
    }

}